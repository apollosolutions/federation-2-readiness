import { Schema } from '@apollo/federation-internals';
import { GraphQLSchema } from 'graphql';
import { queryPlan as queryPlan_1 } from './one.js';
import { queryPlan as queryPlan_2 } from './two.js';
import { diffQueryPlans, normalizeQueryPlan } from './diff.js';

/**
 * @typedef {import('../typings.js').Operation} Operation
 * @typedef {import('../typings.js').AuditResult} AuditResult
 */

/**
 * @param {{ fed1Schema: GraphQLSchema; fed2Schema: Schema; operations: Operation[] }} options
 * @returns {Promise<AuditResult[]>}
 */
export async function queryPlanAudit({ fed1Schema, fed2Schema, operations }) {
  return Promise.all(
    operations.map(async (op) => {
      try {
        const [one, two] = await Promise.all([
          queryPlan_1(fed1Schema, op.querySignature, op.queryName),
          queryPlan_2(fed2Schema, op.querySignature, op.queryName),
        ]);

        const normalizedOne = normalizeQueryPlan(one);
        const normalizedTwo = normalizeQueryPlan(two);

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
      } catch (e) {
        return { type: 'FAILURE', ...op };
      }
    }),
  );
}
