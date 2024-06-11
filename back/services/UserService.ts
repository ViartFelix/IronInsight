import { dbService } from "./db-service";
import User from "../models/User";

class UserService
{

    constructor()
    {

    }

    public async getUserById(id: number): Promise<User> {
        const r = await dbService.query("SELECT * FROM users WHERE id_user = ?", [id]);
        return r as User;
    }

    // public async registerUser(user: User): Promise<boolean>
    // {
        
    // }

    public async userExists(user: User): Promise<boolean>
    {
        return await dbService.query("SELECT * FROM users WHERE username = ?", [user.username]);
    }
}

export const userService = new UserService();