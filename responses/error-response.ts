import { APIResponse } from "./api-response";
import { APIError } from "./api-error";

/**
 * API's Response in case of an error
 */
export class APIErrorResponse extends APIResponse {
    constructor(err: APIError) {
        let { statusCode, message } = err;
        super('error', {
            message
        });
    }
}