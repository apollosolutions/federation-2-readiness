# Federation 2 Readiness

Check your federated schema for backward-compatibility with [Federation 2](https://www.apollographql.com/docs/federation/v2) and audit query plans.

**The code in this repository is experimental and has been provided for reference purposes only. Community feedback is welcome but this project may not be supported in the same way that repositories in the official [Apollo GraphQL GitHub organization](https://github.com/apollographql) are. If you need help you can file an issue on this repository, [contact Apollo](https://www.apollographql.com/contact-sales) to talk to an expert, or create a ticket directly in Apollo Studio.**

## Usage

### Basic Usage

```sh
export APOLLO_KEY=<your apollo api key>
npx github:@apollosolutions/federation-2-readiness
# follow prompts to select a graph, a variant, and a time window for operations
```

Example output:

```sh
? Select Graph mygraph
Fetching subgraphs for mygraph@current...
Composing...
🎉 Composed successfully
Fetching operations...
? Audit Operations in the ... Last Day
-----------------------------------
Operations audited: 9
Operations that match: 9
```

### Generate Query Plan Reports

```sh
export APOLLO_KEY=<your apollo api key>
npx github:@apollosolutions/federation-2-readiness --out results
# follow prompts to select a graph, a variant, a time window for operations
```

Example report in `results/MyOperation-a1b2c3.md`:

```
MyOperation a1b2c3
==================
https://studio.apollographql.com/graph/mygraph/operations?query=a1b2c3&queryName=MyOperation&variant=current

💣 Query plans differ

Diff
----
- Expected
+ Received

  QueryPlan {
    Sequence {
      Fetch(service: "products") {
        {
          product(id: $productId) {
            __typename
            id
            dimensions {
              size
+             weight
            }
          }
        }
      },
      Flatten(path: "product") {
        Fetch(service: "shipping") {
          {
            ... on Product {
              __typename
              id
              dimensions {
                size
+               weight
              }
            }
          } =>
          {
            ... on Product {
              shippingCost {
                value
              }
            }
          }
        },
      },
    },
  }
```

### Resolve Composition Errors

If you encounter a composition error, you can run the audit against local subgraph files. The process is:

1. Generate a local supergraph config.
2. Download subgraph SDL files and point the supergraph config to use them.
3. Run the audit command using the local supergraph config instead of Studio.

```sh
npx github:@apollosolutions/federation-2-readiness config init --out supergraph.yaml
# follow prompts to select the graph and variant

npx github:@apollosolutions/federation-2-readiness config extract --config supergraph.yaml --out subgraphs
# follow prompts to select the subgraphs to extract to local files

npx github:@apollosolutions/federation-2-readiness --config supergraph.yaml
```

## Known Limitations

- Published only as source code to Github. Not available on NPM.
- Query plan diffing is naive and susceptible to false negatives due to field ordering in selection sets.
- The versions of Fed 1 and Fed 2 composition may not match what's running in Apollo Studio or Rover.
- I haven't written any tests!
