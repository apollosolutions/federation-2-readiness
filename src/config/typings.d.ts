export interface Subgraph {
  routing_url: string | null | undefined;
  schema:
    | { graphref: string; subgraph: string }
    | { file: string }
    | { subgraph_url: string };
}

export interface Config {
  subgraphs: {
    [subgraph: string]: Subgraph;
  };

  experimental_fed2readiness: {
    graphref: string;
  };
}

export interface ResolvedSubgraph {
  url: string | null | undefined;
  schema: string;
}

export interface ResolvedConfig {
  subgraphs: {
    [subgraph: string]: ResolvedSubgraph;
  };
}
