import {ValidationErrorResponse, Violation} from "../responses/validationError.response";

export class ApiValidationError extends Error {
    constructor(
        public code: number,
        public message: string,
        public violations: Violation[],
        public response: ValidationErrorResponse
    ){
        super(message);
    }
}