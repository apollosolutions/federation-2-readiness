import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { Command, Option } from 'clipanion';
import { getConfig, resolveConfig } from '../config/index.js';
import { RecentOperationsDocument } from '../studio/graphql.js';
import { composeWithResolvedConfig as composeWithResolvedConfig_1 } from '../federation/one.js';
import { composeWithResolvedConfig as composeWithResolvedConfig_2 } from '../federation/two.js';
import { getClient } from '../studio/index.js';
import inquirer from 'inquirer';
import { queryPlanAudit } from '../federation/query-plan-audit.js';
import { parse, print } from 'graphql';
import { diff } from 'jest-diff';

const FROM_OPTIONS = {
  'Last Hour': `${-60 * 60}`,
  'Last Day': `${-60 * 60 * 24}`,
  'Last Week': `${-60 * 60 * 24 * 7}`,
  'Last Month': `${-60 * 60 * 24 * 30}`,
};

/**
 * @param {import("@urql/core").Client} client
 * @param {string} graphRef
 * @param {string | undefined} from
 */
async function getOperations(client, graphRef, from) {
  let fromValue = from;

  if (!fromValue) {
    fromValue = await inquirer
      .prompt({
        type: 'list',
        name: 'key',
        message: 'Audit Operations in the ...',
        choices: Object.keys(FROM_OPTIONS),
      })
      .then(
        (/** @type {{ key: keyof FROM_OPTIONS }} */ r) => FROM_OPTIONS[r.key],
      );
  }

  const [serviceId, variantName] = graphRef.split('@');
  const { data, error } = await client
    .query(RecentOperationsDocument, {
      serviceId,
      variantName,
      from: fromValue,
    })
    .toPromise();

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
 * @returns {op is Operation}
 */
function validateOperation(op) {
  return (
    typeof op.queryId === 'string' && typeof op.querySignature === 'string'
  );
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

  config = Option.String('--config', { required: false });

  from = Option.String('--from', { required: false });

  graphRef = Option.String('--graphref', { required: false });

  key = Option.String('--key', { required: false });

  out = Option.String('--out', { required: false });

  async execute() {
    const client = await getClient(this.key, {
      useSudo: this.accountId != null,
    });

    const config = await getConfig(
      client,
      this.config,
      this.graphRef,
      this.accountId,
    );

    this.context.stdout.write(
      `Fetching subgraphs for ${config.experimental_fed2readiness.graph_ref}...\n`,
    );

    const resolvedConfig = await resolveConfig(client, config);

    this.context.stdout.write('Composing...\n');

    const fed1 = await composeWithResolvedConfig_1(resolvedConfig);
    const fed2 = await composeWithResolvedConfig_2(resolvedConfig);

    if (!fed1.schema) {
      this.context.stdout.write(
        '💣 Schema did not compose with Federation 1\n',
      );
      return;
    }

    if (!fed2.schema) {
      this.context.stdout.write(
        '💣 Schema did not compose with Federation 2\n',
      );
      return;
    }

    this.context.stdout.write('🎉 Composed successfully\n');

    this.context.stdout.write('Fetching operations...\n');
    const operations = await getOperations(
      client,
      config.experimental_fed2readiness.graph_ref,
      this.from,
    );

    const validOperations = operations.filter(validateOperation);

    const results = await queryPlanAudit({
      fed1Schema: fed1.schema,
      fed2Schema: fed2.schema,
      operations: validOperations,
    });

    this.context.stdout.write(`-----------------------------------\n`);
    this.context.stdout.write(
      `Operations audited: ${validOperations.length}\n`,
    );
    this.context.stdout.write(
      `Operations that match: ${
        results.filter((r) => r.type === 'SUCCESS' && r.queryPlansMatch).length
      }\n`,
    );

    if (this.out) {
      await mkdir(this.out, { recursive: true });

      for (const result of results) {
        if (result.type === 'SUCCESS' && !result.queryPlansMatch) {
          const path = join(
            this.out,
            `${result.queryName ?? 'Unnamed'}-${result.queryId.slice(0, 6)}.md`,
          );
          await writeFile(
            path,
            generateReport(result, config.experimental_fed2readiness.graph_ref),
            'utf-8',
          );
        }
      }

      this.context.stdout.write(`Results written to ${this.out}\n`);
    }
  }
}

/**
 *
 * @param {AuditResult} result
 * @param {string} graphRef
 * @returns {string}
 */
function generateReport(result, graphRef) {
  if (!result) {
    return '';
  }

  const noColor = (/** @type {any} */ _) => _;

  const options = {
    aColor: noColor,
    bColor: noColor,
    changeColor: noColor,
    commonColor: noColor,
    patchColor: noColor,
  };

  const title = `${result.queryName} ${result.queryId?.slice(0, 6)}`;
  const [graph, variant] = graphRef.split('@');
  return [
    title,
    '='.repeat(title.length),
    `https://studio.apollographql.com/graph/${graph}/operations?query=${result.queryId}&queryName=${result.queryName}&variant=${variant}`,
    '',
    result.type === 'SUCCESS' && result.one === result.two
      ? '🎉 No difference in query plans'
      : '💣 Query plans differ',
    '',
    'Diff',
    '----',
    '```diff',
    result.type === 'SUCCESS' ? diff(result.one, result.two, options) : '',
    '```',
    '',
    'Operation',
    '---------',
    '```graphql',
    print(parse(result.querySignature || '')),
    '```',
    'Federation 1 Query Plan',
    '-----------------------',
    '```',
    result.type === 'SUCCESS' ? result.one : '',
    '```',
    '',
    'Federation 2 Query Plan',
    '-----------------------',
    '```',
    result.type === 'SUCCESS' ? result.two : '',
    '```',
  ].join('\n');
}
