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
    try {
      //cast the request to a new user
      const userReq = userService.toUser(req.body, true);
      const doesExist = await userService.userExists(userReq);

      if (doesExist) {
        res.status(401).json({
          message: "User already exists."
        })
      } else {
        const registerAttempt = await userService.registerUser(userReq);

        if (!registerAttempt) {
          throw new Error("Something went wrong when registering your account.")
        } else {
          res.status(200).json({
            message: "User registration successful"
          })
        }
      }
    } catch (e: any) {
      res.status(500).json({
        message: "Something went wrong when registering your account."
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
      const userReq = userService.toUser(req.body);
      //same email and username for the comparaison in the login (in the front-end, the filed is 'user or email')
      userReq.username = userReq.email = req.body.userOrEmail
      //if the user exists in the db
      const doesExist = await userService.userExists(userReq);

      if (doesExist) {
        //'clean' user, with all the data form the db
        const user: User = await userService.getUser(userReq.email, userReq.username);

        await bcrypt.compare(userReq.password, user.password, function (err, isSame) {
          //if an error or is not the same password
          if (err || !isSame) {
            res.status(403).send({
              message: "Invalid credentials."
            })
          }
          //else the passwords match and no error happened, great !
          //we remove the password from the user object
          user.password = undefined

          //generates token
          const token = jwtService.generateToken(user.toString());

          res.status(200).send({
            token: token,
            data: user,
          })
        })
      } else {
        res.status(403).send({
          message: "Invalid credentials."
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
