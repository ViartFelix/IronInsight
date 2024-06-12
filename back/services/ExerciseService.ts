import { dbService } from "./db-service";
import Exercise from "../models/Exercise";

class ExerciseService
{

    constructor(){}

    public async getAllExercises(): Promise<Exercise> {
        const r = await dbService.query("SELECT * FROM exercise");
        return r as Exercise;
    }

    public async getExerciseById(id: number): Promise<Exercise> {
        const r = await dbService.query("SELECT * FROM exercise WHERE code_exercise = ?", [id]);
        return r[0] as Exercise;
    }
}

export const exerciseService = new ExerciseService();