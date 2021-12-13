import { Schema } from '@apollo/federation-internals';
import { GraphQLSchema } from 'graphql';
import { queryPlan as queryPlan_1 } from './one.js';
import { queryPlan as queryPlan_2 } from './two.js';

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

        return {
          type: 'SUCCESS',
          queryPlansMatch: one === two,
          one,
          two,
          ...op,
        };
      } catch (e) {
        return { type: 'FAILURE', ...op };
      }
    }),
  );
}
