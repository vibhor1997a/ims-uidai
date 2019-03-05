/**
 * Custom throwable Error for the API, Adds status code into the error
 */
export class APIError extends Error {
    /**
     * Http status code which the API should return in case of error
     */
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'APIError';
    }
}