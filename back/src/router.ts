import { Express } from "express";
import { dbService } from "../services/db-service";
import { userService } from "../services/UserService";
import { exerciseService } from "../services/ExerciseService";
import { programService } from "../services/ProgramService";

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

        this.app.post('/register', (req, res) => {
            console.log(req);
            //userService.userExists(req)
        })

        this.app.get('/exercises', (req, res) => {
            exerciseService.getAllExercises().then((exercises) => {
                res.send(exercises)
            })
        });

        this.app.get('/programs', (req, res) => {
            programService.getAllPrograms().then((programs) => {
                res.send(programs)
            })
        });
    }
}