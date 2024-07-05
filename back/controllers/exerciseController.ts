import {router} from "../src/router";
import {exerciseService} from "../services/ExerciseService";
import uploadMiddleware from "../middlewares/fileMiddleware";
import Exercise from "../models/Exercise";

class ExerciseController {
    constructor() {}

    public init()
    {
        router.get('/exercises', this.handleAllExercises)
        router.get('/exercise/:id', this.handleOneExercises)
        router.get('/exercises-from-program/:id', this.handleAllExercisesFromOneProgram)
        router.get('/exercise-filters', this.handleLoadFilters)
        router.post('/exercise-from-filters', this.handleAllExercisesFromFilters)
        router.post('/new-exercise', this.handleNewExercise, uploadMiddleware)
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

    private handleNewExercise(req, res) {
        const { exercise, category, difficulty } = req.body;
        exerciseService.postNewExercise({ exercise, category, difficulty }, req.file.filename).then((response) => {
            res.send(response)
        })
    }
}

export const exerciseController = new ExerciseController();