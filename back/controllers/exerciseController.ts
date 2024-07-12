import {router} from "../src/router";
import {exerciseService} from "../services/ExerciseService";
import uploadMiddleware from "../middlewares/fileMiddleware";
import path = require("path");
import fs = require("fs");

class ExerciseController {
    constructor() {}

    public init()
    {
        router.get('/exercises', this.handleAllExercises)
        router.get('/exercise/:id', this.handleOneExercises)
        router.get('/exercises-from-program/:id', this.handleAllExercisesFromOneProgram)
        router.get('/exercise-filters', this.handleLoadFilters)
        router.get('/images/:imageName', this.serveImage)
        router.get('/category/:category', this.handleOneCategory)
        router.get('/difficulty/:difficulty', this.handleOneDifficulty)
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

    private handleOneCategory(req, res) {
        exerciseService.searchForCategory(req.params.category).then((category) => {
            res.send(category)
        })
    }

    private handleOneDifficulty(req, res) {
        exerciseService.searchForDifficulty(req.params.difficulty).then((difficulty) => {
            res.send(difficulty)
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

    private serveImage(req, res) {
        const imageName = req.params.imageName;
        const imagePath = path.join(__dirname, '../img', imageName);

        fs.access(imagePath, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).send('Image not found');
            }

            res.sendFile(imagePath);
        });
    }
}

export const exerciseController = new ExerciseController();
