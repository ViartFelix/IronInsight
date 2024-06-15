import {router} from "../src/router";
import {userService} from "../services/UserService";
import { expressjwt, Request as JWTRequest } from "express-jwt";


class UserController {
    constructor() {}

    public init(): void
    {
        router.post('/register', this.handlerRegister)
        router.post('/login', this.handlerLogin)
    }

    public async handlerRegister(req: any, res: any): Promise<void>
    {
        let status = true;
        let message = "User registration successful"

        try {
            const data = req.body;

            const doesExist = await userService.userExists(data);

            if(doesExist) {
                status = false;
                message = "User already exists."
            } else {
                const registerAttempt = await userService.registerUser(data);

                if(!registerAttempt) {
                    message = "Something went wrong when registering your account."
                }
            }
        } catch(e: any) {
            status = false;
            message = "Something went wrong."
        } finally {
            res.send({
                status: status,
                message: message
            })
        }
    }

    /**
     * Handles the login of a user
     * @param req
     * @param res
     */
    public async handlerLogin(req: any, res: any): Promise<void>
    {
        let status = true;
        let message = "User logged in"

        try {
            const data = req.body;
            //if the user exists in the db
            const doesExist = await userService.userExists(data);

            if(doesExist) {
                res.send({
                    cock: true
                })
                //const user = await userService.getUser(data);
            } else {
                res.send({
                    status: false,
                    message: "Invalid credentials"
                })
            }
        } catch (e) {
            res.send({
                status: false,
                message: "Something went wrong."
            })
        }


    }
}

export const userController = new UserController()