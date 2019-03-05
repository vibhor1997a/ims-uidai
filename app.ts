import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import { routes } from './routes';
import { APIError, APIErrorResponse, APIResponse } from './responses';
import { logger } from './logger';
import path from 'path';
import expressRequestId from 'express-request-id';

const stage: 'PROD' | 'DEV' = process.env && process.env.STAGE === 'PROD' ? 'PROD' : 'DEV';

const port = process.env.PORT || 80;

let app = express();

app.listen(port, () => {
    logger.log('info', `Listening on port ${port}!`);
});

const addRequestId: RequestHandler = expressRequestId();
//add request id to every request and set X-Request-Id header in response
app.use(addRequestId);

app.use((req, res, next) => {
    //@ts-ignore
    req.headers['Request-Id'] = req.id;
    next();
});

morgan.token('id', (req, res) => req.id);

morgan.token('remote-addr', (req, res) =>
    stage === 'PROD' ? req.get('X-Forwarded-For') as string : req.ip);

app.use(morgan(':date[iso] INFO REQUEST :id :remote-addr :method :url :status :response-time ms - :res[content-length]', {
    skip: (req, res) => {
        // don't log the requests for health checks by the load balancer
        if (stage === 'PROD' && req.path == '/status.html' && !req.get('X-Forwarded-For')) {
            return true;
        }
        return false;
    }
}));

app.use('/', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'] }));
app.use('/api/v1.0', routes);
app.use('*', four04Handler);
app.use(errorHandler);

/**
 * Handles the 404 response for not found requests
 * @param req 
 * @param res 
 * @param next 
 */
function four04Handler(req: Request, res: Response, next: NextFunction) {
    res.status(404).send(new APIErrorResponse(new APIError('Not Found', 404)));
}

/**
 * Handles Internal server error
 * @param err 
 * @param req 
 * @param res 
 * @param next 
 */
function errorHandler(err: Error | APIError, req: Request, res: Response, next: NextFunction) {
    logger.log('error', err.stack || err.message);
    if (err instanceof SyntaxError) {
        res.status(400).send(new APIErrorResponse(new APIError('Invalid JSON passed in body', 400)));
    }
    if (err.name == 'APIError') {
        //@ts-ignore
        res.status(err.statusCode).send(new APIErrorResponse(err));
    }
    else if (err.name == 'UnauthorizedError') {
        let error = new APIError('Unauthorized', 401);
        res.status(401).send(new APIErrorResponse(error));
    }
    else {
        res.status(500).send(new APIResponse('error', {
            message: 'Internal Server Error'
        }));
    }
}

export { app };
