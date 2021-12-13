import { composeAndValidate } from '@apollo/federation-1';
import {
  buildComposedSchema,
  buildOperationContext,
  QueryPlanner,
  serializeQueryPlan,
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
    ([name, subgraph]) => {
      return {
        name,
        url: subgraph.url ?? undefined,
        typeDefs: parse(subgraph.schema),
      };
    },
  );

  const result = composeAndValidate(serviceList);

  if (result.supergraphSdl) {
    return {
      schema: buildComposedSchema(parse(result.supergraphSdl)),
      supergraphSdl: result.supergraphSdl,
    };
  } else {
    return result;
  }
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
  const queryPlan = queryPlanner.buildQueryPlan(operationContext, {
    autoFragmentization: false,
  });
  return serializeQueryPlan(queryPlan);
}
