import {User} from "../models/User";
import { Exercise } from "./Exercise";

export interface Record {
  user: User,
  exercise: Exercise,
  best_weight: number,
  realised_at: Date,
}
