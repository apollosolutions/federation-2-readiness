import { diffQueryPlans, normalizeQueryPlan } from './diff.js';

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
          },
        },
      ],
    },
  };

  const result = diffQueryPlans(
    normalizeQueryPlan(one),
    normalizeQueryPlan(two),
  );

  expect(result.differences).toBe(0);
});
