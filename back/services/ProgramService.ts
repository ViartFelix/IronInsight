import {dbService} from "./db-service";
import Program from "../models/TrainingProgram";
import TrainingProgram from "../models/TrainingProgram";
import User from "../models/User";
import {userService} from "./UserService";
import Exercise from "../models/Exercise";
import {exerciseService} from "./ExerciseService";
import TrainingTime from "../models/TrainingTime";

class ProgramService {

  constructor() {
  }

  public async getAllPrograms(): Promise<Program[]> {
    const final: Program[] = [];

    const rawPrograms = await dbService.query("SELECT * FROM training_program") as Program[];

    for(let row of rawPrograms) {
      row.user_likes = await this.getUserLikesFromProgram(row)
      final.push(row)
    }

    return final;
  }

  public async getOneProgram(id: string): Promise<Program> {
    const r = await dbService.query("SELECT * FROM training_program WHERE id_program = ?", [id]);
    const target = r[0] as TrainingProgram;

    target.user_likes = await this.getUserLikesFromProgram(target)

    return target as Program;
  }

  /**
   * Tries to create the training program in the DB
   * @param program
   * @param user
   */
  public async createProgram(program: Program, user: User): Promise<boolean> {
    try {
      //inserted ID of the program
      let lastId: number | undefined;
      //inserting said program in the DB
      await dbService.query(
        "INSERT INTO training_program (name, description, created_at, id_user) VALUES (?,?,?,?)",
        [program.name, program.description, program.created_at, user.id_user],
        function (err, result, fields) {
          if (err) {
            throw err;
          }
          //and because the storing of the program is ok, then we can assign it's inserted id for the exercises
          // @ts-ignore
          lastId = result.insertId
        }
      );

      if (program.exercises.length > 0) {
        for (const exo_id of program.exercises) {
          await dbService.query(
            "INSERT INTO training_program_exercises (id_program, code_exercise) VALUES (?,?)",
            [lastId, exo_id],
            function (err, result, fields) {
              if (err) {
                throw err;
              }
            }
          );
        }
      }

      return true;
    } catch (err) {
      return false;
    }
  }

  /**
   * Returns a list of user's ids that have liked the program
   * @param program
   */
  public async getUserLikesFromProgram(program: TrainingProgram) {
    //raw list of users ids that have like the post
    return await dbService.query(
      "SELECT id_user FROM likes WHERE id_program = ?",
      [program.id_program]
    ) as number[]
  }

  /**
   * Will attempt to convert provided data into a TrainingProgram Model
   * @param data
   */
  public async toProgram(data: any): Promise<TrainingProgram>
  {
    const exercises: Exercise[] = await exerciseService.getAllExercisesFromProgram(data.id_program)
    const created_at: Date = new Date(data.created_at);
    const user = userService.toUser(data)

    const timeTaken = new TrainingTime(data.time as string)
    timeTaken.parse()

    return {
      id_program: data.id_program,
      name: data.name,
      description: data.description,
      created_at: created_at,

      user: user,
      exercises: exercises,

      done_at: data.done_at,
      time: timeTaken.toObject(),
    } as TrainingProgram
  }
}

export const programService = new ProgramService();
