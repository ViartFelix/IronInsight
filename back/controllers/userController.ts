import {router} from "../src/router";
import {userService} from "../services/UserService";

class UserController {
    constructor() {}

    public init(): void
    {
        router.post('/register', this.handlerRegister)
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
}

export const userController = new UserController()