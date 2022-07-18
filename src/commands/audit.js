/* eslint-disable indent */
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { Command, Option } from 'clipanion';
import inquirer from 'inquirer';
import { parse, print } from 'graphql';
import { diff } from 'jest-diff';
import { serializeQueryPlan as serializeQueryPlan1 } from '@apollo/query-planner-1';
import { serializeQueryPlan as serializeQueryPlan2 } from '@apollo/query-planner';
import ora from 'ora';
import { SingleBar, Presets } from 'cli-progress';
import {
  chooseVariant,
  getConfig,
  getVariants,
  resolveConfig,
} from '../config/index.js';
import { RecentOperationsDocument } from '../studio/graphql.js';
import { composeWithResolvedConfig as composeWithResolvedConfig1 } from '../federation/one.js';
import { composeWithResolvedConfig as composeWithResolvedConfig2 } from '../federation/two.js';
import { getClient } from '../studio/index.js';
import { queryPlanAudit } from '../federation/query-plan-audit.js';
import { queryPlanToMermaid } from '../federation/queryPlanToMermaid.js';
import { loadSupergraphInGateway } from '../federation/gateway.js';

const FROM_OPTIONS = {
  'Last Hour': '-3600',
  'Last Day': '-86400',
  'Last Week': '-604800',
  'Last Month': '-2592000',
};

/**
 * @param {import("@urql/core").Client} client
 * @param {string} graphRef
 * @param {string | undefined} from
 */
async function getOperations(client, graphRef, from) {
  let selectedGraphRef = graphRef;

  const [graph] = selectedGraphRef.split('@');

  const variants = await getVariants(client, graph);
  if (variants.length > 1) {
    const useSameGraphRef = await inquirer
      .prompt({
        type: 'confirm',
        name: 'key',
        message: `Use the same graphRef? ${graphRef}`,
      })
      .then((r) => r.key);

    if (!useSameGraphRef) {
      selectedGraphRef = await chooseVariant(client, graph);
    }
  }

  let fromValue = from;

  if (!fromValue) {
    fromValue = await inquirer
      .prompt({
        type: 'list',
        name: 'key',
        message: 'Audit Operations in the',
        choices: Object.keys(FROM_OPTIONS),
      })
      .then(
        (/** @type {{ key: keyof FROM_OPTIONS }} */ r) => FROM_OPTIONS[r.key],
      );
  }

  const fromNumber = fromValue ? parseInt(fromValue, 10) : undefined;

  const spinner = ora();
  spinner.text = 'Fetching operations';
  spinner.start();

  const [serviceId, variantName] = selectedGraphRef.split('@');
  const { data, error } = await client
    .query(RecentOperationsDocument, {
      serviceId,
      variantName,
      from: `${fromNumber}`,
    })
    .toPromise();

  spinner.stop();

  if (error) {
    throw error;
  }

  if (data?.service?.statsWindow?.queryStats) {
    return data.service.statsWindow.queryStats.map((s) => s.groupBy);
  }
  return [];
}

/**
 * @param {any} op
 * @returns {op is import('../typings.js').Operation}
 */
function validateOperation(op) {
  return (
    typeof op.queryId === 'string' && typeof op.querySignature === 'string'
  );
}

const noColor = (/** @type {any} */ _) => _;

const COLORS = {
  aColor: noColor,
  bColor: noColor,
  changeColor: noColor,
  commonColor: noColor,
  patchColor: noColor,
};

/**
 * @param {any} condition
 * @param {string} message
 * @returns {asserts condition}
 */
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

/**
 *
 * @param {import('../typings.js').AuditResult} result
 * @param {string} graphRef
 * @returns {string}
 */
