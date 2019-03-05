import { Request, Response, NextFunction } from "express";
import { getStorageContractInstance, getEthAccounts } from "../../config/blockchain";
import { APIError, APISuccessResponse } from "../../responses";


/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function signupHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const DOB = req.body.DOB;
        const gender = req.body.gender;
        const sonOfOp = req.body.sonOfOp;
        const sonOfVal = req.body.sonOfVal;
        const addressLine1 = req.body.addressLine1;
        const addressLine2 = req.body.addressLine2;
        const state = req.body.state;
        const pincode = req.body.pincode;

        const data = JSON.stringify({
            firstName, lastName, DOB, gender, sonOfOp, sonOfVal, addressLine1, addressLine2, state, pincode
        });
        const contractInstance = await getStorageContractInstance();
        const accounts = await getEthAccounts();
        const status = await contractInstance.signup.call(username, password, data);
        if (!status) {
            throw new APIError('username already exists', 409);
        }
        await contractInstance.signup(username, password, data, { from: accounts[0] });
        return res.send(new APISuccessResponse({
            message: 'Signup was successful'
        }));
    }
    catch (err) {
        return next(err);
    }
}
