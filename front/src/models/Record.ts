import { User } from "./User";
import { Exercise } from "./Exercise";

export interface Record {
    user: User,
    exercise: Exercise,
    bestweight: number
}