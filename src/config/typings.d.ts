export interface Subgraph {
  routing_url: string | null | undefined;
  schema:
    | { graph_ref: string; subgraph: string }
    | { file: string }
    | { subgraph_url: string };
}

export interface Config {
  subgraphs: {
    [subgraph: string]: Subgraph;
  };

  experimental_fed2readiness: {
    graph_ref: string;
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
