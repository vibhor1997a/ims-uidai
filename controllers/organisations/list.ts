import { Request, Response, NextFunction } from "express";
import { getStorageContractInstance } from "../../config/blockchain";
import { APISuccessResponse } from "../../responses";


/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function getOrganizationsList(req: Request, res: Response, next: NextFunction) {
    try {
        const username = req.user.username;
        const contractInstance = await getStorageContractInstance();
        const rawOrganizations = await contractInstance.fetch_organizations.call(username);
        const organizations = rawOrganizations.map((rawOrganization: any) => {
            return {
                name: rawOrganization.organizationName,
                permissions: {
                    state: rawOrganization.isAllowedCity,
                    age: rawOrganization.isAllowedAge
                }
            };
        });
        res.send(new APISuccessResponse({
            'organizations': organizations
        }));
    }
    catch (err) {
        return next(err);
    }
}
