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
}

export const userService = new UserService();