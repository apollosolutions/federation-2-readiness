import { composeAndValidate } from '@apollo/federation-1';
import {
  buildComposedSchema,
  buildOperationContext,
  QueryPlanner,
} from '@apollo/query-planner-1';
import { parse } from 'graphql';

/**
 * @typedef CompositionResult
 * @property {import("graphql").GraphQLSchema | undefined} schema
 * @property {string} [supergraphSdl]
 * @property {any[] | undefined} [errors]
 */

/**
 * @param {import("../config/typings").ResolvedConfig} config
 * @returns {Promise<CompositionResult>}
 */
export async function composeWithResolvedConfig(config) {
  const serviceList = Object.entries(config.subgraphs).map(
    ([name, subgraph]) => ({
      name,
      url: subgraph.url ?? undefined,
      typeDefs: parse(subgraph.schema),
    }),
  );

  const result = composeAndValidate(serviceList);

  if (result.supergraphSdl) {
    return {
      schema: buildComposedSchema(parse(result.supergraphSdl)),
      supergraphSdl: result.supergraphSdl,
    };
  }
  return result;
}

/**
 * @param {import("graphql").GraphQLSchema} schema
 * @param {string} operationDoc
 * @param {string} [operationName]
 */
export async function queryPlan(schema, operationDoc, operationName) {
  const documentNode = parse(operationDoc);
  const operationContext = buildOperationContext(
    schema,
    documentNode,
    operationName,
  );
  const queryPlanner = new QueryPlanner(schema);
  return queryPlanner.buildQueryPlan(operationContext, {
    autoFragmentization: false,
  });
}
