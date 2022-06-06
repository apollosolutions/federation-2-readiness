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
 * @param {{ fed1Schema: import('./one.js').CompositionResult; fed2Schema: import('@apollo/composition').CompositionSuccess; operations: Operation[] }} options
 * @returns {Promise<AuditResult[]>}
 */
export async function queryPlanAudit({ fed1Schema, fed2Schema, operations }) {
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
          ...op,
        };
      }

      return { type: 'FAILURE', ...op };
    }),
  );
}
