import { Command, Option } from 'clipanion';
import { readConfig } from '../config/index.js';
import { getClient } from '../studio/index.js';
import { mkdir, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { dump } from 'js-yaml';
import { GetSubgraphSdlsDocument } from '../studio/graphql.js';
import inquirer from 'inquirer';

/**
 * @param {import("@urql/core").Client} client
 * @param {string} graphRef
 */
export async function getSubgraphSdls(client, graphRef) {
  const [serviceId, graphVariant] = graphRef.split('@');

  const { data, error } = await client
    .query(GetSubgraphSdlsDocument, {
      graphVariant,
      serviceId,
    })
    .toPromise();

  if (error) {
    throw error;
  }

  if (
    data?.service?.implementingServices?.__typename ===
    'FederatedImplementingServices'
  ) {
    return data.service.implementingServices.services;
  }

  return [];
}

export default class ExtractSubgraphCommand extends Command {
  static paths = [['config', 'extract']];

  static usage = Command.Usage({
    category: 'Config',
    description:
      'Replace remote references in the supergraph config with local schema files.',
    details: `
      For each subgraph in a supergraph config file with a remote reference:

      \`\`\`
      subgraphs:
        products:
          routing_url: https://products.svc.prod.cluster/graphql
          schema:
            graphref: mycompany-graph
            subgraph: products
      \`\`\`

      This command supports downloading the schema SDL from Apollo Studio, writing
      it to a file in the directory specified by \`--out\`, and editing the config
      to include a local reference:

      \`\`\`
      subgraphs:
        products:
          routing_url: https://products.svc.prod.cluster/graphql
          schema:
            file: subgraphs/products.graphql
      \`\`\`
    `,
    examples: [
      ['A basic example', '$0 --config supergraph.yaml --out subgraphs'],
    ],
  });

  accountId = Option.String('--account', { required: false });

  // @TODO should be required but that breaks the help command
  config = Option.String('--config', { required: false });

  key = Option.String('--key', { required: false });

  // @TODO should be required but that breaks the help command
  out = Option.String('--out', { required: false });

  async execute() {
    if (!this.config) {
      this.context.stderr.write('Missing --config\n');
      return 1;
    }

    if (!this.out) {
      this.context.stderr.write('Missing --out\n');
      return 1;
    }

    const client = await getClient(this.key, {
      useSudo: this.accountId != null,
    });

    const config = await readConfig(this.config);

    const graphRef = config.experimental_fed2readiness.graph_ref;

    const subgraphsOfInterest = Object.fromEntries(
      Object.entries(config.subgraphs).filter(
        ([_, subgraph]) => !('file' in subgraph.schema),
      ),
    );

    const subgraphNames = Object.keys(subgraphsOfInterest);

    const selected = await inquirer
      .prompt({
        type: 'checkbox',
        name: 'key',
        message: 'Select subgraph',
        choices: subgraphNames,
      })
      .then((r) => r.key);
    if (!selected) {
      return;
    }

    const subgraphSdls = await getSubgraphSdls(client, graphRef);

    const sdls = subgraphSdls
      .filter((s) => selected.includes(s.name))
      .map((s) => [s.name, s.activePartialSchema.sdl]);

    if (!sdls.length) {
      return;
    }

    for (const [name, sdl] of sdls) {
      const path = join(this.out, `${name}.graphql`);
      await mkdir(dirname(path), { recursive: true });
      await writeFile(path, sdl);

      config.subgraphs[name].schema = { file: path };
    }

    await writeFile(this.config, dump(config), 'utf-8');
  }
}
