/** Columns of AccountEdgeServerInfos. */
export var AccountEdgeServerInfosColumn;
(function (AccountEdgeServerInfosColumn) {
    AccountEdgeServerInfosColumn["BootId"] = "BOOT_ID";
    AccountEdgeServerInfosColumn["ExecutableSchemaId"] = "EXECUTABLE_SCHEMA_ID";
    AccountEdgeServerInfosColumn["LibraryVersion"] = "LIBRARY_VERSION";
    AccountEdgeServerInfosColumn["Platform"] = "PLATFORM";
    AccountEdgeServerInfosColumn["RuntimeVersion"] = "RUNTIME_VERSION";
    AccountEdgeServerInfosColumn["SchemaTag"] = "SCHEMA_TAG";
    AccountEdgeServerInfosColumn["ServerId"] = "SERVER_ID";
    AccountEdgeServerInfosColumn["ServiceId"] = "SERVICE_ID";
    AccountEdgeServerInfosColumn["Timestamp"] = "TIMESTAMP";
    AccountEdgeServerInfosColumn["UserVersion"] = "USER_VERSION";
})(AccountEdgeServerInfosColumn || (AccountEdgeServerInfosColumn = {}));
/** Columns of AccountErrorStats. */
export var AccountErrorStatsColumn;
(function (AccountErrorStatsColumn) {
    AccountErrorStatsColumn["ClientName"] = "CLIENT_NAME";
    AccountErrorStatsColumn["ClientVersion"] = "CLIENT_VERSION";
    AccountErrorStatsColumn["ErrorsCount"] = "ERRORS_COUNT";
    AccountErrorStatsColumn["Path"] = "PATH";
    AccountErrorStatsColumn["QueryId"] = "QUERY_ID";
    AccountErrorStatsColumn["QueryName"] = "QUERY_NAME";
    AccountErrorStatsColumn["RequestsWithErrorsCount"] = "REQUESTS_WITH_ERRORS_COUNT";
    AccountErrorStatsColumn["SchemaHash"] = "SCHEMA_HASH";
    AccountErrorStatsColumn["SchemaTag"] = "SCHEMA_TAG";
    AccountErrorStatsColumn["ServiceId"] = "SERVICE_ID";
    AccountErrorStatsColumn["Timestamp"] = "TIMESTAMP";
})(AccountErrorStatsColumn || (AccountErrorStatsColumn = {}));
/** Columns of AccountFieldLatencies. */
export var AccountFieldLatenciesColumn;
(function (AccountFieldLatenciesColumn) {
    AccountFieldLatenciesColumn["FieldHistogram"] = "FIELD_HISTOGRAM";
    AccountFieldLatenciesColumn["FieldName"] = "FIELD_NAME";
    AccountFieldLatenciesColumn["ParentType"] = "PARENT_TYPE";
    AccountFieldLatenciesColumn["SchemaHash"] = "SCHEMA_HASH";
    AccountFieldLatenciesColumn["SchemaTag"] = "SCHEMA_TAG";
    AccountFieldLatenciesColumn["ServiceId"] = "SERVICE_ID";
    AccountFieldLatenciesColumn["Timestamp"] = "TIMESTAMP";
})(AccountFieldLatenciesColumn || (AccountFieldLatenciesColumn = {}));
/** Columns of AccountFieldUsage. */
export var AccountFieldUsageColumn;
(function (AccountFieldUsageColumn) {
    AccountFieldUsageColumn["ClientName"] = "CLIENT_NAME";
    AccountFieldUsageColumn["ClientVersion"] = "CLIENT_VERSION";
    AccountFieldUsageColumn["ExecutionCount"] = "EXECUTION_COUNT";
    AccountFieldUsageColumn["Field"] = "FIELD";
    AccountFieldUsageColumn["FieldName"] = "FIELD_NAME";
    AccountFieldUsageColumn["ParentType"] = "PARENT_TYPE";
    AccountFieldUsageColumn["QueryId"] = "QUERY_ID";
    AccountFieldUsageColumn["QueryName"] = "QUERY_NAME";
    AccountFieldUsageColumn["ReferencingOperationCount"] = "REFERENCING_OPERATION_COUNT";
    AccountFieldUsageColumn["SchemaHash"] = "SCHEMA_HASH";
    AccountFieldUsageColumn["SchemaTag"] = "SCHEMA_TAG";
    AccountFieldUsageColumn["ServiceId"] = "SERVICE_ID";
    AccountFieldUsageColumn["Timestamp"] = "TIMESTAMP";
})(AccountFieldUsageColumn || (AccountFieldUsageColumn = {}));
/** Columns of AccountOperationCheckStats. */
export var AccountOperationCheckStatsColumn;
(function (AccountOperationCheckStatsColumn) {
    AccountOperationCheckStatsColumn["CachedRequestsCount"] = "CACHED_REQUESTS_COUNT";
    AccountOperationCheckStatsColumn["ClientName"] = "CLIENT_NAME";
    AccountOperationCheckStatsColumn["ClientVersion"] = "CLIENT_VERSION";
    AccountOperationCheckStatsColumn["QueryId"] = "QUERY_ID";
    AccountOperationCheckStatsColumn["SchemaTag"] = "SCHEMA_TAG";
    AccountOperationCheckStatsColumn["ServiceId"] = "SERVICE_ID";
    AccountOperationCheckStatsColumn["Timestamp"] = "TIMESTAMP";
    AccountOperationCheckStatsColumn["UncachedRequestsCount"] = "UNCACHED_REQUESTS_COUNT";
})(AccountOperationCheckStatsColumn || (AccountOperationCheckStatsColumn = {}));
/** Columns of AccountQueryStats. */
export var AccountQueryStatsColumn;
(function (AccountQueryStatsColumn) {
    AccountQueryStatsColumn["CachedHistogram"] = "CACHED_HISTOGRAM";
    AccountQueryStatsColumn["CachedRequestsCount"] = "CACHED_REQUESTS_COUNT";
    AccountQueryStatsColumn["CacheTtlHistogram"] = "CACHE_TTL_HISTOGRAM";
    AccountQueryStatsColumn["ClientName"] = "CLIENT_NAME";
    AccountQueryStatsColumn["ClientVersion"] = "CLIENT_VERSION";
    AccountQueryStatsColumn["ForbiddenOperationCount"] = "FORBIDDEN_OPERATION_COUNT";
    AccountQueryStatsColumn["FromEngineproxy"] = "FROM_ENGINEPROXY";
    AccountQueryStatsColumn["QueryId"] = "QUERY_ID";
    AccountQueryStatsColumn["QueryName"] = "QUERY_NAME";
    AccountQueryStatsColumn["RegisteredOperationCount"] = "REGISTERED_OPERATION_COUNT";
    AccountQueryStatsColumn["RequestsWithErrorsCount"] = "REQUESTS_WITH_ERRORS_COUNT";
    AccountQueryStatsColumn["SchemaHash"] = "SCHEMA_HASH";
    AccountQueryStatsColumn["SchemaTag"] = "SCHEMA_TAG";
    AccountQueryStatsColumn["ServiceId"] = "SERVICE_ID";
    AccountQueryStatsColumn["Timestamp"] = "TIMESTAMP";
    AccountQueryStatsColumn["UncachedHistogram"] = "UNCACHED_HISTOGRAM";
    AccountQueryStatsColumn["UncachedRequestsCount"] = "UNCACHED_REQUESTS_COUNT";
})(AccountQueryStatsColumn || (AccountQueryStatsColumn = {}));
export var AccountState;
(function (AccountState) {
    AccountState["Active"] = "ACTIVE";
    AccountState["Closed"] = "CLOSED";
    AccountState["Unknown"] = "UNKNOWN";
    AccountState["Unprovisioned"] = "UNPROVISIONED";
})(AccountState || (AccountState = {}));
/** Columns of AccountTracePathErrorsRefs. */
export var AccountTracePathErrorsRefsColumn;
(function (AccountTracePathErrorsRefsColumn) {
    AccountTracePathErrorsRefsColumn["ClientName"] = "CLIENT_NAME";
    AccountTracePathErrorsRefsColumn["ClientVersion"] = "CLIENT_VERSION";
    AccountTracePathErrorsRefsColumn["DurationBucket"] = "DURATION_BUCKET";
    AccountTracePathErrorsRefsColumn["ErrorsCountInPath"] = "ERRORS_COUNT_IN_PATH";
    AccountTracePathErrorsRefsColumn["ErrorsCountInTrace"] = "ERRORS_COUNT_IN_TRACE";
    AccountTracePathErrorsRefsColumn["ErrorMessage"] = "ERROR_MESSAGE";
    AccountTracePathErrorsRefsColumn["Path"] = "PATH";
    AccountTracePathErrorsRefsColumn["QueryId"] = "QUERY_ID";
    AccountTracePathErrorsRefsColumn["QueryName"] = "QUERY_NAME";
    AccountTracePathErrorsRefsColumn["SchemaHash"] = "SCHEMA_HASH";
    AccountTracePathErrorsRefsColumn["SchemaTag"] = "SCHEMA_TAG";
    AccountTracePathErrorsRefsColumn["ServiceId"] = "SERVICE_ID";
    AccountTracePathErrorsRefsColumn["Timestamp"] = "TIMESTAMP";
    AccountTracePathErrorsRefsColumn["TraceHttpStatusCode"] = "TRACE_HTTP_STATUS_CODE";
    AccountTracePathErrorsRefsColumn["TraceId"] = "TRACE_ID";
    AccountTracePathErrorsRefsColumn["TraceSizeBytes"] = "TRACE_SIZE_BYTES";
    AccountTracePathErrorsRefsColumn["TraceStartsAt"] = "TRACE_STARTS_AT";
})(AccountTracePathErrorsRefsColumn || (AccountTracePathErrorsRefsColumn = {}));
/** Columns of AccountTraceRefs. */
export var AccountTraceRefsColumn;
(function (AccountTraceRefsColumn) {
    AccountTraceRefsColumn["ClientName"] = "CLIENT_NAME";
    AccountTraceRefsColumn["ClientVersion"] = "CLIENT_VERSION";
    AccountTraceRefsColumn["DurationBucket"] = "DURATION_BUCKET";
    AccountTraceRefsColumn["DurationNs"] = "DURATION_NS";
    AccountTraceRefsColumn["QueryId"] = "QUERY_ID";
    AccountTraceRefsColumn["QueryName"] = "QUERY_NAME";
    AccountTraceRefsColumn["SchemaHash"] = "SCHEMA_HASH";
    AccountTraceRefsColumn["SchemaTag"] = "SCHEMA_TAG";
    AccountTraceRefsColumn["ServiceId"] = "SERVICE_ID";
    AccountTraceRefsColumn["Timestamp"] = "TIMESTAMP";
    AccountTraceRefsColumn["TraceId"] = "TRACE_ID";
    AccountTraceRefsColumn["TraceSizeBytes"] = "TRACE_SIZE_BYTES";
})(AccountTraceRefsColumn || (AccountTraceRefsColumn = {}));
export var ActorType;
(function (ActorType) {
    ActorType["AnonymousUser"] = "ANONYMOUS_USER";
    ActorType["Backfill"] = "BACKFILL";
    ActorType["Cron"] = "CRON";
    ActorType["Graph"] = "GRAPH";
    ActorType["InternalIdentity"] = "INTERNAL_IDENTITY";
    ActorType["Synchronization"] = "SYNCHRONIZATION";
    ActorType["User"] = "USER";
})(ActorType || (ActorType = {}));
export var AuditStatus;
(function (AuditStatus) {
    AuditStatus["Cancelled"] = "CANCELLED";
    AuditStatus["Completed"] = "COMPLETED";
    AuditStatus["Expired"] = "EXPIRED";
    AuditStatus["Failed"] = "FAILED";
    AuditStatus["InProgress"] = "IN_PROGRESS";
    AuditStatus["Queued"] = "QUEUED";
})(AuditStatus || (AuditStatus = {}));
export var AvatarDeleteErrorCode;
(function (AvatarDeleteErrorCode) {
    AvatarDeleteErrorCode["SsoUsersCannotDeleteSelfAvatar"] = "SSO_USERS_CANNOT_DELETE_SELF_AVATAR";
})(AvatarDeleteErrorCode || (AvatarDeleteErrorCode = {}));
export var AvatarUploadErrorCode;
(function (AvatarUploadErrorCode) {
    AvatarUploadErrorCode["SsoUsersCannotUploadSelfAvatar"] = "SSO_USERS_CANNOT_UPLOAD_SELF_AVATAR";
})(AvatarUploadErrorCode || (AvatarUploadErrorCode = {}));
export var BillingModel;
(function (BillingModel) {
    BillingModel["RequestBased"] = "REQUEST_BASED";
    BillingModel["SeatBased"] = "SEAT_BASED";
})(BillingModel || (BillingModel = {}));
export var BillingPeriod;
(function (BillingPeriod) {
    BillingPeriod["Monthly"] = "MONTHLY";
    BillingPeriod["Quarterly"] = "QUARTERLY";
    BillingPeriod["SemiAnnually"] = "SEMI_ANNUALLY";
    BillingPeriod["Yearly"] = "YEARLY";
})(BillingPeriod || (BillingPeriod = {}));
export var BillingPlanKind;
(function (BillingPlanKind) {
    BillingPlanKind["Community"] = "COMMUNITY";
    BillingPlanKind["EnterpriseInternal"] = "ENTERPRISE_INTERNAL";
    BillingPlanKind["EnterprisePaid"] = "ENTERPRISE_PAID";
    BillingPlanKind["EnterprisePilot"] = "ENTERPRISE_PILOT";
    BillingPlanKind["TeamPaid"] = "TEAM_PAID";
    BillingPlanKind["TeamTrial"] = "TEAM_TRIAL";
})(BillingPlanKind || (BillingPlanKind = {}));
export var BillingPlanTier;
(function (BillingPlanTier) {
    BillingPlanTier["Community"] = "COMMUNITY";
    BillingPlanTier["Enterprise"] = "ENTERPRISE";
    BillingPlanTier["Team"] = "TEAM";
})(BillingPlanTier || (BillingPlanTier = {}));
export var CacheScope;
(function (CacheScope) {
    CacheScope["Private"] = "PRIVATE";
    CacheScope["Public"] = "PUBLIC";
    CacheScope["Unknown"] = "UNKNOWN";
    CacheScope["Unrecognized"] = "UNRECOGNIZED";
})(CacheScope || (CacheScope = {}));
/**
 * Defines a set of categories that a schema change
 * can be grouped by.
 */
