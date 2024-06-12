import {router} from "../src/router";
import {exerciseService} from "../services/ExerciseService";

class ExerciseController {
    constructor() {}

    public init()
    {
        router.get('/exercises', this.handleAllExercises)
        router.get('/exercise/:id', this.handleOneExercises)
    }

    private handleAllExercises(req, res) {
        exerciseService.getAllExercises().then((exercises) => {
            res.send(exercises)
        })
    }

    private handleOneExercises(req, res) {
        exerciseService.getExerciseById(req.params.id).then((exercise) => {
            res.send(exercise)
        })
    }
}

export const exerciseController = new ExerciseController();