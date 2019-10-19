import { Request, Response, NextFunction } from "express";
import { getStorageContractInstance } from "../../config/blockchain";
import { APISuccessResponse, APIError } from "../../responses";
import moment from 'moment';

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function isValidHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const username = req.body.username;
        const organizationName = req.body.organizationName;
        const state = req.body.state;
        const contractInstance = await getStorageContractInstance();
        const rawOrganizations = await contractInstance.fetch_organizations.call(username);
        for (let rawOrganization of rawOrganizations) {
            if (rawOrganization.organizationName == organizationName) {
                if (!(rawOrganization.isAllowedAge && rawOrganization.isAllowedCity)) {
                    throw new APIError("You don't have enough permissions", 403);
                }
            }
        }
        const dataStr = await contractInstance.display_data.call(username);
        if (!dataStr) {
            return res.send(new APISuccessResponse({
                isAdult: false,
                state: false
            }));
        }
        const data = JSON.parse(dataStr);
        const dob = data.DOB;
        const m1 = moment(dob, 'YYYY-MM-DD');
        const years = moment().diff(m1, 'years');

        return res.send(new APISuccessResponse({
            isAdult: years > 18,
            isStateCorrect: new RegExp(`^${state}$`, 'i').test(data.state)
        }));
    }
    catch (err) {
        return next(err);
    }
}
