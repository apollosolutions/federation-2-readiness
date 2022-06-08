import { GraphQLError, parse, validate, print } from 'graphql';
import { queryPlan as queryPlan1 } from './one.js';
import { queryPlan as queryPlan2, queryPlanWithFed1Schema } from './two.js';
import { diffQueryPlans } from './diff.js';
import { normalizeQueryPlan as normalizeQueryPlan1 } from './normalize-1.js';
import { normalizeQueryPlan as normalizeQueryPlan2 } from './normalize-2.js';

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
 * @typedef {import('../typings.js').Operation} Operation
 * @typedef {import('../typings.js').AuditResult} AuditResult
 */

/**
 * @param {import('@apollo/query-planner').QueryPlan} queryPlan
 */
function allFetchNodes(queryPlan) {
  /** @type {import('@apollo/query-planner').FetchNode[]} */
  const fetchNodes = [];

  /**
   * @param {import('@apollo/query-planner').PlanNode} node
   */
  function recurse(node) {
    switch (node.kind) {
      case 'Fetch':
        fetchNodes.push(node);
        break;
      case 'Flatten':
        recurse(node.node);
        break;
      case 'Parallel':
      case 'Sequence':
        node.nodes.map((n) => recurse(n));
        node.nodes.map((n) => recurse(n));
        break;
      default:
        throw new Error('not possible');
    }
  }

  if (queryPlan.node) {
    recurse(queryPlan.node);
  }

  return fetchNodes;
}

/**
 * @param {import('@apollo/query-planner').FetchNode} fetchNode
 * @param {Map<string, import("graphql").GraphQLSchema>} subgraphSchemas
 */
function validateFetchNode(fetchNode, subgraphSchemas) {
  const subgraphSchema = subgraphSchemas.get(fetchNode.serviceName);
  if (!subgraphSchema) {
    return [
      new GraphQLError(
        `fetch node calls missing subgraph ${fetchNode.serviceName}`,
        {
          extensions: {
            subgraph: fetchNode.serviceName,
          },
        },
      ),
    ];
  }

  const errors = validate(subgraphSchema, parse(fetchNode.operation));
  return errors.map(
    (err) =>
      new GraphQLError(err.message, {
        ...err,
        extensions: {
          ...err.extensions,
          subgraph: fetchNode.serviceName,
          operation: print(parse(fetchNode.operation)),
        },
      }),
  );
}

/**
 * @param {import('@apollo/query-planner').QueryPlan} queryPlan
 * @param {Map<string, import("graphql").GraphQLSchema>} subgraphSchemas
 */
function validateQueryPlan(queryPlan, subgraphSchemas) {
  return allFetchNodes(queryPlan).flatMap((fetchNode) =>
    validateFetchNode(fetchNode, subgraphSchemas),
  );
}

/**
 * @param {{
 *  fed1Schema: import('./one.js').CompositionResult;
 *  fed2Schema: import('@apollo/composition').CompositionSuccess;
 *  operations: Operation[];
 *  subgraphSchemas: Map<string, import("graphql").GraphQLSchema>;
 * }} options
 * @returns {Promise<AuditResult[]>}
 */
export async function queryPlanAudit({
  fed1Schema,
  fed2Schema,
  operations,
  subgraphSchemas,
}) {
  return Promise.all(
    operations.map(async (op) => {
      assert(fed1Schema.schema, 'federation 1 composition unsuccessful');
      assert(fed1Schema.supergraphSdl, 'federation 1 composition unsuccessful');

      const [
        { one, oneError },
        { two, twoError },
        { twoFromOne, twoFromOneError },
      ] = await Promise.all([
        queryPlan1(fed1Schema.schema, op.querySignature, op.queryName).then(
          (qp) => ({ one: qp, oneError: undefined }),
          (e) => ({ one: undefined, oneError: e }),
        ),

        queryPlan2(fed2Schema.schema, op.querySignature, op.queryName).then(
          (qp) => ({ two: qp, twoError: undefined }),
          (e) => ({ two: undefined, twoError: e }),
        ),

        queryPlanWithFed1Schema(
          fed1Schema.supergraphSdl,
          op.querySignature,
          op.queryName,
        ).then(
          (qp) => ({ twoFromOne: qp, twoFromOneError: undefined }),
          (e) => ({ twoFromOne: undefined, twoFromOneError: e }),
        ),
      ]);

      if (oneError || twoError || twoFromOneError) {
        return {
          type: 'FAILURE',
          ...op,
          one,
          two,
          oneError,
          twoError,
          twoFromOneError,
        };
      }

      if (one && two && twoFromOne) {
        const normalizedOne = normalizeQueryPlan1(one);
        const normalizedTwo = normalizeQueryPlan2(two);
        const normalizedTwoFromOne = normalizeQueryPlan2(twoFromOne);
        const { differences: planner1Planner2 } = diffQueryPlans(
          normalizedOne,
          normalizedTwo,
        );
        const { differences: planner2BothSupergraphs } = diffQueryPlans(
          normalizedTwoFromOne,
          normalizedTwo,
        );

        const twoFetchErrors = validateQueryPlan(two, subgraphSchemas);
        const twoFromOneFetchErrors = validateQueryPlan(
          twoFromOne,
          subgraphSchemas,
        );

        return {
          type: 'SUCCESS',
          queryPlansMatch:
            planner1Planner2 === 0 && planner2BothSupergraphs === 0,
          planner1MatchesPlanner2: planner1Planner2 === 0,
          planner2MatchesBothSupergraphs: planner2BothSupergraphs === 0,
          one,
          two,
          twoFromOne,
          normalizedOne,
          normalizedTwo,
          normalizedTwoFromOne,
          twoFetchErrors,
          twoFromOneFetchErrors,
          ...op,
        };
      }

      return { type: 'FAILURE', ...op };
    }),
  );
}
