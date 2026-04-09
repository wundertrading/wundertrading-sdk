import {ErrorResponse} from "../responses/error.response";

export class ApiError extends Error {
    constructor(
        public code: number,
        public message: string,
        public response: ErrorResponse
    ){
        super(message);
    }
}