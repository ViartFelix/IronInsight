import Exercise from "./Exercise";
import User from "./User";

export interface Record {
    user: User,
    exercise: Exercise,
    best_weight: number
}