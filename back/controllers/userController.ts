import {router} from "../src/router";
import {userService} from "../services/UserService";

class UserController {
    constructor() {}

    public init(): void
    {
        router.post('/register', this.handlerRegister)
    }

    public handlerRegister(req: any, res: any): void
    {
        const data = req.body;
        /*
        userService.userExists(req.body).then((exists) => {
        }).catch(() => {
            res.send({
                status: false,
            })
        })

         */
    }
}

export const userController = new UserController()