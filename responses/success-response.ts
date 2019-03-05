import { APIResponse } from "./api-response";

/**
 * API's Response in case of Success
 */
export class APISuccessResponse extends APIResponse {
    constructor(payload?: any) {
        super('success', payload);
    }
}