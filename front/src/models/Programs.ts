import {User} from "./User";
import {Exercise} from "./Exercise";

export interface TrainingProgram {
  id_program: number;
  name: string;
  description: string;
  created_at: string;

  user: User,
  exercises: Exercise[];

  //only for completed trainings
  done_at: Date | undefined;
  //object because the back-end uses a custom class that return an object to represent time taken
  time: object | undefined,

  user_likes: number[],
}
