import {
  FetchNode,
  FlattenNode,
  ParallelNode,
  SequenceNode,
} from '@apollo/query-planner';
import {
  FetchNode1,
  FlattenNode1,
  ParallelNode1,
  SequenceNode1,
} from '@apollo/query-planner-1';
import { QueryPlan as QueryPlan_1 } from '@apollo/query-planner-1';
import { QueryPlan as QueryPlan_2 } from '@apollo/query-planner';
import { GraphQLError } from 'graphql';

interface Operation {
  queryId: string;
  queryName: string | undefined;
  querySignature: string;
}

type AuditResult =
  | {
      type: 'SUCCESS';
      queryPlansMatch: boolean;
      planner1MatchesPlanner2: boolean;
      planner2MatchesBothSupergraphs: boolean;
      one: QueryPlan_1;
      two: QueryPlan_2;
      twoFromOne: QueryPlan_2;
      normalizedOne: QueryPlan_1;
      normalizedTwo: QueryPlan_2;
      normalizedTwoFromOne: QueryPlan_2;
      queryId: string;
      queryName: string | undefined;
      querySignature: string;
      twoFetchErrors: GraphQLError[];
      twoFromOneFetchErrors: GraphQLError[];
    }
  | {
      type: 'FAILURE';
      queryId: string;
      queryName: string | undefined;
      querySignature: string;
      one?: QueryPlan_1 | undefined;
      two?: QueryPlan_2 | undefined;
      twoFromOne?: QueryPlan_2 | undefined;
      oneError?: Error | undefined;
      twoError?: Error | undefined;
      twoFromOneError?: Error | undefined;
    };

interface QueryPlanVisitor2 {
  Fetch?: (node: FetchNode) => FetchNode | undefined;
  Flatten?: (node: FlattenNode) => FlattenNode | undefined;
  Parallel?: (node: ParallelNode) => ParallelNode | undefined;
  Sequence?: (node: SequenceNode) => SequenceNode | undefined;
}

interface QueryPlanVisitor1 {
  Fetch?: (node: FetchNode1) => FetchNode1 | undefined;
  Flatten?: (node: FlattenNode1) => FlattenNode1 | undefined;
  Parallel?: (node: ParallelNode1) => ParallelNode1 | undefined;
  Sequence?: (node: SequenceNode1) => SequenceNode1 | undefined;
}
