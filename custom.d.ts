declare module 'express-request-id';
declare module 'truffle-contract';

declare namespace Express {
    export interface Request {
        id: string;
        user: any;
    }
}