export var ChangeCategory;
(function (ChangeCategory) {
    ChangeCategory["Addition"] = "ADDITION";
    ChangeCategory["Deprecation"] = "DEPRECATION";
    ChangeCategory["Edit"] = "EDIT";
    ChangeCategory["Removal"] = "REMOVAL";
})(ChangeCategory || (ChangeCategory = {}));
/**
 * These schema change codes represent all of the possible changes that can
 * occur during the schema diff algorithm.
 */
export var ChangeCode;
(function (ChangeCode) {
    /** Type of the argument was changed. */
    ChangeCode["ArgChangedType"] = "ARG_CHANGED_TYPE";
    /** Argument was changed from nullable to non-nullable. */
    ChangeCode["ArgChangedTypeOptionalToRequired"] = "ARG_CHANGED_TYPE_OPTIONAL_TO_REQUIRED";
    /** Default value added or changed for the argument. */
    ChangeCode["ArgDefaultValueChange"] = "ARG_DEFAULT_VALUE_CHANGE";
    /** Description was added, removed, or updated for argument. */
    ChangeCode["ArgDescriptionChange"] = "ARG_DESCRIPTION_CHANGE";
    /** Argument to a field was removed. */
    ChangeCode["ArgRemoved"] = "ARG_REMOVED";
    /** Argument to the directive was removed. */
    ChangeCode["DirectiveArgRemoved"] = "DIRECTIVE_ARG_REMOVED";
    /** Location of the directive was removed. */
    ChangeCode["DirectiveLocationRemoved"] = "DIRECTIVE_LOCATION_REMOVED";
    /** Directive was removed. */
    ChangeCode["DirectiveRemoved"] = "DIRECTIVE_REMOVED";
    /** Repeatable flag was removed for directive. */
    ChangeCode["DirectiveRepeatableRemoved"] = "DIRECTIVE_REPEATABLE_REMOVED";
    /** Enum was deprecated. */
    ChangeCode["EnumDeprecated"] = "ENUM_DEPRECATED";
    /** Reason for enum deprecation changed. */
    ChangeCode["EnumDeprecatedReasonChange"] = "ENUM_DEPRECATED_REASON_CHANGE";
    /** Enum deprecation was removed. */
    ChangeCode["EnumDeprecationRemoved"] = "ENUM_DEPRECATION_REMOVED";
    /** Description was added, removed, or updated for enum value. */
    ChangeCode["EnumValueDescriptionChange"] = "ENUM_VALUE_DESCRIPTION_CHANGE";
    /** Field was added to the type. */
    ChangeCode["FieldAdded"] = "FIELD_ADDED";
    /** Return type for the field was changed. */
    ChangeCode["FieldChangedType"] = "FIELD_CHANGED_TYPE";
    /** Field was deprecated. */
    ChangeCode["FieldDeprecated"] = "FIELD_DEPRECATED";
    /** Reason for field deprecation changed. */
    ChangeCode["FieldDeprecatedReasonChange"] = "FIELD_DEPRECATED_REASON_CHANGE";
    /** Field deprecation removed. */
    ChangeCode["FieldDeprecationRemoved"] = "FIELD_DEPRECATION_REMOVED";
    /** Description was added, removed, or updated for field. */
    ChangeCode["FieldDescriptionChange"] = "FIELD_DESCRIPTION_CHANGE";
    /** Type of the field in the input object was changed. */
    ChangeCode["FieldOnInputObjectChangedType"] = "FIELD_ON_INPUT_OBJECT_CHANGED_TYPE";
    /** Field was removed from the type. */
    ChangeCode["FieldRemoved"] = "FIELD_REMOVED";
    /** Field was removed from the input object. */
    ChangeCode["FieldRemovedFromInputObject"] = "FIELD_REMOVED_FROM_INPUT_OBJECT";
    /** Non-nullable field was added to the input object. */
    ChangeCode["NonNullableFieldAddedToInputObject"] = "NON_NULLABLE_FIELD_ADDED_TO_INPUT_OBJECT";
    /** Nullable field was added to the input type. */
    ChangeCode["NullableFieldAddedToInputObject"] = "NULLABLE_FIELD_ADDED_TO_INPUT_OBJECT";
    /** Nullable argument was added to the field. */
    ChangeCode["OptionalArgAdded"] = "OPTIONAL_ARG_ADDED";
    /** Non-nullable argument was added to the field. */
    ChangeCode["RequiredArgAdded"] = "REQUIRED_ARG_ADDED";
    /** Non-nullable argument added to directive. */
    ChangeCode["RequiredDirectiveArgAdded"] = "REQUIRED_DIRECTIVE_ARG_ADDED";
    /** Type was added to the schema. */
    ChangeCode["TypeAdded"] = "TYPE_ADDED";
    /** Type now implements the interface. */
    ChangeCode["TypeAddedToInterface"] = "TYPE_ADDED_TO_INTERFACE";
    /** A new value was added to the enum. */
    ChangeCode["TypeAddedToUnion"] = "TYPE_ADDED_TO_UNION";
    /**
     * Type was changed from one kind to another.
     * Ex: scalar to object or enum to union.
     */
    ChangeCode["TypeChangedKind"] = "TYPE_CHANGED_KIND";
    /** Description was added, removed, or updated for type. */
    ChangeCode["TypeDescriptionChange"] = "TYPE_DESCRIPTION_CHANGE";
    /** Type (object or scalar) was removed from the schema. */
    ChangeCode["TypeRemoved"] = "TYPE_REMOVED";
    /** Type no longer implements the interface. */
    ChangeCode["TypeRemovedFromInterface"] = "TYPE_REMOVED_FROM_INTERFACE";
    /** Type is no longer included in the union. */
    ChangeCode["TypeRemovedFromUnion"] = "TYPE_REMOVED_FROM_UNION";
    /** A new value was added to the enum. */
    ChangeCode["ValueAddedToEnum"] = "VALUE_ADDED_TO_ENUM";
    /** Value was removed from the enum. */
    ChangeCode["ValueRemovedFromEnum"] = "VALUE_REMOVED_FROM_ENUM";
})(ChangeCode || (ChangeCode = {}));
export var ChangeSeverity;
(function (ChangeSeverity) {
    ChangeSeverity["Failure"] = "FAILURE";
    ChangeSeverity["Notice"] = "NOTICE";
})(ChangeSeverity || (ChangeSeverity = {}));
export var ChangeType;
(function (ChangeType) {
    ChangeType["Failure"] = "FAILURE";
    ChangeType["Notice"] = "NOTICE";
})(ChangeType || (ChangeType = {}));
/** Options for filtering CheckWorkflows by status */
export var CheckFilterInputStatusOption;
(function (CheckFilterInputStatusOption) {
    CheckFilterInputStatusOption["Failed"] = "FAILED";
    CheckFilterInputStatusOption["Passed"] = "PASSED";
    CheckFilterInputStatusOption["Pending"] = "PENDING";
})(CheckFilterInputStatusOption || (CheckFilterInputStatusOption = {}));
export var CheckWorkflowStatus;
(function (CheckWorkflowStatus) {
    CheckWorkflowStatus["Failed"] = "FAILED";
    CheckWorkflowStatus["Passed"] = "PASSED";
    CheckWorkflowStatus["Pending"] = "PENDING";
})(CheckWorkflowStatus || (CheckWorkflowStatus = {}));
export var CheckWorkflowTaskStatus;
(function (CheckWorkflowTaskStatus) {
    CheckWorkflowTaskStatus["Blocked"] = "BLOCKED";
    CheckWorkflowTaskStatus["Failed"] = "FAILED";
    CheckWorkflowTaskStatus["Passed"] = "PASSED";
    CheckWorkflowTaskStatus["Pending"] = "PENDING";
})(CheckWorkflowTaskStatus || (CheckWorkflowTaskStatus = {}));
export var ComparisonOperator;
(function (ComparisonOperator) {
    ComparisonOperator["Equals"] = "EQUALS";
    ComparisonOperator["GreaterThan"] = "GREATER_THAN";
    ComparisonOperator["GreaterThanOrEqualTo"] = "GREATER_THAN_OR_EQUAL_TO";
    ComparisonOperator["LessThan"] = "LESS_THAN";
    ComparisonOperator["LessThanOrEqualTo"] = "LESS_THAN_OR_EQUAL_TO";
    ComparisonOperator["NotEquals"] = "NOT_EQUALS";
    ComparisonOperator["Unrecognized"] = "UNRECOGNIZED";
})(ComparisonOperator || (ComparisonOperator = {}));
export var ContractVariantFailedStep;
(function (ContractVariantFailedStep) {
    ContractVariantFailedStep["DirectiveDefinitionLocationAugmenting"] = "DIRECTIVE_DEFINITION_LOCATION_AUGMENTING";
    ContractVariantFailedStep["EmptyObjectAndInterfaceMasking"] = "EMPTY_OBJECT_AND_INTERFACE_MASKING";
    ContractVariantFailedStep["EmptyUnionMasking"] = "EMPTY_UNION_MASKING";
    ContractVariantFailedStep["EnsureQueryTypeAccessible"] = "ENSURE_QUERY_TYPE_ACCESSIBLE";
    ContractVariantFailedStep["InputValidation"] = "INPUT_VALIDATION";
    ContractVariantFailedStep["Parsing"] = "PARSING";
    ContractVariantFailedStep["ParsingTagDirectives"] = "PARSING_TAG_DIRECTIVES";
    ContractVariantFailedStep["PartialInterfaceMasking"] = "PARTIAL_INTERFACE_MASKING";
    ContractVariantFailedStep["SchemaRetrieval"] = "SCHEMA_RETRIEVAL";
    ContractVariantFailedStep["TagInheriting"] = "TAG_INHERITING";
    ContractVariantFailedStep["TagMatching"] = "TAG_MATCHING";
    ContractVariantFailedStep["ToApiSchema"] = "TO_API_SCHEMA";
    ContractVariantFailedStep["ToFilterSchema"] = "TO_FILTER_SCHEMA";
    ContractVariantFailedStep["Unknown"] = "UNKNOWN";
})(ContractVariantFailedStep || (ContractVariantFailedStep = {}));
export var DatadogApiRegion;
(function (DatadogApiRegion) {
    DatadogApiRegion["Eu"] = "EU";
    DatadogApiRegion["Eu1"] = "EU1";
    DatadogApiRegion["Us"] = "US";
    DatadogApiRegion["Us1"] = "US1";
    DatadogApiRegion["Us1Fed"] = "US1FED";
    DatadogApiRegion["Us3"] = "US3";
    DatadogApiRegion["Us5"] = "US5";
})(DatadogApiRegion || (DatadogApiRegion = {}));
export var DeletionTargetType;
(function (DeletionTargetType) {
    DeletionTargetType["Account"] = "ACCOUNT";
    DeletionTargetType["User"] = "USER";
})(DeletionTargetType || (DeletionTargetType = {}));
/** Columns of EdgeServerInfos. */
export var EdgeServerInfosColumn;
(function (EdgeServerInfosColumn) {
    EdgeServerInfosColumn["BootId"] = "BOOT_ID";
    EdgeServerInfosColumn["ExecutableSchemaId"] = "EXECUTABLE_SCHEMA_ID";
    EdgeServerInfosColumn["LibraryVersion"] = "LIBRARY_VERSION";
    EdgeServerInfosColumn["Platform"] = "PLATFORM";
    EdgeServerInfosColumn["RuntimeVersion"] = "RUNTIME_VERSION";
    EdgeServerInfosColumn["SchemaTag"] = "SCHEMA_TAG";
    EdgeServerInfosColumn["ServerId"] = "SERVER_ID";
    EdgeServerInfosColumn["ServiceId"] = "SERVICE_ID";
    EdgeServerInfosColumn["Timestamp"] = "TIMESTAMP";
    EdgeServerInfosColumn["UserVersion"] = "USER_VERSION";
})(EdgeServerInfosColumn || (EdgeServerInfosColumn = {}));
export var EmailCategory;
(function (EmailCategory) {
    EmailCategory["Educational"] = "EDUCATIONAL";
})(EmailCategory || (EmailCategory = {}));
/** Columns of ErrorStats. */
export var ErrorStatsColumn;
(function (ErrorStatsColumn) {
    ErrorStatsColumn["AccountId"] = "ACCOUNT_ID";
    ErrorStatsColumn["ClientName"] = "CLIENT_NAME";
    ErrorStatsColumn["ClientVersion"] = "CLIENT_VERSION";
    ErrorStatsColumn["ErrorsCount"] = "ERRORS_COUNT";
    ErrorStatsColumn["Path"] = "PATH";
    ErrorStatsColumn["QueryId"] = "QUERY_ID";
    ErrorStatsColumn["QueryName"] = "QUERY_NAME";
    ErrorStatsColumn["RequestsWithErrorsCount"] = "REQUESTS_WITH_ERRORS_COUNT";
    ErrorStatsColumn["SchemaHash"] = "SCHEMA_HASH";
    ErrorStatsColumn["SchemaTag"] = "SCHEMA_TAG";
    ErrorStatsColumn["ServiceId"] = "SERVICE_ID";
    ErrorStatsColumn["Timestamp"] = "TIMESTAMP";
})(ErrorStatsColumn || (ErrorStatsColumn = {}));
/**  Input parameters for run explorer operation event. */
export var EventEnum;
(function (EventEnum) {
    EventEnum["ClickCheckList"] = "CLICK_CHECK_LIST";
    EventEnum["ClickGoToGraphSettings"] = "CLICK_GO_TO_GRAPH_SETTINGS";
    EventEnum["RunExplorerOperation"] = "RUN_EXPLORER_OPERATION";
})(EventEnum || (EventEnum = {}));
/** Columns of FieldLatencies. */
export var FieldLatenciesColumn;
(function (FieldLatenciesColumn) {
    FieldLatenciesColumn["FieldHistogram"] = "FIELD_HISTOGRAM";
    FieldLatenciesColumn["FieldName"] = "FIELD_NAME";
    FieldLatenciesColumn["ParentType"] = "PARENT_TYPE";
    FieldLatenciesColumn["SchemaHash"] = "SCHEMA_HASH";
    FieldLatenciesColumn["SchemaTag"] = "SCHEMA_TAG";
    FieldLatenciesColumn["ServiceId"] = "SERVICE_ID";
    FieldLatenciesColumn["Timestamp"] = "TIMESTAMP";
})(FieldLatenciesColumn || (FieldLatenciesColumn = {}));
/** Columns of FieldUsage. */
export var FieldUsageColumn;
(function (FieldUsageColumn) {
    FieldUsageColumn["ClientName"] = "CLIENT_NAME";
    FieldUsageColumn["ClientVersion"] = "CLIENT_VERSION";
    FieldUsageColumn["ExecutionCount"] = "EXECUTION_COUNT";
    FieldUsageColumn["Field"] = "FIELD";
    FieldUsageColumn["FieldName"] = "FIELD_NAME";
    FieldUsageColumn["ParentType"] = "PARENT_TYPE";
    FieldUsageColumn["QueryId"] = "QUERY_ID";
    FieldUsageColumn["QueryName"] = "QUERY_NAME";
    FieldUsageColumn["ReferencingOperationCount"] = "REFERENCING_OPERATION_COUNT";
    FieldUsageColumn["SchemaHash"] = "SCHEMA_HASH";
    FieldUsageColumn["SchemaTag"] = "SCHEMA_TAG";
    FieldUsageColumn["ServiceId"] = "SERVICE_ID";
    FieldUsageColumn["Timestamp"] = "TIMESTAMP";
})(FieldUsageColumn || (FieldUsageColumn = {}));
export var GitRemoteHost;
(function (GitRemoteHost) {
    GitRemoteHost["Bitbucket"] = "BITBUCKET";
    GitRemoteHost["Github"] = "GITHUB";
    GitRemoteHost["Gitlab"] = "GITLAB";
})(GitRemoteHost || (GitRemoteHost = {}));
export var HttpMethod;
(function (HttpMethod) {
    HttpMethod["Connect"] = "CONNECT";
    HttpMethod["Delete"] = "DELETE";
    HttpMethod["Get"] = "GET";
    HttpMethod["Head"] = "HEAD";
    HttpMethod["Options"] = "OPTIONS";
    HttpMethod["Patch"] = "PATCH";
    HttpMethod["Post"] = "POST";
    HttpMethod["Put"] = "PUT";
    HttpMethod["Trace"] = "TRACE";
    HttpMethod["Unknown"] = "UNKNOWN";
    HttpMethod["Unrecognized"] = "UNRECOGNIZED";
})(HttpMethod || (HttpMethod = {}));
export var InternalMdgAdminRole;
(function (InternalMdgAdminRole) {
    InternalMdgAdminRole["InternalMdgReadOnly"] = "INTERNAL_MDG_READ_ONLY";
    InternalMdgAdminRole["InternalMdgSales"] = "INTERNAL_MDG_SALES";
    InternalMdgAdminRole["InternalMdgSuperAdmin"] = "INTERNAL_MDG_SUPER_ADMIN";
    InternalMdgAdminRole["InternalMdgSupport"] = "INTERNAL_MDG_SUPPORT";
})(InternalMdgAdminRole || (InternalMdgAdminRole = {}));
/** __DirectiveLocation introspection type */
export var IntrospectionDirectiveLocation;
(function (IntrospectionDirectiveLocation) {
    /** Location adjacent to an argument definition. */
    IntrospectionDirectiveLocation["ArgumentDefinition"] = "ARGUMENT_DEFINITION";
    /** Location adjacent to an enum definition. */
    IntrospectionDirectiveLocation["Enum"] = "ENUM";
    /** Location adjacent to an enum value definition. */
    IntrospectionDirectiveLocation["EnumValue"] = "ENUM_VALUE";
    /** Location adjacent to a field. */
    IntrospectionDirectiveLocation["Field"] = "FIELD";
    /** Location adjacent to a field definition. */
    IntrospectionDirectiveLocation["FieldDefinition"] = "FIELD_DEFINITION";
    /** Location adjacent to a fragment definition. */
    IntrospectionDirectiveLocation["FragmentDefinition"] = "FRAGMENT_DEFINITION";
    /** Location adjacent to a fragment spread. */
    IntrospectionDirectiveLocation["FragmentSpread"] = "FRAGMENT_SPREAD";
    /** Location adjacent to an inline fragment. */
    IntrospectionDirectiveLocation["InlineFragment"] = "INLINE_FRAGMENT";
    /** Location adjacent to an input object field definition. */
    IntrospectionDirectiveLocation["InputFieldDefinition"] = "INPUT_FIELD_DEFINITION";
    /** Location adjacent to an input object type definition. */
    IntrospectionDirectiveLocation["InputObject"] = "INPUT_OBJECT";
    /** Location adjacent to an interface definition. */
    IntrospectionDirectiveLocation["Interface"] = "INTERFACE";
    /** Location adjacent to a mutation operation. */
    IntrospectionDirectiveLocation["Mutation"] = "MUTATION";
    /** Location adjacent to an object type definition. */
    IntrospectionDirectiveLocation["Object"] = "OBJECT";
    /** Location adjacent to a query operation. */
    IntrospectionDirectiveLocation["Query"] = "QUERY";
    /** Location adjacent to a scalar definition. */
    IntrospectionDirectiveLocation["Scalar"] = "SCALAR";
    /** Location adjacent to a schema definition. */
    IntrospectionDirectiveLocation["Schema"] = "SCHEMA";
    /** Location adjacent to a subscription operation. */
    IntrospectionDirectiveLocation["Subscription"] = "SUBSCRIPTION";
    /** Location adjacent to a union definition. */
    IntrospectionDirectiveLocation["Union"] = "UNION";
    /** Location adjacent to a variable definition. */
    IntrospectionDirectiveLocation["VariableDefinition"] = "VARIABLE_DEFINITION";
})(IntrospectionDirectiveLocation || (IntrospectionDirectiveLocation = {}));
export var IntrospectionTypeKind;
(function (IntrospectionTypeKind) {
    /** Indicates this type is an enum. 'enumValues' is a valid field. */
    IntrospectionTypeKind["Enum"] = "ENUM";
    /** Indicates this type is an input object. 'inputFields' is a valid field. */
    IntrospectionTypeKind["InputObject"] = "INPUT_OBJECT";
    /**
     * Indicates this type is an interface. 'fields' and 'possibleTypes' are valid
     * fields
     */
    IntrospectionTypeKind["Interface"] = "INTERFACE";
    /** Indicates this type is a list. 'ofType' is a valid field. */
    IntrospectionTypeKind["List"] = "LIST";
    /** Indicates this type is a non-null. 'ofType' is a valid field. */
    IntrospectionTypeKind["NonNull"] = "NON_NULL";
    /** Indicates this type is an object. 'fields' and 'interfaces' are valid fields. */
    IntrospectionTypeKind["Object"] = "OBJECT";
    /** Indicates this type is a scalar. */
    IntrospectionTypeKind["Scalar"] = "SCALAR";
    /** Indicates this type is a union. 'possibleTypes' is a valid field. */
    IntrospectionTypeKind["Union"] = "UNION";
})(IntrospectionTypeKind || (IntrospectionTypeKind = {}));
export var InvoiceState;
(function (InvoiceState) {
    InvoiceState["Collected"] = "COLLECTED";
    InvoiceState["Failed"] = "FAILED";
    InvoiceState["Open"] = "OPEN";
    InvoiceState["PastDue"] = "PAST_DUE";
    InvoiceState["Unknown"] = "UNKNOWN";
})(InvoiceState || (InvoiceState = {}));
export var LaunchStatus;
(function (LaunchStatus) {
    LaunchStatus["LaunchCompleted"] = "LAUNCH_COMPLETED";
    LaunchStatus["LaunchFailed"] = "LAUNCH_FAILED";
    LaunchStatus["LaunchInitiated"] = "LAUNCH_INITIATED";
})(LaunchStatus || (LaunchStatus = {}));
export var LinkInfoType;
(function (LinkInfoType) {
    LinkInfoType["DeveloperPortal"] = "DEVELOPER_PORTAL";
    LinkInfoType["Other"] = "OTHER";
    LinkInfoType["Repository"] = "REPOSITORY";
})(LinkInfoType || (LinkInfoType = {}));
/** Columns of OperationCheckStats. */
export var OperationCheckStatsColumn;
(function (OperationCheckStatsColumn) {
    OperationCheckStatsColumn["CachedRequestsCount"] = "CACHED_REQUESTS_COUNT";
    OperationCheckStatsColumn["ClientName"] = "CLIENT_NAME";
    OperationCheckStatsColumn["ClientVersion"] = "CLIENT_VERSION";
    OperationCheckStatsColumn["QueryId"] = "QUERY_ID";
    OperationCheckStatsColumn["SchemaTag"] = "SCHEMA_TAG";
    OperationCheckStatsColumn["ServiceId"] = "SERVICE_ID";
    OperationCheckStatsColumn["Timestamp"] = "TIMESTAMP";
    OperationCheckStatsColumn["UncachedRequestsCount"] = "UNCACHED_REQUESTS_COUNT";
})(OperationCheckStatsColumn || (OperationCheckStatsColumn = {}));
export var Ordering;
(function (Ordering) {
    Ordering["Ascending"] = "ASCENDING";
    Ordering["Descending"] = "DESCENDING";
})(Ordering || (Ordering = {}));
export var OrganizationSsoProvider;
(function (OrganizationSsoProvider) {
    OrganizationSsoProvider["Pingone"] = "PINGONE";
})(OrganizationSsoProvider || (OrganizationSsoProvider = {}));
export var PromoteSchemaErrorCode;
(function (PromoteSchemaErrorCode) {
    PromoteSchemaErrorCode["CannotPromoteSchemaForFederatedGraph"] = "CANNOT_PROMOTE_SCHEMA_FOR_FEDERATED_GRAPH";
})(PromoteSchemaErrorCode || (PromoteSchemaErrorCode = {}));
export var PromoteSchemaResponseCode;
(function (PromoteSchemaResponseCode) {
    PromoteSchemaResponseCode["NoChangesDetected"] = "NO_CHANGES_DETECTED";
    PromoteSchemaResponseCode["PromotionSuccess"] = "PROMOTION_SUCCESS";
})(PromoteSchemaResponseCode || (PromoteSchemaResponseCode = {}));
/** Columns of QueryStats. */
export var QueryStatsColumn;
(function (QueryStatsColumn) {
    QueryStatsColumn["AccountId"] = "ACCOUNT_ID";
    QueryStatsColumn["CachedHistogram"] = "CACHED_HISTOGRAM";
    QueryStatsColumn["CachedRequestsCount"] = "CACHED_REQUESTS_COUNT";
    QueryStatsColumn["CacheTtlHistogram"] = "CACHE_TTL_HISTOGRAM";
    QueryStatsColumn["ClientName"] = "CLIENT_NAME";
    QueryStatsColumn["ClientVersion"] = "CLIENT_VERSION";
    QueryStatsColumn["ForbiddenOperationCount"] = "FORBIDDEN_OPERATION_COUNT";
    QueryStatsColumn["FromEngineproxy"] = "FROM_ENGINEPROXY";
    QueryStatsColumn["QueryId"] = "QUERY_ID";
    QueryStatsColumn["QueryName"] = "QUERY_NAME";
    QueryStatsColumn["RegisteredOperationCount"] = "REGISTERED_OPERATION_COUNT";
    QueryStatsColumn["RequestsWithErrorsCount"] = "REQUESTS_WITH_ERRORS_COUNT";
    QueryStatsColumn["SchemaHash"] = "SCHEMA_HASH";
    QueryStatsColumn["SchemaTag"] = "SCHEMA_TAG";
    QueryStatsColumn["ServiceId"] = "SERVICE_ID";
    QueryStatsColumn["Timestamp"] = "TIMESTAMP";
    QueryStatsColumn["UncachedHistogram"] = "UNCACHED_HISTOGRAM";
    QueryStatsColumn["UncachedRequestsCount"] = "UNCACHED_REQUESTS_COUNT";
})(QueryStatsColumn || (QueryStatsColumn = {}));
export var QueryTriggerMetric;
(function (QueryTriggerMetric) {
    /** Number of requests within the window that resulted in an error. Ignores `percentile`. */
    QueryTriggerMetric["ErrorCount"] = "ERROR_COUNT";
    /** Number of error requests divided by total number of requests. Ignores `percentile`. */
    QueryTriggerMetric["ErrorPercentage"] = "ERROR_PERCENTAGE";
    /** Number of requests within the window. Ignores `percentile`. */
    QueryTriggerMetric["RequestCount"] = "REQUEST_COUNT";
    /** Request latency in ms. Requires `percentile`. */
    QueryTriggerMetric["RequestServiceTime"] = "REQUEST_SERVICE_TIME";
})(QueryTriggerMetric || (QueryTriggerMetric = {}));
export var QueryTriggerScope;
(function (QueryTriggerScope) {
    QueryTriggerScope["All"] = "ALL";
    QueryTriggerScope["Any"] = "ANY";
    QueryTriggerScope["Unrecognized"] = "UNRECOGNIZED";
})(QueryTriggerScope || (QueryTriggerScope = {}));
export var QueryTriggerWindow;
(function (QueryTriggerWindow) {
    QueryTriggerWindow["FifteenMinutes"] = "FIFTEEN_MINUTES";
    QueryTriggerWindow["FiveMinutes"] = "FIVE_MINUTES";
    QueryTriggerWindow["OneMinute"] = "ONE_MINUTE";
    QueryTriggerWindow["Unrecognized"] = "UNRECOGNIZED";
})(QueryTriggerWindow || (QueryTriggerWindow = {}));
export var ReportSchemaErrorCode;
(function (ReportSchemaErrorCode) {
    ReportSchemaErrorCode["BootIdIsNotValidUuid"] = "BOOT_ID_IS_NOT_VALID_UUID";
    ReportSchemaErrorCode["BootIdIsRequired"] = "BOOT_ID_IS_REQUIRED";
    ReportSchemaErrorCode["CoreSchemaHashIsNotSchemaSha256"] = "CORE_SCHEMA_HASH_IS_NOT_SCHEMA_SHA256";
    ReportSchemaErrorCode["CoreSchemaHashIsRequired"] = "CORE_SCHEMA_HASH_IS_REQUIRED";
    ReportSchemaErrorCode["CoreSchemaHashIsTooLong"] = "CORE_SCHEMA_HASH_IS_TOO_LONG";
    ReportSchemaErrorCode["ExecutableSchemaIdIsNotSchemaSha256"] = "EXECUTABLE_SCHEMA_ID_IS_NOT_SCHEMA_SHA256";
    ReportSchemaErrorCode["ExecutableSchemaIdIsRequired"] = "EXECUTABLE_SCHEMA_ID_IS_REQUIRED";
    ReportSchemaErrorCode["ExecutableSchemaIdIsTooLong"] = "EXECUTABLE_SCHEMA_ID_IS_TOO_LONG";
    ReportSchemaErrorCode["GraphRefInvalidFormat"] = "GRAPH_REF_INVALID_FORMAT";
    ReportSchemaErrorCode["GraphRefIsRequired"] = "GRAPH_REF_IS_REQUIRED";
    ReportSchemaErrorCode["GraphVariantDoesNotMatchRegex"] = "GRAPH_VARIANT_DOES_NOT_MATCH_REGEX";
    ReportSchemaErrorCode["GraphVariantIsRequired"] = "GRAPH_VARIANT_IS_REQUIRED";
    ReportSchemaErrorCode["LibraryVersionIsTooLong"] = "LIBRARY_VERSION_IS_TOO_LONG";
    ReportSchemaErrorCode["PlatformIsTooLong"] = "PLATFORM_IS_TOO_LONG";
    ReportSchemaErrorCode["RuntimeVersionIsTooLong"] = "RUNTIME_VERSION_IS_TOO_LONG";
    ReportSchemaErrorCode["SchemaIsNotParsable"] = "SCHEMA_IS_NOT_PARSABLE";
    ReportSchemaErrorCode["SchemaIsNotValid"] = "SCHEMA_IS_NOT_VALID";
    ReportSchemaErrorCode["ServerIdIsTooLong"] = "SERVER_ID_IS_TOO_LONG";
    ReportSchemaErrorCode["UserVersionIsTooLong"] = "USER_VERSION_IS_TOO_LONG";
})(ReportSchemaErrorCode || (ReportSchemaErrorCode = {}));
export var Resolution;
(function (Resolution) {
    Resolution["R1D"] = "R1D";
    Resolution["R1H"] = "R1H";
    Resolution["R1M"] = "R1M";
    Resolution["R5M"] = "R5M";
    Resolution["R6H"] = "R6H";
    Resolution["R15M"] = "R15M";
})(Resolution || (Resolution = {}));
export var ResponseHints;
(function (ResponseHints) {
    ResponseHints["None"] = "NONE";
    ResponseHints["SampleResponses"] = "SAMPLE_RESPONSES";
    ResponseHints["Subgraphs"] = "SUBGRAPHS";
    ResponseHints["Timings"] = "TIMINGS";
    ResponseHints["TraceTimings"] = "TRACE_TIMINGS";
})(ResponseHints || (ResponseHints = {}));
/** Columns of ServiceEdgeServerInfos. */
export var ServiceEdgeServerInfosColumn;
(function (ServiceEdgeServerInfosColumn) {
    ServiceEdgeServerInfosColumn["BootId"] = "BOOT_ID";
    ServiceEdgeServerInfosColumn["ExecutableSchemaId"] = "EXECUTABLE_SCHEMA_ID";
    ServiceEdgeServerInfosColumn["LibraryVersion"] = "LIBRARY_VERSION";
    ServiceEdgeServerInfosColumn["Platform"] = "PLATFORM";
    ServiceEdgeServerInfosColumn["RuntimeVersion"] = "RUNTIME_VERSION";
    ServiceEdgeServerInfosColumn["SchemaTag"] = "SCHEMA_TAG";
    ServiceEdgeServerInfosColumn["ServerId"] = "SERVER_ID";
    ServiceEdgeServerInfosColumn["Timestamp"] = "TIMESTAMP";
    ServiceEdgeServerInfosColumn["UserVersion"] = "USER_VERSION";
})(ServiceEdgeServerInfosColumn || (ServiceEdgeServerInfosColumn = {}));
/** Columns of ServiceErrorStats. */
export var ServiceErrorStatsColumn;
(function (ServiceErrorStatsColumn) {
    ServiceErrorStatsColumn["ClientName"] = "CLIENT_NAME";
    ServiceErrorStatsColumn["ClientVersion"] = "CLIENT_VERSION";
    ServiceErrorStatsColumn["ErrorsCount"] = "ERRORS_COUNT";
    ServiceErrorStatsColumn["Path"] = "PATH";
    ServiceErrorStatsColumn["QueryId"] = "QUERY_ID";
    ServiceErrorStatsColumn["QueryName"] = "QUERY_NAME";
    ServiceErrorStatsColumn["RequestsWithErrorsCount"] = "REQUESTS_WITH_ERRORS_COUNT";
    ServiceErrorStatsColumn["SchemaHash"] = "SCHEMA_HASH";
    ServiceErrorStatsColumn["SchemaTag"] = "SCHEMA_TAG";
    ServiceErrorStatsColumn["Timestamp"] = "TIMESTAMP";
})(ServiceErrorStatsColumn || (ServiceErrorStatsColumn = {}));
/** Columns of ServiceFieldLatencies. */
export var ServiceFieldLatenciesColumn;
(function (ServiceFieldLatenciesColumn) {
    ServiceFieldLatenciesColumn["FieldHistogram"] = "FIELD_HISTOGRAM";
    ServiceFieldLatenciesColumn["FieldName"] = "FIELD_NAME";
    ServiceFieldLatenciesColumn["ParentType"] = "PARENT_TYPE";
    ServiceFieldLatenciesColumn["SchemaHash"] = "SCHEMA_HASH";
    ServiceFieldLatenciesColumn["SchemaTag"] = "SCHEMA_TAG";
    ServiceFieldLatenciesColumn["Timestamp"] = "TIMESTAMP";
})(ServiceFieldLatenciesColumn || (ServiceFieldLatenciesColumn = {}));
/** Columns of ServiceFieldUsage. */
export var ServiceFieldUsageColumn;
(function (ServiceFieldUsageColumn) {
    ServiceFieldUsageColumn["ClientName"] = "CLIENT_NAME";
    ServiceFieldUsageColumn["ClientVersion"] = "CLIENT_VERSION";
    ServiceFieldUsageColumn["ExecutionCount"] = "EXECUTION_COUNT";
    ServiceFieldUsageColumn["Field"] = "FIELD";
    ServiceFieldUsageColumn["FieldName"] = "FIELD_NAME";
    ServiceFieldUsageColumn["ParentType"] = "PARENT_TYPE";
    ServiceFieldUsageColumn["QueryId"] = "QUERY_ID";
    ServiceFieldUsageColumn["QueryName"] = "QUERY_NAME";
    ServiceFieldUsageColumn["ReferencingOperationCount"] = "REFERENCING_OPERATION_COUNT";
    ServiceFieldUsageColumn["SchemaHash"] = "SCHEMA_HASH";
    ServiceFieldUsageColumn["SchemaTag"] = "SCHEMA_TAG";
    ServiceFieldUsageColumn["Timestamp"] = "TIMESTAMP";
})(ServiceFieldUsageColumn || (ServiceFieldUsageColumn = {}));
/** Columns of ServiceOperationCheckStats. */
export var ServiceOperationCheckStatsColumn;
(function (ServiceOperationCheckStatsColumn) {
    ServiceOperationCheckStatsColumn["CachedRequestsCount"] = "CACHED_REQUESTS_COUNT";
    ServiceOperationCheckStatsColumn["ClientName"] = "CLIENT_NAME";
    ServiceOperationCheckStatsColumn["ClientVersion"] = "CLIENT_VERSION";
    ServiceOperationCheckStatsColumn["QueryId"] = "QUERY_ID";
    ServiceOperationCheckStatsColumn["SchemaTag"] = "SCHEMA_TAG";
    ServiceOperationCheckStatsColumn["Timestamp"] = "TIMESTAMP";
    ServiceOperationCheckStatsColumn["UncachedRequestsCount"] = "UNCACHED_REQUESTS_COUNT";
})(ServiceOperationCheckStatsColumn || (ServiceOperationCheckStatsColumn = {}));
/** Columns of ServiceQueryStats. */
export var ServiceQueryStatsColumn;
(function (ServiceQueryStatsColumn) {
    ServiceQueryStatsColumn["CachedHistogram"] = "CACHED_HISTOGRAM";
    ServiceQueryStatsColumn["CachedRequestsCount"] = "CACHED_REQUESTS_COUNT";
    ServiceQueryStatsColumn["CacheTtlHistogram"] = "CACHE_TTL_HISTOGRAM";
    ServiceQueryStatsColumn["ClientName"] = "CLIENT_NAME";
    ServiceQueryStatsColumn["ClientVersion"] = "CLIENT_VERSION";
    ServiceQueryStatsColumn["ForbiddenOperationCount"] = "FORBIDDEN_OPERATION_COUNT";
    ServiceQueryStatsColumn["FromEngineproxy"] = "FROM_ENGINEPROXY";
    ServiceQueryStatsColumn["QueryId"] = "QUERY_ID";
    ServiceQueryStatsColumn["QueryName"] = "QUERY_NAME";
    ServiceQueryStatsColumn["RegisteredOperationCount"] = "REGISTERED_OPERATION_COUNT";
    ServiceQueryStatsColumn["RequestsWithErrorsCount"] = "REQUESTS_WITH_ERRORS_COUNT";
    ServiceQueryStatsColumn["SchemaHash"] = "SCHEMA_HASH";
    ServiceQueryStatsColumn["SchemaTag"] = "SCHEMA_TAG";
    ServiceQueryStatsColumn["Timestamp"] = "TIMESTAMP";
    ServiceQueryStatsColumn["UncachedHistogram"] = "UNCACHED_HISTOGRAM";
    ServiceQueryStatsColumn["UncachedRequestsCount"] = "UNCACHED_REQUESTS_COUNT";
})(ServiceQueryStatsColumn || (ServiceQueryStatsColumn = {}));
/** Columns of ServiceTracePathErrorsRefs. */
export var ServiceTracePathErrorsRefsColumn;
(function (ServiceTracePathErrorsRefsColumn) {
    ServiceTracePathErrorsRefsColumn["ClientName"] = "CLIENT_NAME";
    ServiceTracePathErrorsRefsColumn["ClientVersion"] = "CLIENT_VERSION";
    ServiceTracePathErrorsRefsColumn["DurationBucket"] = "DURATION_BUCKET";
    ServiceTracePathErrorsRefsColumn["ErrorsCountInPath"] = "ERRORS_COUNT_IN_PATH";
    ServiceTracePathErrorsRefsColumn["ErrorsCountInTrace"] = "ERRORS_COUNT_IN_TRACE";
    ServiceTracePathErrorsRefsColumn["ErrorMessage"] = "ERROR_MESSAGE";
    ServiceTracePathErrorsRefsColumn["Path"] = "PATH";
    ServiceTracePathErrorsRefsColumn["QueryId"] = "QUERY_ID";
    ServiceTracePathErrorsRefsColumn["QueryName"] = "QUERY_NAME";
    ServiceTracePathErrorsRefsColumn["SchemaHash"] = "SCHEMA_HASH";
    ServiceTracePathErrorsRefsColumn["SchemaTag"] = "SCHEMA_TAG";
    ServiceTracePathErrorsRefsColumn["Timestamp"] = "TIMESTAMP";
    ServiceTracePathErrorsRefsColumn["TraceHttpStatusCode"] = "TRACE_HTTP_STATUS_CODE";
    ServiceTracePathErrorsRefsColumn["TraceId"] = "TRACE_ID";
    ServiceTracePathErrorsRefsColumn["TraceSizeBytes"] = "TRACE_SIZE_BYTES";
    ServiceTracePathErrorsRefsColumn["TraceStartsAt"] = "TRACE_STARTS_AT";
})(ServiceTracePathErrorsRefsColumn || (ServiceTracePathErrorsRefsColumn = {}));
/** Columns of ServiceTraceRefs. */
export var ServiceTraceRefsColumn;
(function (ServiceTraceRefsColumn) {
    ServiceTraceRefsColumn["ClientName"] = "CLIENT_NAME";
    ServiceTraceRefsColumn["ClientVersion"] = "CLIENT_VERSION";
    ServiceTraceRefsColumn["DurationBucket"] = "DURATION_BUCKET";
    ServiceTraceRefsColumn["DurationNs"] = "DURATION_NS";
    ServiceTraceRefsColumn["QueryId"] = "QUERY_ID";
    ServiceTraceRefsColumn["QueryName"] = "QUERY_NAME";
    ServiceTraceRefsColumn["SchemaHash"] = "SCHEMA_HASH";
    ServiceTraceRefsColumn["SchemaTag"] = "SCHEMA_TAG";
    ServiceTraceRefsColumn["Timestamp"] = "TIMESTAMP";
    ServiceTraceRefsColumn["TraceId"] = "TRACE_ID";
    ServiceTraceRefsColumn["TraceSizeBytes"] = "TRACE_SIZE_BYTES";
})(ServiceTraceRefsColumn || (ServiceTraceRefsColumn = {}));
export var StoreSchemaErrorCode;
(function (StoreSchemaErrorCode) {
    StoreSchemaErrorCode["SchemaIsNotParsable"] = "SCHEMA_IS_NOT_PARSABLE";
    StoreSchemaErrorCode["SchemaIsNotValid"] = "SCHEMA_IS_NOT_VALID";
})(StoreSchemaErrorCode || (StoreSchemaErrorCode = {}));
export var SubgraphChangeType;
(function (SubgraphChangeType) {
    SubgraphChangeType["Addition"] = "ADDITION";
    SubgraphChangeType["Deletion"] = "DELETION";
    SubgraphChangeType["Modification"] = "MODIFICATION";
})(SubgraphChangeType || (SubgraphChangeType = {}));
export var SubscriptionState;
(function (SubscriptionState) {
    SubscriptionState["Active"] = "ACTIVE";
    SubscriptionState["Canceled"] = "CANCELED";
    SubscriptionState["Expired"] = "EXPIRED";
    SubscriptionState["Future"] = "FUTURE";
    SubscriptionState["PastDue"] = "PAST_DUE";
    SubscriptionState["Paused"] = "PAUSED";
    SubscriptionState["Pending"] = "PENDING";
    SubscriptionState["Unknown"] = "UNKNOWN";
})(SubscriptionState || (SubscriptionState = {}));
export var ThemeName;
(function (ThemeName) {
    ThemeName["Dark"] = "DARK";
    ThemeName["Light"] = "LIGHT";
})(ThemeName || (ThemeName = {}));
export var TicketPriority;
(function (TicketPriority) {
    TicketPriority["P0"] = "P0";
    TicketPriority["P1"] = "P1";
    TicketPriority["P2"] = "P2";
    TicketPriority["P3"] = "P3";
})(TicketPriority || (TicketPriority = {}));
export var TicketStatus;
(function (TicketStatus) {
    TicketStatus["Closed"] = "CLOSED";
    TicketStatus["Hold"] = "HOLD";
    TicketStatus["New"] = "NEW";
    TicketStatus["Open"] = "OPEN";
    TicketStatus["Pending"] = "PENDING";
    TicketStatus["Solved"] = "SOLVED";
})(TicketStatus || (TicketStatus = {}));
/** Columns of TracePathErrorsRefs. */
export var TracePathErrorsRefsColumn;
(function (TracePathErrorsRefsColumn) {
    TracePathErrorsRefsColumn["ClientName"] = "CLIENT_NAME";
    TracePathErrorsRefsColumn["ClientVersion"] = "CLIENT_VERSION";
    TracePathErrorsRefsColumn["DurationBucket"] = "DURATION_BUCKET";
    TracePathErrorsRefsColumn["ErrorsCountInPath"] = "ERRORS_COUNT_IN_PATH";
    TracePathErrorsRefsColumn["ErrorsCountInTrace"] = "ERRORS_COUNT_IN_TRACE";
    TracePathErrorsRefsColumn["ErrorMessage"] = "ERROR_MESSAGE";
    TracePathErrorsRefsColumn["Path"] = "PATH";
    TracePathErrorsRefsColumn["QueryId"] = "QUERY_ID";
    TracePathErrorsRefsColumn["QueryName"] = "QUERY_NAME";
    TracePathErrorsRefsColumn["SchemaHash"] = "SCHEMA_HASH";
    TracePathErrorsRefsColumn["SchemaTag"] = "SCHEMA_TAG";
    TracePathErrorsRefsColumn["ServiceId"] = "SERVICE_ID";
    TracePathErrorsRefsColumn["Timestamp"] = "TIMESTAMP";
    TracePathErrorsRefsColumn["TraceHttpStatusCode"] = "TRACE_HTTP_STATUS_CODE";
    TracePathErrorsRefsColumn["TraceId"] = "TRACE_ID";
    TracePathErrorsRefsColumn["TraceSizeBytes"] = "TRACE_SIZE_BYTES";
    TracePathErrorsRefsColumn["TraceStartsAt"] = "TRACE_STARTS_AT";
})(TracePathErrorsRefsColumn || (TracePathErrorsRefsColumn = {}));
/** Columns of TraceRefs. */
export var TraceRefsColumn;
(function (TraceRefsColumn) {
    TraceRefsColumn["ClientName"] = "CLIENT_NAME";
    TraceRefsColumn["ClientVersion"] = "CLIENT_VERSION";
    TraceRefsColumn["DurationBucket"] = "DURATION_BUCKET";
    TraceRefsColumn["DurationNs"] = "DURATION_NS";
    TraceRefsColumn["QueryId"] = "QUERY_ID";
    TraceRefsColumn["QueryName"] = "QUERY_NAME";
    TraceRefsColumn["SchemaHash"] = "SCHEMA_HASH";
    TraceRefsColumn["SchemaTag"] = "SCHEMA_TAG";
    TraceRefsColumn["ServiceId"] = "SERVICE_ID";
    TraceRefsColumn["Timestamp"] = "TIMESTAMP";
    TraceRefsColumn["TraceId"] = "TRACE_ID";
    TraceRefsColumn["TraceSizeBytes"] = "TRACE_SIZE_BYTES";
})(TraceRefsColumn || (TraceRefsColumn = {}));
export var UserPermission;
(function (UserPermission) {
    UserPermission["BillingManager"] = "BILLING_MANAGER";
    UserPermission["Consumer"] = "CONSUMER";
    UserPermission["Contributor"] = "CONTRIBUTOR";
    UserPermission["GraphAdmin"] = "GRAPH_ADMIN";
    UserPermission["LegacyGraphKey"] = "LEGACY_GRAPH_KEY";
    UserPermission["Observer"] = "OBSERVER";
    UserPermission["OrgAdmin"] = "ORG_ADMIN";
})(UserPermission || (UserPermission = {}));
export var UserSegment;
(function (UserSegment) {
    UserSegment["JoinMyTeam"] = "JOIN_MY_TEAM";
    UserSegment["LocalDevelopment"] = "LOCAL_DEVELOPMENT";
    UserSegment["NotSpecified"] = "NOT_SPECIFIED";
    UserSegment["ProductionGraphs"] = "PRODUCTION_GRAPHS";
    UserSegment["Sandbox"] = "SANDBOX";
    UserSegment["TryTeam"] = "TRY_TEAM";
})(UserSegment || (UserSegment = {}));
export var UserType;
(function (UserType) {
    UserType["Apollo"] = "APOLLO";
    UserType["Github"] = "GITHUB";
    UserType["Sso"] = "SSO";
})(UserType || (UserType = {}));
export var ValidationErrorCode;
(function (ValidationErrorCode) {
    ValidationErrorCode["DeprecatedField"] = "DEPRECATED_FIELD";
    ValidationErrorCode["InvalidOperation"] = "INVALID_OPERATION";
    ValidationErrorCode["NonParseableDocument"] = "NON_PARSEABLE_DOCUMENT";
})(ValidationErrorCode || (ValidationErrorCode = {}));
export var ValidationErrorType;
(function (ValidationErrorType) {
    ValidationErrorType["Failure"] = "FAILURE";
    ValidationErrorType["Invalid"] = "INVALID";
    ValidationErrorType["Warning"] = "WARNING";
})(ValidationErrorType || (ValidationErrorType = {}));
export const CheckUserApiKeyDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "CheckUserApiKey" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "me" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "User" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }] } }] } }] } }] };
export const GetSubgraphSdlsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetSubgraphSdls" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "serviceId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "graphVariant" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "service" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "serviceId" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "implementingServices" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "graphVariant" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "graphVariant" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "FederatedImplementingServices" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "services" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "activePartialSchema" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "sdl" } }] } }] } }] } }] } }] } }] } }] };
export const ListAvailableGraphsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "ListAvailableGraphs" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "me" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "User" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "memberships" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "account" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "services" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }] } }] } }] } }] } }] } }] } }] };
export const ListAvailableGraphsForAccountDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "ListAvailableGraphsForAccount" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "accountId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "account" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "accountId" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "services" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }] } }] } }] } }] };
export const ListAvailableVariantsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "ListAvailableVariants" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "serviceId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "service" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "serviceId" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "variants" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }] } }] } }] };
export const ListSubgraphsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "ListSubgraphs" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "graphVariant" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "service" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "implementingServices" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "graphVariant" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "graphVariant" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "__typename" } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "FederatedImplementingServices" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "services" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "url" } }] } }] } }] } }] } }] } }] };
export const RecentOperationsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "RecentOperations" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "serviceId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "from" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Timestamp" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "variantName" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "service" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "serviceId" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "statsWindow" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "from" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "from" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "queryStats" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "filter" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "schemaTag" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "variantName" } } }] } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "groupBy" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "queryId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "queryName" } }, { "kind": "Field", "name": { "kind": "Name", "value": "querySignature" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "metrics" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "totalRequestCount" } }] } }] } }] } }] } }] } }] };
