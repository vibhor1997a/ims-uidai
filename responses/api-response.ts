/**
 * Standard API response
 */
export class APIResponse {
    status: 'success' | 'error';
    data?: any;
    constructor(status: 'success' | 'error', data?: any) {
        this.status = status;
        data && (this.data = data);
    }
}