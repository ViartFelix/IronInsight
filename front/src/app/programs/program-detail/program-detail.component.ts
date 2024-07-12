import { Component } from '@angular/core';
import { TrainingProgram } from '../../../models/Programs';
import { ActivatedRoute } from '@angular/router';
import { ProgramsService } from '../../../services/programs.service';
import {catchError, EMPTY, map, of} from 'rxjs';
import { ExercisesService } from '../../../services/exercises.service';
import { Exercise } from '../../../models/Exercise';
import { ExerciseItemComponent } from '../../exercises/exercise-item/exercise-item.component';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentInputComponent } from './comment-input/comment-input.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import AuthService from "../../../services/auth.service";
import {MatButton} from "@angular/material/button";
import {UserService} from "../../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-program-detail',
  standalone: true,
  imports: [ExerciseItemComponent, CommonModule, CommentListComponent, CommentInputComponent, MatCardModule, MatDividerModule, MatButton],
  templateUrl: './program-detail.component.html',
  styleUrl: './program-detail.component.scss'
})
export class ProgramDetailComponent {

  protected program!: TrainingProgram;
  protected exercises: Exercise[] = [];
  protected id!: string | null;

  public readonly userID: number;

  constructor(
    private route: ActivatedRoute,
    private programsService: ProgramsService,
    private exercisesService: ExercisesService,
    private _authService: AuthService,
    private snackbar: MatSnackBar,
  ) {
    this.userID = this._authService.user.value.id_user
  }

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
    this.exercisesService.getExercisesFromPrograms(this.id!)
      .pipe(
        map((result: Exercise[]) => result),
        catchError((error: Error) => {
          console.error(error);
          throw new DOMException('Erreur :', error.message);
        })
      )
      .subscribe((result: Exercise[]) => this.exercises = result)
  }

  likePost(id_program: number)
  {
    this.programsService.likeProgram(id_program)
      .pipe(
        map((res) => res),
        catchError((err: any) => {
          if(err.status >= 400) {
            this.snackbar.open( err.error.message ?? `Quelque chose s'est mal passé, veuillez réessayer...`, 'OK', {
              duration: 15000,
              panelClass: ["error"]
            })
            //return empty to prevent subscribe to fire.
            return EMPTY;
          }

          return of(err)
        })
      )
      .subscribe((data: any) => {
      this.snackbar.open(`Votre like a été enregistré`, 'OK', {
        duration: 15000,
        panelClass: ["success"]
      })
    });
  }

  dislikePost(id_program: number)
  {
    this.programsService.dislikeProgram(id_program)
      .pipe(
        map((res) => res),
        catchError((err: any) => {
          if(err.status >= 400) {
            this.snackbar.open( err.error.message ?? `Quelque chose s'est mal passé, veuillez réessayer...`, 'OK', {
              duration: 15000,
              panelClass: ["error"]
            })
            //return empty to prevent subscribe to fire.
            return EMPTY;
          }

          return of(err)
        })
      )
      .subscribe((data: any) => {
        this.snackbar.open(`Votre dislike a été enregistré`, 'OK', {
          duration: 15000,
          panelClass: ["success"]
        })
      });
  }

  get authService(): AuthService { return this._authService; }
}
