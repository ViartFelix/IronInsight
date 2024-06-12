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

    public async getAllExercisesFromProgram(id: number): Promise<Exercise> {
        const r = await dbService.query("SELECT * FROM training_program_exercises AS tpe JOIN exercise AS e ON tpe.code_exercise = e.code_exercise WHERE tpe.id_program = ?", [id]);
        return r as Exercise;
    }
}

export const exerciseService = new ExerciseService();