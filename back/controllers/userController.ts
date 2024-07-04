import {router} from "../src/router";
import {userService} from "../services/UserService";
import auth from "../middlewares/authMiddleware";
import {jwtService} from "../services/JwtService";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


class UserController {
  constructor() {
  }

  public init(): void {
    router.post('/register', this.handlerRegister)
    router.post('/login', this.handlerLogin)
    router.post('/change-user', this.handleUserChange, auth)
  }

  public async handlerRegister(req: any, res: any): Promise<void> {
    let status = 200;
    let message = "User registration successful"

    try {
      const data = req.body;

      const doesExist = await userService.userExists(data);

      if (doesExist) {
        status = 401;
        message = "User already exists."
      } else {
        const registerAttempt = await userService.registerUser(data);

        if (!registerAttempt) {
          message = "Something went wrong when registering your account."
        }
      }
    } catch (e: any) {
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
  public async handlerLogin(req: any, res: any): Promise<void> {
    try {
      const data = req.body as User;
      data.username = data.email = req.body.userOrEmail
      //if the user exists in the db
      const doesExist = await userService.userExists(data);

      if (doesExist) {
        const user: User = await userService.getUser(data.email, data.username);

        await bcrypt.compare(data.password, user.password, function (err, isSame) {
          if (err || !isSame) {
            res.status(401).send({
              message: "Invalid credentials: err ou not is same"
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
          message: "Invalid credentials: not found"
        })
      }
    } catch (e) {
      res.status(500).send({
        message: "Something went wrong."
      })
    }
  }

  private async handleUserChange(req, res)
  {
    try {
      const usrReq = req.body as User;

      const doesExist = await userService.userExists(usrReq);
      if(doesExist) {
        res.status(403).send({
          message: "Username or email already in use. Please chose another one."
        })
      } else {
        const isUpdated = await userService.editUserData(usrReq);

        if(isUpdated) {
          const renewToken = jwtService.generateToken(usrReq.toString())
          //fetch the new user's data to give back to the front-end
          const updatedUser = await userService.getUserById(usrReq.id_user)

          res.status(200).json({
            token: renewToken,
            message: "Mise à jour OK.",
            user: updatedUser
          })
        } else {
          throw new Error("Can't update !")
        }
      }
    } catch (e) {
      res.status(500).json({
        status: false,
        message: "Something went wrong."
      })
    }
  }
}

export const userController = new UserController()
