export interface Violation {
    /** Object property mask where violation found */
    propertyPath: string,
    /** Human-readable violation message */
    message: string,
}

export interface ValidationErrorResult {
    /** Human-readable error message */
    message: string,
    violations: Violation[],
    status: string
}

export interface ValidationErrorResponse {
    /** HTTP-like error code */
    code: number;
    result: ValidationErrorResult
}