import {router} from "../src/router";
import {exerciseService} from "../services/ExerciseService";

class ExerciseController {
    constructor() {}

    public init()
    {
        router.get('/exercises', this.handleAllExercises)
        router.get('/exercise/:id', this.handleOneExercises)
        router.get('/exercises-from-program/:id', this.handleAllExercisesFromOneProgram)
        router.get('/exercise-filters', this.handleLoadFilters)
        router.post('/exercise-from-filters', this.handleAllExercisesFromFilters)
    }

    private handleAllExercises(req, res) {
        exerciseService.getAllExercises().then((exercises) => {
            res.send(exercises)
        })
    }

    private handleAllExercisesFromOneProgram(req, res) {
        exerciseService.getAllExercisesFromProgram(req.params.id).then((exercises) => {
            res.send(exercises)
        })
    }

    private handleOneExercises(req, res) {
        exerciseService.getExerciseById(req.params.id).then((exercise) => {
            res.send(exercise)
        })
    }

    private handleLoadFilters(req, res) {
        exerciseService.getFilters().then((filters) => {
            res.send(filters)
        })
    }

    private handleAllExercisesFromFilters(req, res) {
        exerciseService.getExerciseFromFilters(req.body).then((exercises) => {
            res.send(exercises)
        })
    }
}

export const exerciseController = new ExerciseController();