function generateReport(result, graphRef) {
  assert(result?.type === 'SUCCESS', 'result must be successful');

  const title = `${result.queryName} ${result.queryId?.slice(0, 6)}`;
  const [graph, variant] = graphRef.split('@');

  return [
    title,
    '='.repeat(title.length),
    `https://studio.apollographql.com/graph/${graph}/operations?query=${result.queryId}&queryName=${result.queryName}&variant=${variant}`,
    '',
    result.queryPlansMatch
      ? '🎉 No difference in query plans'
      : '💣 Query plans differ',
    '',

    ...(!result.planner1MatchesPlanner2
      ? [
          'Before and After Migration Diff',
          '-------------------------------',
          'This shows the difference between:',
          '',
          '* Using a **Federation 1** supergraph to generate query plans in **Apollo Gateway 0.x**',
          '* Using a **Federation 2** supergraph to generate query plans in **Apollo Gateway 2**',
          '',
          'This simulates the changes in query planning after completing the Federation 2 migration',
          '',
          'The diff is calculated after after query plan normalization (field sorting, etc.)',
          '',
          '```diff',
          diff(
            serializeQueryPlan1(result.normalizedOne),
            serializeQueryPlan2(result.normalizedTwo),
            COLORS,
          ),
          '```',
        ]
      : []),

    '',
    ...(!result.planner2MatchesBothSupergraphs
      ? [
          'In-progress Migration Diff',
          '--------------------------',
          'This shows the difference between:',
          '',
          '* Using a **Federation 1** supergraph to generate query plans in Apollo Gateway 2',
          '* Using a **Federation 2** supergraph to generate query plans in Apollo Gateway 2',
          '',
          'This simulates the changes in query planning after upgrading the Gateway 2.0 but before',
          'changing the build configuration to use Federation 2 composition',
          '',
          'The diff is calculated after after query plan normalization (field sorting, etc.)',
          '',
          '```diff',
          diff(
            serializeQueryPlan1(result.normalizedTwoFromOne),
            serializeQueryPlan2(result.normalizedTwo),
            COLORS,
          ),
          '```',
        ]
      : []),

    '',
    'Operation',
    '---------',
    '```graphql',
    print(parse(result.querySignature || '')),
    '```',
    '',
    'Federation 1 Query Plan',
    '-----------------------',
    '```',
    serializeQueryPlan1(result.one),
    '```',
    '',
    'Federation 2 Query Plan with Federation 1 Supergraph',
    '----------------------------------------------------',
    '```',
    serializeQueryPlan2(result.twoFromOne),
    '```',
    '',
    'Federation 2 Query Plan with Federation 2 Supergraph',
    '----------------------------------------------------',
    '```',
    serializeQueryPlan2(result.two),
    '```',
  ].join('\n');
}

/**
 *
 * @param {import('../typings.js').AuditResult} result
 * @param {string} graphRef
 * @returns {string}
 */
function generateFailureReport(result, graphRef) {
  assert(result?.type === 'FAILURE', 'result must be failure');

  const title = `${result.queryName} ${result.queryId?.slice(0, 6)}`;
  const [graph, variant] = graphRef.split('@');

  const operation = (() => {
    try {
      return print(parse(result.querySignature || ''));
    } catch (e) {
      return result.querySignature;
    }
  })();

  return [
    title,
    '='.repeat(title.length),
    `https://studio.apollographql.com/graph/${graph}/operations?query=${result.queryId}&queryName=${result.queryName}&variant=${variant}`,
    '',
    `* Federation 1 supergraph with Apollo Gateway 0.x: ${
      result.one ? '✅' : '❌'
    }`,
    `* Federation 1 supergraph with Apollo Gateway 2: ${
      result.twoFromOne ? '✅' : '❌'
    }`,
    `* Federation 2 supergraph with Apollo Gateway 2: ${
      result.two ? '✅' : '❌'
    }`,

    ...(result.oneError
      ? [
          '',
          'Error: Federation 1 supergraph with Apollo Gateway 0.x',
          '------------------------------------------------------',
          '',
          result.oneError.message,
          '',
        ]
      : []),
    ...(result.twoFromOneError
      ? [
          '',
          'Error: Federation 1 supergraph with Apollo Gateway 2',
          '----------------------------------------------------',
          '',
          result.twoFromOneError.message,
          '',
        ]
      : []),
    ...(result.twoError
      ? [
          '',
          'Error: Federation 2 supergraph with Apollo Gateway 2',
          '----------------------------------------------------',
          '',
          result.twoError.message,
          '',
        ]
      : []),

    'Operation',
    '---------',
    '```graphql',
    operation,
    '```',
  ].join('\n');
}

