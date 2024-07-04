import {dbService} from "./db-service";
import Program from "../models/TrainingProgram";
import User from "../models/User";

class ProgramService {

  constructor() {
  }

  public async getAllPrograms(): Promise<Program> {
    const r = await dbService.query("SELECT * FROM training_program");
    return r as Program;
  }

  public async getOneProgram(id: string): Promise<Program> {
    const r = await dbService.query("SELECT * FROM training_program WHERE id_program = ?", [id]);
    return r[0] as Program;
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
}

export const programService = new ProgramService();
