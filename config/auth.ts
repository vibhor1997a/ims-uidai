import jwt from 'express-jwt';

/**
 * Authentication Middleware and can be used in any route for authentication
 */
let auth = jwt({
    secret: process.env.JWT_SECRET || 'some secret'
});

export { auth };