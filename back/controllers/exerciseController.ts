import {router} from "../src/router";
import {exerciseService} from "../services/ExerciseService";

class ExerciseController {
    constructor() {}

    public init()
    {
        router.get('/exercises', this.handleAllExercises)
    }

    private handleAllExercises(req, res) {
        exerciseService.getAllExercises().then((exercises) => {
            res.send(exercises)
        })
    }
}

export const exerciseController = new ExerciseController();