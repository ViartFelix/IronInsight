import {dbService} from "./db-service";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService
{
    constructor()
    {

    }

    public async getUserById(id: number): Promise<User> {
        const r = await dbService.query("SELECT * FROM users WHERE id_user = ?", [id]);
        return r as User;
    }

    /**
     * Registers a user in the database
     * @param user
     */
    public async registerUser(user: User): Promise<boolean>
    {
        const userPwd = await this.hashPassword(user.password);

        return await dbService.query(
            "INSERT INTO users (username, email, password, weight, height, created_at, updated_at) VALUES (?,?,?,?,?,?,?)",
            [user.username, user.email, userPwd, -1, -1, new Date(), new Date()]
        ).then((r) => {
            return true
        }).catch((e) => {
            console.log(e)
            return false;
        })
    }

    /**
     * Check if the user is unique in the db
     * @param user
     */
    public async userExists(user: User): Promise<boolean>
    {
        //getting all users with email & usernames
        return dbService.query(
            "SELECT * FROM users WHERE email = ? OR username = ?",
            [user.email, user.username]
        ).then((r: any) => {
            return r.length !== 0
        }).catch(e => {
            return false;
        })
    }

    public async getUser(email: string|undefined, username: string|undefined): Promise<User>
    {
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
    public async getUserByUsername(username: string|undefined): Promise<User>
    {
        const raw = await dbService.query(
            "SELECT * FROM users WHERE username =?",
            [username]
        )

        return raw[0] as User;
    }

    public async hashPassword(password: string): Promise<string>
    {
        return await bcrypt.hash(password, 10)
    }
}

export const userService = new UserService();