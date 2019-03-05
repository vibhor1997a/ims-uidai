import { Request, Response, NextFunction } from "express";
import { getStorageContractInstance } from "../../config/blockchain";
import { APISuccessResponse } from "../../responses";
import moment from 'moment';

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function checkAdultHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const username = req.body.username;
        const contractInstance = await getStorageContractInstance();
        const dataStr = await contractInstance.display_data.call(username);
        if (!dataStr) {
            return res.send(new APISuccessResponse({
                isAdult: false
            }))
        }
        const data = JSON.parse(dataStr);
        const dob = data.DOB;
        const m1 = moment(dob, 'YYYY-MM-DD');
        const years = moment().diff(m1, 'years');
        return res.send(new APISuccessResponse({
            isAdult: years > 18
        }));
    }
    catch (err) {
        return next(err);
    }
}
