import { Express } from "express";
import { dbService } from "../services/db-service";
import { userService } from "../services/UserService";
import { exerciseService } from "../services/ExerciseService";

export default class Router
{
    private app: Express;

    constructor(app: Express) {
        this.app = app;
        this.bindRoutes();
    }

    private bindRoutes() {
        this.app.get('/test', (req, res) => {
            userService.getUserById(2).then((user) => {
                res.send(user)
            })
        });

        this.app.get('/exercises', (req, res) => {
            exerciseService.getAllExercises().then((exercises) => {
                res.send(exercises)
            })
        });
    }
}