export default class AuditCommand extends Command {
  static paths = [['audit'], Command.Default];

  static usage = Command.Usage({
    category: 'Audit',
    description: 'Audit a federated graph for Federation 2.',
    details: `
      Performs a series of tasks on a federated graph:
      1. Ensures that it composes using Federation 1.
      2. Ensures that it composes using Federation 2.
      3. Fetches recent operations from Apollo Studio.
      4. Generates query plans for each operation using both the Federation 1
         and Federation 2 schemas and compares the results.
    `,
    examples: [
      ['Get basic details on composition and query plans', '$0'],
      ['Output query plan info to a folder', '$0 --out results'],
      ['Specify the graphref', '$0 --graphref mygraph@current'],
    ],
  });

  accountId = Option.String('--account', { required: false });

  staging = Option.Boolean('--staging', { required: false });

  config = Option.String('--config', {
    required: false,
    description: 'Optional. Specify a supergraph YAML config on disk.',
  });

  from = Option.String('--from', {
    required: false,
    description:
      'Optional. Audit operations in a time window. Accepts durations like 1h, 5d, 3w.',
  });

  graphRef = Option.String('--graphref', {
    required: false,
    description:
      'Optional. Specify a graph and variant. Example: mygraph@current',
  });

  key = Option.String('--key', {
    required: false,
    description:
      'Specify an API key. Prefer setting an APOLLO_KEY environment variable.',
  });

  out = Option.String('--out', {
    required: false,
    description: 'Optional. Path to a directory to store audit results.',
  });

  includeDiagrams = Option.Boolean('--include-diagrams', {
    required: false,
    description:
      'Optional. Include a visual .mmd file of the query plans. ' +
      'There may be some issues with specific query plans.',
  });

