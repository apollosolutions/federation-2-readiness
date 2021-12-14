import { serializeQueryPlan as serializeQueryPlan_1 } from '@apollo/query-planner-1';
import { serializeQueryPlan as serializeQueryPlan_2 } from '@apollo/query-planner';
import { parse, print, visit } from 'graphql';
import { diffLinesRaw } from 'jest-diff';

/**
 * @typedef {import('@apollo/query-planner').QueryPlanSelectionNode} QueryPlanSelectionNode
 * @typedef {import('@apollo/query-planner').QueryPlan | import('@apollo/query-planner-1').QueryPlan} QueryPlan
 * @typedef {import('@apollo/query-planner').PlanNode} PlanNode
 * @typedef {import('../typings').QueryPlanVisitor} QueryPlanVisitor
 */

/**
 * @param {import("@apollo/query-planner-1").QueryPlan} one
 * @param {import("@apollo/query-planner").QueryPlan} two
 * @returns
 */
export function diffQueryPlans(one, two) {
  const oneString = serializeQueryPlan_1(one);
  const twoString = serializeQueryPlan_2(two);

  const diffs = diffLinesRaw(oneString.split('\n'), twoString.split('\n'));
  const lines = diffs.length;
  const differences = diffs.filter((diff) => diff[0] !== 0).length;

  return {
    lines,
    differences,
    diffs,
  };
}

/**
 * @param {import("@apollo/query-planner").QueryPlan} plan
 */
export function normalizeQueryPlan(plan) {
  return visitQueryPlan(plan, {
    Fetch(node) {
      return {
        ...node,
        operation: sortFieldsInOperation(node.operation),
        requires: node.requires
          ? sortRequiresSelections(node.requires)
          : undefined,
      };
    },
  });
}

/**
 * @param {QueryPlan} plan
 * @param {QueryPlanVisitor} visitor
 */
function visitQueryPlan(plan, visitor) {
  const newPlan = { ...plan };
  /**
   * @param {PlanNode} node
   */
  function recurse(node) {
    const newNode = { ...node };
    switch (newNode?.kind) {
      case 'Fetch':
        {
          if (visitor.Fetch) {
            const result = visitor.Fetch(newNode);
            if (result !== undefined) {
              newNode.operation = result.operation;
              newNode.requires = result.requires;
              newNode.serviceName = result.serviceName;
              newNode.variableUsages = result.variableUsages;
            }
          }
        }

        break;
      case 'Flatten':
        if (visitor.Flatten) {
          const result = visitor.Flatten(newNode);
          if (result !== undefined) {
            newNode.node = result.node;
            newNode.path = result.path;
          }
        }

        newNode.node = recurse(newNode.node);
        break;
      case 'Parallel':
        if (visitor.Parallel) {
          const result = visitor.Parallel(newNode);
          if (result !== undefined) {
            newNode.nodes = result.nodes;
          }
        }

        newNode.nodes = newNode.nodes.map((child) => recurse(child));
        break;
      case 'Sequence':
        if (visitor.Sequence) {
          const result = visitor.Sequence(newNode);
          if (result !== undefined) {
            newNode.nodes = result.nodes;
          }
        }

        newNode.nodes = newNode.nodes.map((child) => recurse(child));
    }

    return newNode;
  }

  if (newPlan.node) {
    return {
      ...newPlan,
      node: recurse(newPlan.node),
    };
  }
  return newPlan;
}

/**
 * @param {string} operation
 */
function sortFieldsInOperation(operation) {
  const doc = parse(operation);
  return print(
    visit(doc, {
      SelectionSet: {
        leave(node) {
          return {
            ...node,
            selections: node.selections.slice().sort((a, b) => {
              if (a.kind === 'Field' && b.kind === 'Field') {
                return a.name.value.localeCompare(b.name.value);
              }
              return 0;
            }),
          };
        },
      },
    }),
  );
}

/**
 * Returns new arrays of new nodes
 * @param {QueryPlanSelectionNode[]} nodes
 * @returns {QueryPlanSelectionNode[]}
 */
function sortRequiresSelections(nodes) {
  /**
   * @param {QueryPlanSelectionNode[]} nodes
   */
  function recurse(nodes) {
    /** @type {QueryPlanSelectionNode[]} */
    const newNodes = [];

    for (const node of nodes) {
      if (node.kind === 'Field') {
        newNodes.push({
          ...node,
          selections: node.selections ? recurse(node.selections) : undefined,
        });
      } else {
        newNodes.push({
          ...node,
          selections: recurse(node.selections),
        });
      }
    }

    return newNodes.sort((a, b) => {
      if (a.kind === 'InlineFragment') {
        return -1;
      } else if (a.kind === 'Field' && b.kind === 'Field') {
        return (a.alias ?? a.name).localeCompare(b.alias ?? b.name);
      }
      return 0;
    });
  }

  return recurse(nodes);
}
