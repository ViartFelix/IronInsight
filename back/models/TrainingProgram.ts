import Exercise from "./Exercise";
import User from "./User";
import TrainingTime from "./TrainingTime";

export default interface TrainingProgram {
  id_program: number;
  name: string;
  description: string;
  created_at: Date;

  user: User;
  exercises: Exercise[];

  //only for completed trainings
  done_at: Date | undefined;
  time: TrainingTime | object | undefined,

  user_likes: number[],
}
