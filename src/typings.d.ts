import {
  FetchNode,
  FlattenNode,
  ParallelNode,
  SequenceNode,
} from '@apollo/query-planner';
import { QueryPlan as QueryPlan_1 } from '@apollo/query-planner-1';
import { QueryPlan as QueryPlan_2 } from '@apollo/query-planner';

interface Operation {
  queryId: string;
  queryName: string | undefined;
  querySignature: string;
}

type AuditResult =
  | {
      type: 'SUCCESS';
      queryPlansMatch: boolean;
      one: QueryPlan_1;
      two: QueryPlan_2;
      normalizedOne: QueryPlan_1;
      normalizedTwo: QueryPlan_2;
      queryId: string;
      queryName: string | undefined;
      querySignature: string;
    }
  | {
      type: 'FAILURE';
      queryId: string;
      queryName: string | undefined;
      querySignature: string;
      one?: QueryPlan_1 | undefined;
      two?: QueryPlan_2 | undefined;
      oneError?: Error | undefined;
      twoError?: Error | undefined;
    };

interface QueryPlanVisitor {
  Fetch?: (node: FetchNode) => FetchNode | undefined;
  Flatten?: (node: FlattenNode) => FlattenNode | undefined;
  Parallel?: (node: ParallelNode) => ParallelNode | undefined;
  Sequence?: (node: SequenceNode) => SequenceNode | undefined;
}
