import { Component } from '@angular/core';
import { TrainingProgram } from '../../../models/Programs';
import { ActivatedRoute } from '@angular/router';
import { ProgramsService } from '../../../services/programs.service';
import { catchError, map } from 'rxjs';
import { ExercisesService } from '../../../services/exercises.service';
import { Exercise } from '../../../models/Exercise';
import { ExerciseItemComponent } from '../../exercises/exercise-item/exercise-item.component';
import { CommonModule } from '@angular/common';
import { CommentsService } from '../../../services/comments.service';
import Comment from '../../../models/Comment';
import { CommentItemComponent } from '../comment-item/comment-item.component';

@Component({
  selector: 'app-program-detail',
  standalone: true,
  imports: [ExerciseItemComponent, CommonModule, CommentItemComponent],
  templateUrl: './program-detail.component.html',
  styleUrl: './program-detail.component.scss'
})
export class ProgramDetailComponent {
  protected program!: TrainingProgram;
  protected exercises: Exercise[] = [];
  protected comments: Comment[] = [];
  protected id!: string | null;

  constructor(
    private route: ActivatedRoute,
    private programsService: ProgramsService,
    private exercisesService: ExercisesService,
    private commentsService: CommentsService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.programsService.getOneProgram(this.id!)
      .pipe(
        map((result: TrainingProgram) => result),
        catchError((error: Error) => {
          console.error(error); 
          throw new DOMException('Erreur :', error.message);
        })
      )
      .subscribe((program: TrainingProgram) => {
        this.program = program;
        program ? this.loadChildren() : new DOMException('Erreur aucun programme portant cet identifiant');
      });
  }

  loadChildren() {
    //TODO: Voir si possible de faire ça côté back car moche & pas optimisé
    this.exercisesService.getExercisesFromPrograms(this.id!)
      .pipe(
        map((result: Exercise[]) => result),
        catchError((error: Error) => {
          console.error(error); 
          throw new DOMException('Erreur :', error.message);
        })
      )
      .subscribe((result: Exercise[]) => this.exercises = result)

    this.commentsService.getCommentsFromPrograms(this.id!)
      .pipe(
        map((result: Comment[]) => result),
        catchError((error: Error) => {
          console.error(error);
          throw new DOMException('Erreur :', error.message);
        })
      )
      .subscribe((result: Comment[]) => this.comments = result)
  }
}
