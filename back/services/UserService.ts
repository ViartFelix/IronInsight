import { dbService } from "./db-service";
import User from "../models/User";
import bcrypt from "bcrypt";

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
        const userPwd = await bcrypt.hash(user.password, 10)

        return await dbService.query(
            "INSERT INTO users (username, email, password, weight, height, created_at, updated_at) VALUES (?,?,?,?,?,?,?)",
            [user.username, user.email, userPwd, -1, -1, new Date(), new Date()]
        ).then((r) => {
            return true
        }).catch(() => {
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

    /**
     * Returns a token for the user
     * @param user
     */
    public async getToken(user: User): Promise<void>
    {
    }

    public async getUser(email: string|undefined, username: string|undefined): Promise<void>
    {
        //column to query for
        const col = (email ? 'email' : 'username');

        const raw = await dbService.query(
            "SELECT * FROM users WHERE ? = ?",
            [col, (email ? email : username)]
        )

        console.log(raw)
    }
}

export const userService = new UserService();