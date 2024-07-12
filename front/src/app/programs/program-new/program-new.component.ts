import {Component, inject, model, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {Exercise} from "../../../models/Exercise";
import {ExercisesService} from "../../../services/exercises.service";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogProgramData,
  ProgramNewExerciseDialogComponent
} from "./program-new-exercise-dialog/program-new-exercise-dialog.component";
import {NgForOf} from "@angular/common";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {ProgramsService, TrainingProgramSubmit} from "../../../services/programs.service";
import {catchError, of} from "rxjs";
import AuthService from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-program-new',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgForOf,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatCardHeader,
    MatCardTitle,
  ],
  templateUrl: './program-new.component.html',
  styleUrl: './program-new.component.scss'
})
export class ProgramNewComponent {

  private _new_program!: FormGroup;
  private _all_exercises!: Exercise[]
  /** Chosen exercises in the dialog component */
  private _checked_exos: Exercise[] = [];

  readonly dialog = inject(MatDialog);


  constructor(
    private _exercisesService: ExercisesService,
    private _programService: ProgramsService,
    private _snackBar: MatSnackBar,
  ) {
    this._exercisesService.getExercises().subscribe((ex: Exercise[]) => {
      this._all_exercises = ex;
    });
  }

  public ngOnInit(): void
  {
    this._new_program = new FormGroup({
      programName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      programDescription: new FormControl('', [
        Validators.maxLength(5000),
      ])
    });
  }

  public addExercise(): void
  {
    const dialogRef = this.dialog.open(ProgramNewExerciseDialogComponent, {
      data: {
        allExercises: this._all_exercises,
        previous: this._checked_exos,
      } as DialogProgramData
    });

    dialogRef.afterClosed().subscribe(() => {
      this._checked_exos = dialogRef.componentInstance.allChecked ?? []
    });
  }

  private showError(message: string)
  {
    this.snackBar.open(message, 'OK', {
      duration: 30000,
      panelClass: ["error"]
    })
  }

  public onSubmit(): void
  {
    if(this._checked_exos.length === 0) {
      this.showError('Veuilllez sélectionner au moins 1 exercise.')
      return;
    }

    if(this._new_program.invalid) {
      this.showError('Un champ ou plus a une erreur. Veuillez vérifiez vos champs.')
      return;
    }

    //what will be send to the server
    const toSend = {
      name: this._new_program.value.programName,
      description: this._new_program.value.programDescription,
      exercises: this._checked_exos.map((ex) => ex.code_exercise),
    } as unknown as TrainingProgramSubmit

    this._programService.publishProgram(toSend).pipe(
      catchError((err: Error) => {
        //if error display snackbar error
        this._snackBar.open(err.message, 'OK', {
          duration: 3000,
          panelClass: ["error"]
        })

        return of(null);
      })
    ).subscribe((res: any) => {
      //else we display confirm snackbar
      this._snackBar.open(res.message, 'OK', {
        duration: 3000,
        panelClass: ["success"]
      })
    })
  }

  get new_program(): FormGroup { return this._new_program; }
  get all_exercises(): Exercise[] { return this._all_exercises; }
  get checked_exos(): Exercise[] { return this._checked_exos; }
  get snackBar(): MatSnackBar { return this._snackBar; }
}
