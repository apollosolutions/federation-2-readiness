import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import inquirer from 'inquirer';
import fuzzy from 'fuzzy';
import {
  GetSubgraphSdlsDocument,
  ListAvailableGraphsDocument,
  ListAvailableGraphsForAccountDocument,
  ListAvailableVariantsDocument,
  ListSubgraphsDocument,
} from '../studio/graphql.js';

/**
 * @param {import("@urql/core").Client} client
 * @param {string} graphRef
 * @returns
 */
async function getSubgraphSdls(client, graphRef) {
  const [serviceId, graphVariant] = graphRef.split('@');

  const { data, error } = await client
    .query(GetSubgraphSdlsDocument, {
      graphVariant,
      serviceId,
    })
    .toPromise();

  if (error) {
    throw new Error(error.message);
  }

  if (
    data?.service?.implementingServices?.__typename ===
    'FederatedImplementingServices'
  ) {
    return Object.fromEntries(
      data.service.implementingServices.services.map((s) => [
        s.name,
        s.activePartialSchema.sdl,
      ]),
    );
  }

  return {};
}

/**
 * @param {import("@urql/core").Client} client
 * @param {import("./typings").Subgraph} subgraph
 * @returns {Promise<import("./typings").ResolvedSubgraph>}
 */
async function resolveSubgraph(client, subgraph) {
  let schema;
  if ('subgraph_url' in subgraph.schema) {
    throw new Error('subgraph_url support not implemented');
  } else if ('file' in subgraph.schema) {
    schema = await readFile(subgraph.schema.file, 'utf-8');
  } else {
    const subgraphs = await getSubgraphSdls(client, subgraph.schema.graphref);
    if (subgraphs[subgraph.schema.subgraph]) {
      schema = subgraphs[subgraph.schema.subgraph];
    } else {
      throw new Error('missing subgraph');
    }
  }

  return {
    url: subgraph.routing_url,
    schema: schema ?? '',
  };
}

/**
 * @param {string} graphRef
 * @param {{ name: string, url?: string | null | undefined }[]} subgraphs
 * @returns {import("./typings").Config}
 */
export function createConfig(graphRef, subgraphs) {
  return {
    subgraphs: Object.fromEntries(
      subgraphs.map((s) => [
        s.name,
        {
          routing_url: s.url,
          schema: { graphref: graphRef, subgraph: s.name },
        },
      ]),
    ),

    experimental_fed2readiness: {
      graphref: graphRef,
    },
  };
}

/**
 *
 * @param {import("@urql/core").Client} client
 * @param {import("./typings").Config} config
 * @returns
 */
export async function resolveConfig(client, config) {
  const resolved = await Promise.all(
    Object.entries(config.subgraphs).map(async ([name, subgraph]) => [
      name,
      await resolveSubgraph(client, subgraph),
    ]),
  );

  return {
    ...config,
    subgraphs: Object.fromEntries(resolved),
  };
}

/**
 *
 * @param {import("@urql/core").Client} client
 * @param {string} graphRef
 * @returns
 */
async function listSubgraphs(client, graphRef) {
  const [id, graphVariant] = graphRef.split('@');
  const { data, error } = await client
    .query(ListSubgraphsDocument, {
      graphVariant,
      id,
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

/**
 *
 * @param {import("@urql/core").Client} client
 * @param {string | undefined} accountId
 * @returns
 */
async function getGraphs(client, accountId) {
  if (accountId) {
    const { data, error } = await client
      .query(ListAvailableGraphsForAccountDocument, {
        accountId,
      })
      .toPromise();
    if (error) {
      throw error;
    }

    return data?.account?.services?.map((s) => s.id) ?? [];
  }

  const { data, error } = await client
    .query(ListAvailableGraphsDocument)
    .toPromise();
  if (error) {
    throw error;
  }

  if (data?.me?.__typename === 'User') {
    return data.me.memberships
      .flatMap((m) => m.account.services)
      .map((s) => s.id);
  }

  return [];
}

/**
 * @param {import("@urql/core").Client} client
 * @param {string} graph
 */
export async function getVariants(client, graph) {
  const { data, error } = await client
    .query(ListAvailableVariantsDocument, { serviceId: graph })
    .toPromise();

  if (error) {
    throw error;
  }

  return data?.service?.variants?.map((v) => v.name) ?? [];
}

/**
 * @param {import("@urql/core").Client} client
 * @param {string} graph
 */
export async function chooseVariant(client, graph) {
  const variants = await getVariants(client, graph);

  const variant = await (async () => {
    if (variants.length === 1) {
      return variants[0];
    }
    return inquirer
      .prompt({
        // @ts-ignore
        type: 'autocomplete',
        name: 'key',
        message: 'Select Variant',
        // @ts-ignore
        source: (_, input) =>
          fuzzy
            .filter(input ?? '', variants)
            .sort((a, b) => (a.score > b.score ? 1 : -1))
            .map((v) => v.original),
      })
      .then((r) => r.key);
  })();

  return `${graph}@${variant}`;
}

/**
 * @param {import("@urql/core").Client} client
 * @param {string | undefined} accountId
 */
async function chooseGraphRef(client, accountId) {
  const graphs = await getGraphs(client, accountId);

  const graph = await (async () => {
    if (graphs.length === 1) {
      return graphs[0];
    }
    return inquirer
      .prompt({
        // @ts-ignore
        type: 'autocomplete',
        name: 'key',
        message: 'Select Graph',
        // @ts-ignore
        source: (_, input) =>
          fuzzy
            .filter(input ?? '', graphs)
            .sort((a, b) => (a.score > b.score ? 1 : -1))
            .map((v) => v.original),
      })
      .then((r) => r.key);
  })();

  return chooseVariant(client, graph);
}

/**
 * @param {string} config
 * @returns
 */
export async function readConfig(config) {
  return /** @type {import('../config/typings').Config} */ (
    load(await readFile(config, 'utf-8'))
  );
}

/**
 * @param {import("@urql/core").Client} client
 * @param {string | undefined} [config]
 * @param {string | undefined} [graphRef]
 * @param {string | undefined} [accountId]
 */
export async function getConfig(client, config, graphRef, accountId) {
  if (config) {
    return readConfig(config);
  }

  const selectedGraphRef =
    graphRef ?? (await chooseGraphRef(client, accountId));

  if (!selectedGraphRef) {
    throw new Error('no graph selected');
  }

  const subgraphs = await listSubgraphs(client, selectedGraphRef);
  return createConfig(selectedGraphRef, subgraphs);
}
