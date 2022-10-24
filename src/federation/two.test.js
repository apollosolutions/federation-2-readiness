import { composeWithResolvedConfig, queryPlan } from './two.js';

test('query planning', async () => {
  const result = await composeWithResolvedConfig({
    subgraphs: {
      products: {
        url: 'http://locahost:4001',
        schema: `
          type Query {
            products(search: [String!]): [Product]
          }

          type Product @key(fields: "id") {
            id: ID!
            name: String
            price: Price
          }

          type Price {
            amount: Int
            currencyCode: String
          }
        `,
      },
      reviews: {
        url: 'http://localhost:4002',
        schema: `
          extend type Product @key(fields: "id") {
            id: ID! @external
            price: Price @external
            reviews: [Review]
          }

          type Review {
            id: ID!
            rating: Int
            product: Product @provides(fields: "price { amount currencyCode }")
          }

          type Price {
            amount: Int
            currencyCode: String
          }
        `,
      },
    },
  });

  expect(result.schema).toBeDefined();
  if (!result.schema) throw new Error();

  const plan = queryPlan(
    result.schema,
    `#graphql
    query Search($search: [String!]) {
      products(search: $search) {
        name
        reviews {
          rating
        }
      }
    }
  `,
    'Search',
  );

  expect(plan).toMatchInlineSnapshot(`
Object {
  "kind": "QueryPlan",
  "node": Object {
    "kind": "Sequence",
    "nodes": Array [
      Object {
        "id": undefined,
        "kind": "Fetch",
        "operation": "query Search__products__0($search:[String!]){products(search:$search){__typename id name}}",
        "operationDocumentNode": Object {
          "definitions": Array [
            Object {
              "kind": "OperationDefinition",
              "name": Object {
                "kind": "Name",
                "value": "Search__products__0",
              },
              "operation": "query",
              "selectionSet": Object {
                "kind": "SelectionSet",
                "selections": Array [
                  Object {
                    "alias": undefined,
                    "arguments": Array [
                      Object {
                        "kind": "Argument",
                        "name": Object {
                          "kind": "Name",
                          "value": "search",
                        },
                        "value": Object {
                          "kind": "Variable",
                          "name": Object {
                            "kind": "Name",
                            "value": "search",
                          },
                        },
                      },
                    ],
                    "directives": undefined,
                    "kind": "Field",
                    "name": Object {
                      "kind": "Name",
                      "value": "products",
                    },
                    "selectionSet": Object {
                      "kind": "SelectionSet",
                      "selections": Array [
                        Object {
                          "alias": undefined,
                          "arguments": undefined,
                          "directives": undefined,
                          "kind": "Field",
                          "name": Object {
                            "kind": "Name",
                            "value": "__typename",
                          },
                          "selectionSet": undefined,
                        },
                        Object {
                          "alias": undefined,
                          "arguments": undefined,
                          "directives": undefined,
                          "kind": "Field",
                          "name": Object {
                            "kind": "Name",
                            "value": "id",
                          },
                          "selectionSet": undefined,
                        },
                        Object {
                          "alias": undefined,
                          "arguments": undefined,
                          "directives": undefined,
                          "kind": "Field",
                          "name": Object {
                            "kind": "Name",
                            "value": "name",
                          },
                          "selectionSet": undefined,
                        },
                      ],
                    },
                  },
                ],
              },
              "variableDefinitions": Array [
                Object {
                  "defaultValue": undefined,
                  "directives": undefined,
                  "kind": "VariableDefinition",
                  "type": Object {
                    "kind": "ListType",
                    "type": Object {
                      "kind": "NonNullType",
                      "type": Object {
                        "kind": "NamedType",
                        "name": Object {
                          "kind": "Name",
                          "value": "String",
                        },
                      },
                    },
                  },
                  "variable": Object {
                    "kind": "Variable",
                    "name": Object {
                      "kind": "Name",
                      "value": "search",
                    },
                  },
                },
              ],
            },
          ],
          "kind": "Document",
        },
        "operationKind": "query",
        "operationName": "Search__products__0",
        "requires": undefined,
        "serviceName": "products",
        "variableUsages": Array [
          "search",
        ],
      },
      Object {
        "kind": "Flatten",
        "node": Object {
          "id": undefined,
          "kind": "Fetch",
          "operation": "query Search__reviews__1($representations:[_Any!]!){_entities(representations:$representations){...on Product{reviews{rating}}}}",
          "operationDocumentNode": Object {
            "definitions": Array [
              Object {
                "kind": "OperationDefinition",
                "name": Object {
                  "kind": "Name",
                  "value": "Search__reviews__1",
                },
                "operation": "query",
                "selectionSet": Object {
                  "kind": "SelectionSet",
                  "selections": Array [
                    Object {
                      "alias": undefined,
                      "arguments": Array [
                        Object {
                          "kind": "Argument",
                          "name": Object {
                            "kind": "Name",
                            "value": "representations",
                          },
                          "value": Object {
                            "kind": "Variable",
                            "name": Object {
                              "kind": "Name",
                              "value": "representations",
                            },
                          },
                        },
                      ],
                      "directives": undefined,
                      "kind": "Field",
                      "name": Object {
                        "kind": "Name",
                        "value": "_entities",
                      },
                      "selectionSet": Object {
                        "kind": "SelectionSet",
                        "selections": Array [
                          Object {
                            "directives": undefined,
                            "kind": "InlineFragment",
                            "selectionSet": Object {
                              "kind": "SelectionSet",
                              "selections": Array [
                                Object {
                                  "alias": undefined,
                                  "arguments": undefined,
                                  "directives": undefined,
                                  "kind": "Field",
                                  "name": Object {
                                    "kind": "Name",
                                    "value": "reviews",
                                  },
                                  "selectionSet": Object {
                                    "kind": "SelectionSet",
                                    "selections": Array [
                                      Object {
                                        "alias": undefined,
                                        "arguments": undefined,
                                        "directives": undefined,
                                        "kind": "Field",
                                        "name": Object {
                                          "kind": "Name",
                                          "value": "rating",
                                        },
                                        "selectionSet": undefined,
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                            "typeCondition": Object {
                              "kind": "NamedType",
                              "name": Object {
                                "kind": "Name",
                                "value": "Product",
                              },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
                "variableDefinitions": Array [
                  Object {
                    "defaultValue": undefined,
                    "directives": undefined,
                    "kind": "VariableDefinition",
                    "type": Object {
                      "kind": "NonNullType",
                      "type": Object {
                        "kind": "ListType",
                        "type": Object {
                          "kind": "NonNullType",
                          "type": Object {
                            "kind": "NamedType",
                            "name": Object {
                              "kind": "Name",
                              "value": "_Any",
                            },
                          },
                        },
                      },
                    },
                    "variable": Object {
                      "kind": "Variable",
                      "name": Object {
                        "kind": "Name",
                        "value": "representations",
                      },
                    },
                  },
                ],
              },
            ],
            "kind": "Document",
          },
          "operationKind": "query",
          "operationName": "Search__reviews__1",
          "requires": Array [
            Object {
              "kind": "InlineFragment",
              "selections": Array [
                Object {
                  "kind": "Field",
                  "name": "__typename",
                  "selections": undefined,
                },
                Object {
                  "kind": "Field",
                  "name": "id",
                  "selections": undefined,
                },
              ],
              "typeCondition": "Product",
            },
          ],
          "serviceName": "reviews",
          "variableUsages": Array [],
        },
        "path": Array [
          "products",
          "@",
        ],
      },
    ],
  },
}
`);
});
