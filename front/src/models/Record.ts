import { User } from "../interfaces/user.interface";
import { Exercise } from "./Exercise";

export interface Record {
    user: User,
    exercise: Exercise,
    bestweight: number
}