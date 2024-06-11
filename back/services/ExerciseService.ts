import { dbService } from "./db-service";
import Exercise from "../models/Exercise";

class ExerciseService
{

    constructor(){}

    public async getAllExercises(): Promise<Exercise> {
        const r = await dbService.query("SELECT * FROM exercise");
        return r as Exercise;
    }
}

export const exerciseService = new ExerciseService();