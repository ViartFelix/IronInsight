import {router} from "../src/router";
import {userService} from "../services/UserService";
import auth from "../middlewares/authMiddleware";
import {jwtService} from "../services/JwtService";
import User from "../models/User";
import bcrypt from "bcrypt";


class UserController {
    constructor() {
    }

    public init(): void
    {
        router.post('/register', this.handlerRegister)
        router.post('/login', this.handlerLogin)
    }

    public async handlerRegister(req: any, res: any): Promise<void>
    {
        let status = 200;
        let message = "User registration successful"

        try {
            const data = req.body;

            const doesExist = await userService.userExists(data);

            if(doesExist) {
                status = 401;
                message = "User already exists."
            } else {
                const registerAttempt = await userService.registerUser(data);

                if(!registerAttempt) {
                    message = "Something went wrong when registering your account."
                }
            }
        } catch(e: any) {
            status = 500;
            message = "Something went wrong."
        } finally {
            res.status(status).send({
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
            data.username = data.email = req.body.userOrEmail
            //if the user exists in the db
            const doesExist = await userService.userExists(data);

            if(doesExist) {
                const user: User = await userService.getUser(data.email, data.username);

                await bcrypt.compare(data.password, user.password, function(err, isSame) {
                    if (err || !isSame) {
                        res.status(401).send({
                            status: false,
                            message: "Invalid credentials"
                        })
                    }
                    //if passwords match
                    if (isSame) {
                        //we remove the password from the user object
                        user.password = undefined

                        //generates token
                        const token = jwtService.generateToken(user.toString());

                        res.status(200).send({
                            token: token,
                            data: user,
                        })
                    }
                })
            } else {
                res.status(403).send({
                    status: false,
                    message: "Invalid credentials"
                })
            }
        } catch (e) {
            res.status(500).send({
                status: false,
                message: "Something went wrong."
            })
        }
    }
}

export const userController = new UserController()
