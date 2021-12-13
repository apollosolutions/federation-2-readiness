interface Operation {
  queryId: string;
  queryName: string | undefined;
  querySignature: string;
}

type AuditResult =
  | {
      type: 'SUCCESS';
      queryPlansMatch: boolean;
      one: string;
      two: string;
      queryId: string;
      queryName: string | undefined;
      querySignature: string;
    }
  | {
      type: 'FAILURE';
      queryId: string;
      queryName: string | undefined;
      querySignature: string;
    };
