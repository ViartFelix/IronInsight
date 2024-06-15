import {router} from "../src/router";
import {userService} from "../services/UserService";
import User from "../models/User";
import bcrypt from "bcrypt";


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
        try {
            const data = req.body as User;

            //if the user exists in the db
            const doesExist = await userService.userExists(data);

            if(doesExist) {
                //take the user from the db
                const user: User = await userService.getUserByUsername(data.username);
                //compare the stored password with the provided one
                await bcrypt.compare(data.password, user.password, function(err, isSame) {
                    if (err || !isSame) {
                        res.send({
                            status: false,
                            message: "Invalid credentials"
                        })
                    }
                    //if passwords match
                    if (isSame) {
                        //we remove the password from the user object
                        user.password = undefined

                        res.send({
                            //then we send the token back
                            status: true,
                            token: userService.loginUser(user),
                            data: user,
                        })
                    }
                })
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