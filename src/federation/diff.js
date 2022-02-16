import { serializeQueryPlan as serializeQueryPlan1 } from '@apollo/query-planner-1';
import { serializeQueryPlan as serializeQueryPlan2 } from '@apollo/query-planner';
import { diffLinesRaw } from 'jest-diff';

/**
 * @param {import("@apollo/query-planner-1").QueryPlan} one
 * @param {import("@apollo/query-planner").QueryPlan} two
 * @returns
 */
export function diffQueryPlans(one, two) {
  const oneString = serializeQueryPlan1(one);
  const twoString = serializeQueryPlan2(two);

  const diffs = diffLinesRaw(oneString.split('\n'), twoString.split('\n'));
  const lines = diffs.length;
  const differences = diffs.filter((diff) => diff[0] !== 0).length;

  return {
    lines,
    differences,
    diffs,
  };
}
