import { Request, Response, NextFunction } from "express";
import { getStorageContractInstance } from "../../config/blockchain";
import { APISuccessResponse } from "../../responses";


/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function getProfileHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const username = req.user.username;
        const contractInstance = await getStorageContractInstance();
        const dataStr = await contractInstance.display_data.call(username);
        const data = JSON.parse(dataStr);
        data.username = username;
        res.send(new APISuccessResponse(data));
    }
    catch (err) {
        return next(err);
    }
}
