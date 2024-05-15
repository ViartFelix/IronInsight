import { dbService } from "./db-service";
import Program from "../models/TrainingProgram";

class ProgramService
{

    constructor(){}

    public async getAllPrograms(): Promise<Program> {
        const r = await dbService.query("SELECT * FROM training_program");
        return r as Program;
    }
}

export const programService = new ProgramService();