  async execute() {
    const spinner = ora();
    const client = await getClient(this.key, {
      useSudo: this.accountId != null,
      staging: this.staging ?? false,
    });

    const config = await getConfig(
      client,
      this.config,
      this.graphRef,
      this.accountId,
    );

    spinner.text = `Fetching subgraphs for ${config.experimental_fed2readiness.graph_ref}`;
    spinner.start();

    const resolvedConfig = await resolveConfig(client, config);

    spinner.stop();

    spinner.text = 'Composing';
    spinner.start();

    const fed1 = await composeWithResolvedConfig1(resolvedConfig);
    const fed2 = await composeWithResolvedConfig2(resolvedConfig);

    spinner.stop();

    if (!fed1.schema || fed1.errors?.length) {
      this.context.stdout.write(
        '💣 Schema did not compose with Federation v1\n',
      );
      this.context.stderr.write(
        fed1.errors?.map((e) => e.toString())?.join('\n\n'),
      );
      this.context.stdout.write('');
      return;
    }

    this.context.stdout.write('✅ Schema composes with Federation v1\n');

    if (!fed2.schema || fed2.errors) {
      this.context.stdout.write(
        '💣 Schema did not compose with Federation v2\n',
      );
      this.context.stdout.write(
        fed2.errors.map((e) => e.toString()).join('\n\n'),
      );
      this.context.stdout.write('');
      return;
    }

    this.context.stdout.write('✅ Schema composes with Federation v2\n');

    spinner.text = 'Attempting to load supergraphs in @apollo/gateway v2';
    spinner.start();

    const [fed1Gateway, fed2Gateway] = await Promise.all([
      loadSupergraphInGateway(/** @type {string} */ (fed1.supergraphSdl)),
      loadSupergraphInGateway(fed2.supergraphSdl),
    ]);

    spinner.stop();

    if (!fed1Gateway.success) {
      this.context.stdout.write(
        '💣 Could not load Federation v1 supergraph in @apollo/gateway v2\n',
      );
      this.context.stdout.write(fed1Gateway.error.toString());
      this.context.stdout.write('');
    }

    if (!fed2Gateway.success) {
      this.context.stdout.write(
        '💣 Could not load Federation v2 supergraph in @apollo/gateway v2\n',
      );
      this.context.stdout.write(fed2Gateway.error.toString());
      this.context.stdout.write('');
    }

    if (!fed1Gateway.success || !fed2Gateway.success) {
      return;
    }

    const operations = await getOperations(
      client,
      config.experimental_fed2readiness.graph_ref,
      this.from,
    );

    const validOperations = operations.filter(validateOperation);

    this.context.stdout.write(
      `Generating query plans for ${validOperations.length} operations\n`,
    );

    const progress = new SingleBar({}, Presets.shades_classic);
    progress.start(validOperations.length, 0);

    const results = queryPlanAudit({
      fed1Schema: fed1,
      fed2Schema: fed2,
      operations: validOperations,
      progressCallback: (count) => {
        progress.update(count);
      },
    });

    progress.update(validOperations.length);
    progress.stop();

    const total = validOperations.length;
    const matched = results.filter(
      (r) => r.type === 'SUCCESS' && r.queryPlansMatch,
    ).length;

    this.context.stdout.write('-----------------------------------\n');
    this.context.stdout.write(`✅ Operations audited: ${total}\n`);
    this.context.stdout.write(`🏆 Operations that match: ${matched}\n`);

    if (matched < total) {
      this.context.stdout.write(
        `❌ Operations with differences: ${total - matched}\n`,
      );
    }

    if (this.out) {
      await mkdir(this.out, { recursive: true });

      for (const result of results) {
        const name = `${result.queryName ?? 'Unnamed'}-${result.queryId.slice(
          0,
          6,
        )}`;
        const path = join(this.out, `${name}.md`);
        const diagramPathFed1 = join(this.out, `${name}-fed1.mmd`);
        const diagramPathFed2 = join(this.out, `${name}-fed2.mmd`);

        // Write Mermaid diagrams
        if (result.one && this.includeDiagrams) {
          const mermaidFed1 = queryPlanToMermaid(
            this.context,
            diagramPathFed1,
            result.one,
          );
          if (mermaidFed1) {
            // eslint-disable-next-line no-await-in-loop
            await writeFile(diagramPathFed1, mermaidFed1, 'utf-8');
          }
        }

        if (result.two && this.includeDiagrams) {
          const mermaidFed2 = queryPlanToMermaid(
            this.context,
            diagramPathFed2,
            result.two,
          );
          if (mermaidFed2) {
            // eslint-disable-next-line no-await-in-loop
            await writeFile(diagramPathFed2, mermaidFed2, 'utf-8');
          }
        }

        if (result.type === 'SUCCESS' && !result.queryPlansMatch) {
          // eslint-disable-next-line no-await-in-loop
          await writeFile(
            path,
            generateReport(result, config.experimental_fed2readiness.graph_ref),
            'utf-8',
          );
        } else if (result.type === 'FAILURE') {
          // eslint-disable-next-line no-await-in-loop
          await writeFile(
            path,
            generateFailureReport(
              result,
              config.experimental_fed2readiness.graph_ref,
            ),
            'utf-8',
          );
        }
      }

      if (fed1.supergraphSdl) {
        await writeFile(
          join(this.out, '.supergraph.fed1.graphql'),
          fed1.supergraphSdl,
          'utf-8',
        );
      }

      if (fed2.supergraphSdl) {
        await writeFile(
          join(this.out, '.supergraph.fed2.graphql'),
          fed2.supergraphSdl,
          'utf-8',
        );
      }

      this.context.stdout.write(`Results written to ${this.out}\n`);
    } else {
      this.context.stdout.write(
        '\nAdd --out <directory> to print reports for each operation.\n',
      );
    }
  }
}
