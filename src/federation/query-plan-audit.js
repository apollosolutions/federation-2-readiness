/* eslint-disable no-return-assign */
import { queryPlan as queryPlan1 } from './one.js';
import { queryPlan as queryPlan2 } from './two.js';
import { diffQueryPlans } from './diff.js';
import { normalizeQueryPlan as normalizeQueryPlan1 } from './normalize-1.js';
import { normalizeQueryPlan as normalizeQueryPlan2 } from './normalize-2.js';

/**
 * @typedef {import('../typings.js').Operation} Operation
 * @typedef {import('../typings.js').AuditResult} AuditResult
 */

/**
 * @param {{ fed1Schema: import("graphql").GraphQLSchema; fed2Schema: import("@apollo/federation-internals").Schema; operations: Operation[] }} options
 * @returns {Promise<AuditResult[]>}
 */
export async function queryPlanAudit({ fed1Schema, fed2Schema, operations }) {
  return Promise.all(
    operations.map(async (op) => {
      const [{ one, oneError }, { two, twoError }] = await Promise.all([
        queryPlan1(fed1Schema, op.querySignature, op.queryName).then(
          (qp) => ({ one: qp, oneError: undefined }),
          (e) => ({ one: undefined, oneError: e }),
        ),

        queryPlan2(fed2Schema, op.querySignature, op.queryName).then(
          (qp) => ({ two: qp, twoError: undefined }),
          (e) => ({ two: undefined, twoError: e }),
        ),
      ]);

      if (oneError || twoError) {
        return {
          type: 'FAILURE',
          ...op,
          one,
          two,
          oneError,
          twoError,
        };
      }

      if (one && two) {
        const normalizedOne = normalizeQueryPlan1(one);
        const normalizedTwo = normalizeQueryPlan2(two);
        const { differences } = diffQueryPlans(normalizedOne, normalizedTwo);

        return {
          type: 'SUCCESS',
          queryPlansMatch: differences === 0,
          one,
          two,
          normalizedOne,
          normalizedTwo,
          ...op,
        };
      }

      return { type: 'FAILURE', ...op };
    }),
  );
}
