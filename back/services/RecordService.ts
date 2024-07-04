import {dbService} from "./db-service";
import Exercise from "../models/Exercise";
import {Record} from "../models/Record";
import User from "../models/User";
import {userService} from "./UserService";
import {exerciseService} from "./ExerciseService";

class RecordService {

  constructor() {
  }

  public async getRecordsByUser(id: number): Promise<Record[]> {
    //get all user pbs as pbs Records array
    const r = await dbService.query(
      "SELECT * FROM user_record " +
      "JOIN users ON user_record.id_user = users.id_user " +
      "JOIN exercise ON user_record.id_exercise = exercise.code_exercise " +
      "WHERE users.id_user = ?;",
      [id]
    ) as any[];

    return r.map(this.toRecord);
  }

  /**
   * Transforms a mysql Query to a 'Record' model
   * @param data A mySQL row object (if possible)
   * @private
   */
  public toRecord(data: any): Record
  {
    const user = userService.toUser(data)
    const exercise = exerciseService.toExercise(data)

    return {
      user: user,
      exercise: exercise,
      best_weight: data.best_weight,
      realised_at: data.realised_at,
    } as unknown as Record
  }
}

export const recordService = new RecordService();
