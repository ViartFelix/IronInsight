import { dbService } from "./db-service";
import Exercise from "../models/Exercise";
import { ExerciseFilters } from "../models/ExerciseFilters";

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

    public async getFilters(): Promise<ExerciseFilters[]> {
        const categoryQuery = dbService.query("SELECT * FROM exercise_category");
        const difficultyQuery = dbService.query("SELECT * FROM exercise_difficulty");

        const filters = await Promise.all([categoryQuery, difficultyQuery]);

        return filters;
    }

    public async getExerciseFromFilters(filters: ExerciseFilters): Promise<Exercise> {
        let query = 'SELECT exe.code_exercise, exe.wording, exe.duration, exe.image FROM exercise AS exe JOIN exercise_difficulty AS exd ON exe.code_exercise = exd.id JOIN exercise_category AS exc ON exe.code_exercise = exc.code WHERE 1=1';
        const params = [];

        if (filters.wording) {
            query += ' AND exe.wording LIKE ?';
            params.push(`%${filters.wording}%`);
        }

        if (filters.category) {
            query += ' AND exc.code = ?';
            params.push(filters.category);
        }

        if (filters.difficulty) {
            query += ' AND exd.id = ?';
            params.push(filters.difficulty);
        }

        const r = await dbService.query(query, params);
        return r as Exercise;
    }
}

export const exerciseService = new ExerciseService();