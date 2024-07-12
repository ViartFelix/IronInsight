import {dbService} from "./db-service";
import Exercise from "../models/Exercise";
import {ExerciseFilters} from "../models/ExerciseFilters";

class ExerciseService {

  constructor() {
  }

  public async getAllExercises(): Promise<Exercise[]> {
    const r = await dbService.query("SELECT exercise.*, exercise_category.wording as category, exercise_difficulty.wording as difficulty FROM exercise " +
      "JOIN exercise_category ON exercise.category=exercise_category.code " +
      "JOIN exercise_difficulty ON exercise.difficulty=exercise_difficulty.id");
    return r as Exercise[];
  }

  public async getExerciseById(id: number): Promise<Exercise> {
    const r = await dbService.query("SELECT * FROM exercise WHERE code_exercise = ?", [id]);
    return r[0] as Exercise;
  }

  public async getAllExercisesFromProgram(id: number): Promise<Exercise[]> {
    const r: any[] = await dbService.query("SELECT * FROM training_program_exercises AS tpe JOIN exercise AS e ON tpe.code_exercise = e.code_exercise WHERE tpe.id_program = ?", [id]) as Array<any>;
    //changed here to be less of a pain if we were to change Exercise model
    return r.map((row) => {
      return this.toExercise(row)
    })
  }

  public async getFilters(): Promise<ExerciseFilters[]> {
    const categoryQuery = dbService.query("SELECT * FROM exercise_category");
    const difficultyQuery = dbService.query("SELECT * FROM exercise_difficulty");

    const filters = await Promise.all([categoryQuery, difficultyQuery]);

    return filters as ExerciseFilters[];
  }

  public async getExerciseFromFilters(filters: ExerciseFilters): Promise<Exercise> {
    let query = 'SELECT exe.code_exercise, exe.wording, exe.duration, exe.image FROM exercise AS exe JOIN exercise_difficulty AS exd ON exe.code_exercise = exd.id JOIN exercise_category AS exc ON exe.code_exercise = exc.code WHERE 1=1';
    const params = [];

    if (filters.wording) {
      query += ' AND exe.wording LIKE ?';
      params.push(`%${filters.wording}%`);
    }

    if (filters.category) {
      query += ' AND exe.category = ?';
      params.push(filters.category);
    }

    if (filters.difficulty) {
      query += ' AND exe.difficulty = ?';
      params.push(filters.difficulty);
    }

    const r = await dbService.query(query, params);
    return r as Exercise;
  }

  public async postNewExercise(formData: any, filename: string): Promise<string> {
    const r = await dbService.query("INSERT INTO exercise (wording, duration, image, category, difficulty) VALUES (?, ?, ?, ?, ?);", [JSON.parse(formData.exercise).wording, JSON.parse(formData.exercise).duration, filename, formData.category, formData.difficulty]);
    return r as string;
  }

  public async searchForCategory(category: string): Promise<string> {
    const r = await dbService.query("SELECT wording FROM exercise_category WHERE code = ?;", [category]);
    return r[0] as string;
  }

  public async searchForDifficulty(difficulty: string): Promise<string> {
    const r = await dbService.query("SELECT wording FROM exercise_difficulty WHERE id = ?;", [difficulty]);
    return r[0] as string;
  }

  /**
   * Converts the data provided to an Exercise model
   * @param data A mySQL row object (if possible)
   * @return Exercise
   */
  public toExercise(data: any): Exercise {
    return {
      id_exercise: data.id_exercise ?? data.code_exercise,
      wording: data.wording,
      duration: data.duration,
      image: data.image,
      difficulty: data.difficulty,
      category: data.category
    } as Exercise
  }
}

export const exerciseService = new ExerciseService();
