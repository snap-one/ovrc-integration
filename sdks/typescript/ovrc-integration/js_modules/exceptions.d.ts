export {};

declare global {
  type DOMExceptionName =
    | "AbortError"
    | "ConstraintError"
    | "DataCloneError"
    | "DataError"
    | "EncodingError"
    | "Error"
    | "HierarchyRequestError"
    | "InUseAttributeError"
    | "IndexSizeError"
    | "InvalidAccessError"
    | "InvalidCharacterError"
    | "InvalidModificationError"
    | "InvalidNodeTypeError"
    | "InvalidStateError"
    | "NamespaceError"
    | "NetworkError"
    | "NoModificationAllowedError"
    | "NotAllowedError"
    | "NotFoundError"
    | "NotReadableError"
    | "NotSupportedError"
    | "OperationError"
    | "QuotaExceededError"
    | "ReadOnlyError"
    | "SecurityError"
    | "SyntaxError"
    | "TimeoutError"
    | "TransactionInactiveError"
    | "TypeMismatchError"
    | "URLMismatchError"
    | "UnknownError"
    | "VersionError"
    | "WrongDocumentError";

  class DOMException extends Error {
    constructor(message?: string, name?: DOMExceptionName | (string & {}));
    readonly message: string;
    readonly name: DOMExceptionName | (string & {});
    readonly code: number;
  }

  class QuotaExceededError extends DOMException {
    constructor(message?: string);
    readonly requested: null;
    readonly quota: null;
  }
}
