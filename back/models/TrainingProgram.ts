import Exercise from "./Exercise";
import User from "./User";

export default interface TrainingProgram {
    id_program: number;
    name: string;
    description: string;
    created_at: Date;
    user: User;

    exercises: Exercise[];
}
