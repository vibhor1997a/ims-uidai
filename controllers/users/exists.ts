import { Request, Response, NextFunction } from "express";
import { getStorageContractInstance } from "../../config/blockchain";
import { APISuccessResponse } from "../../responses";

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function checkUserHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const username = req.body.username;
        const contractInstance = await getStorageContractInstance();
        const exists = await contractInstance.check_user.call(username);
        return res.send(new APISuccessResponse({
            userExists: exists
        }));
    }
    catch (err) {
        return next(err);
    }
}
