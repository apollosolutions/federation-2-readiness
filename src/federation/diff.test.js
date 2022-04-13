import { OperationTypeNode } from 'graphql';
import { diffQueryPlans } from './diff.js';
import { normalizeQueryPlan as normalizeQueryPlan1 } from './normalize-1.js';
import { normalizeQueryPlan as normalizeQueryPlan2 } from './normalize-2.js';

test('normalize', () => {
  /** @type {import('@apollo/query-planner-1').QueryPlan} */
  const one = {
    kind: 'QueryPlan',
    node: {
      kind: 'Sequence',
      nodes: [
        {
          kind: 'Fetch',
          serviceName: 'missions',
          variableUsages: [],
          operation: '{missions{crew{id __typename} designation id}}', // different order
          operationKind: OperationTypeNode.QUERY,
        },
        {
          kind: 'Flatten',
          path: ['missions', '@', 'crew', '@'],
          node: {
            kind: 'Fetch',
            serviceName: 'astronauts',
            requires: [
              {
                kind: 'InlineFragment',
                typeCondition: 'Astronaut',
                selections: [
                  // different order
                  { kind: 'Field', name: 'id' },
                  { kind: 'Field', name: '__typename' },
                ],
              },
            ],
            variableUsages: [],
            operation:
              'query($representations:[_Any!]!){_entities(representations:$representations){...on Astronaut{name}}}',
            operationKind: OperationTypeNode.QUERY,
          },
        },
      ],
    },
  };

  /** @type {import('@apollo/query-planner').QueryPlan} */
  const two = {
    kind: 'QueryPlan',
    node: {
      kind: 'Sequence',
      nodes: [
        {
          kind: 'Fetch',
          serviceName: 'missions',
          variableUsages: [],
          operation: '{missions{id designation crew{id __typename}}}',
          operationKind: OperationTypeNode.QUERY,
          operationName: undefined,
        },
        {
          kind: 'Flatten',
          path: ['missions', '@', 'crew', '@'],
          node: {
            kind: 'Fetch',
            serviceName: 'astronauts',
            requires: [
              {
                kind: 'InlineFragment',
                typeCondition: 'Astronaut',
                selections: [
                  { kind: 'Field', name: '__typename' },
                  { kind: 'Field', name: 'id' },
                ],
              },
            ],
            variableUsages: [],
            operation:
              'query($representations:[_Any!]!){_entities(representations:$representations){...on Astronaut{name}}}',
            operationKind: OperationTypeNode.QUERY,
            operationName: undefined,
          },
        },
      ],
    },
  };

  const result = diffQueryPlans(
    normalizeQueryPlan1(one),
    normalizeQueryPlan2(two),
  );

  expect(result.differences).toBe(0);
});
