import { Request, Response, NextFunction } from "express";
import { getStorageContractInstance } from "../../config/blockchain";
import { APIError, APISuccessResponse } from "../../responses";
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || undefined;


/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function loginHandler(req: Request, res: Response, next: NextFunction) {
    try {
        if (!jwtSecret) {
            throw new TypeError('Please set JWT_SECRET in the environment');
        }
        const username = req.body.username;
        const password = req.body.password;
        const contractInstance = await getStorageContractInstance();
        const status = await contractInstance.login.call(username, password);
        if (!status) {
            throw new APIError('Invalid Username/Password', 401);
        }
        return res.send(new APISuccessResponse({
            accessToken: jwt.sign({ loggedIn: true, username }, jwtSecret, {
                expiresIn: '7d'
            }),
            tokenType: 'Bearer'
        }));
    }
    catch (err) {
        return next(err);
    }
}
