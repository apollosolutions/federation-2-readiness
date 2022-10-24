import { queryPlan as queryPlan1 } from './one.js';
import { queryPlan as queryPlan2, queryPlanWithFed1Schema } from './two.js';
import { diffQueryPlans, diffQueryPlansBothFed2 } from './diff.js';
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
 * @param {{
 *  fed1Schema: import('./one.js').CompositionResult;
 *  fed2Schema: import('@apollo/composition').CompositionSuccess;
 *  operations: Operation[];
 *  progressCallback: (_: number) => void
 * }} options
 * @returns {AuditResult[]}
 */
export function queryPlanAudit({
  fed1Schema,
  fed2Schema,
  operations,
  progressCallback,
}) {
  /**
   * @param {Operation} op
   * @returns {AuditResult}
   */
  function plan(op) {
    assert(fed1Schema.schema, 'federation 1 composition unsuccessful');
    assert(fed1Schema.supergraphSdl, 'federation 1 composition unsuccessful');

    const { one, oneError } = (() => {
      try {
        const qp = queryPlan1(
          fed1Schema.schema,
          op.querySignature,
          op.queryName,
        );
        return { one: qp, oneError: undefined };
      } catch (e) {
        return {
          one: undefined,
          oneError: /** @type {import("graphql").GraphQLError} */ (e),
        };
      }
    })();

    const { two, twoError } = (() => {
      try {
        const qp = queryPlan2(
          fed2Schema.schema,
          op.querySignature,
          op.queryName,
        );
        return { two: qp, twoError: undefined };
      } catch (e) {
        return {
          two: undefined,
          twoError: /** @type {import("graphql").GraphQLError} */ (e),
        };
      }
    })();

    const { twoFromOne, twoFromOneError } = (() => {
      try {
        const qp = queryPlanWithFed1Schema(
          fed1Schema.supergraphSdl,
          op.querySignature,
          op.queryName,
        );
        return { twoFromOne: qp, twoFromOneError: undefined };
      } catch (e) {
        return {
          twoFromOne: undefined,
          twoFromOneError: /** @type {import("graphql").GraphQLError} */ (e),
        };
      }
    })();

    if (oneError || twoError || twoFromOneError) {
      /** @type {import('../typings.js').AuditResultFailure} */
      return {
        type: /** @type {const} */ ('FAILURE'),
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
      const { differences: planner2BothSupergraphs } = diffQueryPlansBothFed2(
        normalizedTwoFromOne,
        normalizedTwo,
      );

      /** @type {import('../typings.js').AuditResultSuccess} */
      return {
        type: /** @type {const} */ ('SUCCESS'),
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
        ...op,
      };
    }

    /** @type {import('../typings.js').AuditResultFailure} */
    return { type: /** @type {const} */ ('FAILURE'), ...op };
  }

  /** @type {AuditResult[]} */
  const results = [];

  let i = 0;
  for (const op of operations) {
    progressCallback(i);
    results.push(plan(op));
    i += 1;
  }

  return results;
}
