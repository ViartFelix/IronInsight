import { dbService } from "./db-service";
import Exercise from "../models/Exercise";
import { Record } from "../models/Record";

class RecordService
{

    constructor(){}

    public async getRecordsByUser(id: number): Promise<Record> {
        const r = await dbService.query("SELECT * FROM user_record JOIN users ON user_record.id_user = users.id_user JOIN exercise ON user_record.id_exercise = code_exercise WHERE users.id_user = ?;", [id]);
        console.log(r[0]);
        return r[0] as Record;
    }
}

export const recordService = new RecordService();