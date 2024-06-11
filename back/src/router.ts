import { Express } from "express";
import { dbService } from "../services/db-service";
import { userService } from "../services/UserService";
import { exerciseService } from "../services/ExerciseService";
import { programService } from "../services/ProgramService";

class Router
{
    private app: Express;

    constructor() {}

    public init(app: Express): void
    {
        this.app = app;
    }

    /**
     * Get request
     * @param url
     * @param callback
     */
    public get(url: string, callback: Function)
    {
        this.app.get(url, (req, res) => {
            callback(req, res);
        })
    }

    /**
     * Post request
     * @param url
     * @param callback
     */
    public post(url: string, callback: Function)
    {
        this.app.post(url, (req, res) => {
            callback(req, res);
        })
    }
}

export const router = new Router();