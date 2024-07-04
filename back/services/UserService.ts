import {dbService} from "./db-service";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  constructor() {

  }

  public async getUserById(id: number): Promise<User> {
    const r = await dbService.query("SELECT * FROM users WHERE id_user = ?", [id]);
    return r as User;
  }

  /**
   * Registers a user in the database
   * @param user
   */
  public async registerUser(user: User): Promise<boolean> {
    const userPwd = await this.hashPassword(user.password);

    return await dbService.query(
      "INSERT INTO users (username, email, password, weight, height, created_at, updated_at) VALUES (?,?,?,?,?,?,?)",
      [user.username, user.email, userPwd, -1, -1, new Date(), new Date()]
    ).then((r) => {
      return true
    }).catch((e) => {
      return false;
    })
  }

  /**
   * Check if the user is unique in the db
   * @param user
   */
  public async userExists(user: User): Promise<boolean> {
    const query = "SELECT * FROM users WHERE (email = ? OR username = ?)"
    + (user.id_user !== undefined ? ` AND users.id_user != '${user.id_user}'` : '');

    //getting all users with email & usernames
    return dbService.query(
      query,
      [user.email, user.username]
    ).then((r: any) => {
      //and i return true of any user is found, because the queried user exists.
      return r.length !== 0
    })
    //i don't catch the error here, as it can cause several bad results.
  }

  public async getUser(email: string | undefined, username: string | undefined): Promise<User> {
    const raw = await dbService.query(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email ?? "", username ?? ""]
    )

    return raw[0] as User
  }

  /**
   * Fetches an user by it's username
   * @param username
   */
  public async getUserByUsername(username: string | undefined): Promise<User> {
    const raw = await dbService.query(
      "SELECT * FROM users WHERE username =?",
      [username]
    )

    return raw[0] as User;
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
  }

  /**
   * Edit the user's data into the DB. The password has to be unhashed, because this method will hash the password.
   * @param request
   */
  public async editUserData(request: User): Promise<boolean>
  {
    try {
      //whether the user asks for a change in his password
      const pwdChange = (request.password?.length > 0)

      const dataToUpdate = [ request.username ]
      if(pwdChange) dataToUpdate.push(await this.hashPassword(request.password))

      await dbService.query("UPDATE users SET " +
        "username=?," +
        (pwdChange ? "password=?," : "") +
        "email=?," +
        "weight=?," +
        "height=?," +
        "updated_at=NOW()" +
        " WHERE id_user=?",
        [...dataToUpdate, request.email, request.weight, request.height, request.id_user],
        function(err, result, fields) {
          if (err) {
            throw err;
          }
        }
      )

      return true;
    } catch (e) {
      console.log(e)
      return false;
    }
  }

  /**
   * Converts the data provided to a User model
   * @param data A mySQL row object (if possible)
   * @param flashPwd If the password should be shown or not
   */
  public toUser(data: any, flashPwd: boolean = false): User {
    return {
      id_user: data.id_user,
      email: data.email,
      username: data.username,
      weight: data.weight,
      height: data.height,
      created_at: data.created_at,
      updated_at: data.updated_at,
      password: (flashPwd ? data.password : undefined)
    } as unknown as User;
  }
}

export const userService = new UserService();
