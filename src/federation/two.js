import { compose } from '@apollo/composition';
import {
  buildSubgraph,
  errorCauses,
  operationFromDocument,
  Subgraphs,
} from '@apollo/federation-internals';
import { QueryPlanner } from '@apollo/query-planner';
import { GraphQLError, parse } from 'graphql';

/**
 * @param {import("../config/typings").ResolvedConfig} config
 * @returns {Promise<import('@apollo/composition').CompositionResult>}
 */
export async function composeWithResolvedConfig(config) {
  const subgraphs = new Subgraphs();

  for (const [name, { url, schema: sdl }] of Object.entries(config.subgraphs)) {
    try {
      const subgraph = buildSubgraph(
        name,
        url ?? 'http://localhost:4001',
        sdl
      );
      subgraphs.add(subgraph);
    } catch (e) {
      const graphQLCauses = errorCauses(e);
      if (graphQLCauses) {
        return {
          errors: graphQLCauses
        };
      }
      throw new Error(`failed to build schema for ${name} subgraph`);
    }
  }

  try {
    return compose(subgraphs);
  } catch (e) {
    if (e instanceof Error) {
      return {
        errors: [new GraphQLError(e.message)],
      };
    }
    if (e instanceof GraphQLError) {
      return {
        errors: [e],
      };
    }
    throw e;
  }
}

/**
 * @param {import("@apollo/federation-internals").Schema} schema
 * @param {string} operationDoc
 * @param {string} [operationName]
 */
export async function queryPlan(schema, operationDoc, operationName) {
  const documentNode = parse(operationDoc);
  const operation = operationFromDocument(schema, documentNode, operationName);
  const queryPlanner = new QueryPlanner(schema);
  return queryPlanner.buildQueryPlan(operation);
}
