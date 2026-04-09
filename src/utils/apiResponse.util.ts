import {AxiosResponse} from "axios";
import {ApiValidationError} from "../errors/apiValidation.error";
import {ErrorResponse} from "../responses/error.response";
import {ValidationErrorResponse} from "../responses/validationError.response";
import {ApiError} from "../errors/api.error";

export class ApiResponseUtil {
    instanceOfValidationError(object: any): object is ValidationErrorResponse {
        return 'result' in object;
    }

    instanceOfError(object: any): object is ErrorResponse {
        return 'message' in object;
    }

    /**
     *
     * @throws {ApiValidationError|ApiError|AxiosError}
     */
    async resolve<T = any>(request: Promise<AxiosResponse<T>>): Promise<T> {
        return request
            .then((response) => response.data)
            .catch((err) => {
                const errResponse: ValidationErrorResponse | ErrorResponse | undefined = err.response?.data;

                if (errResponse) {
                    if (this.instanceOfValidationError(errResponse)) {
                        throw new ApiValidationError(
                            errResponse.code,
                            errResponse.result.message,
                            errResponse.result.violations,
                            errResponse
                        );
                    } else if (this.instanceOfError(errResponse)) {
                        throw new ApiError(
                            errResponse.code,
                            errResponse.message,
                            errResponse
                        );
                    }
                }

                throw err;
            });
    }
}
