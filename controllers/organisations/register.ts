import { Request, Response, NextFunction } from "express";
import { getStorageContractInstance, getEthAccounts } from "../../config/blockchain";
import { APIError, APISuccessResponse } from "../../responses";


/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function registerOrganizationHander(req: Request, res: Response, next: NextFunction) {
    try {

        const organizationName = req.body.name;
        const permissions = req.body.permissions;
        const user = req.user;

        if (!user) {
            throw new APIError('Unauthorized', 401);
        }
        const contractInstance = await getStorageContractInstance();
        const accounts = await getEthAccounts();
        const status = await contractInstance.register_organization.call(user.username, organizationName, permissions.state, permissions.age);
        if (!status) {
            throw new APIError('organization already exists', 409);
        }
        await contractInstance.register_organization(user.username, organizationName, permissions.state, permissions.age, { from: accounts[0] });
        return res.send(new APISuccessResponse({
            message: 'Organization Registered'
        }));
    }
    catch (err) {
        return next(err);
    }
}
