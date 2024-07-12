import {Component, inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {Exercise} from "../../../../models/Exercise";
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSort} from "@angular/material/sort";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-program-new-exercise-dialog',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    MatSort,
    MatCheckbox,
    MatDialogContent,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './program-new-exercise-dialog.component.html',
  styleUrl: './program-new-exercise-dialog.component.scss'
})
export class ProgramNewExerciseDialogComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<ProgramNewExerciseDialogComponent>);
  readonly data = inject<DialogProgramData>(MAT_DIALOG_DATA);

  public allChecked: Exercise[] = [];

  constructor(

  ) {
    //we attribute the previously checked to the dialog (from the parent)
    this.allChecked = this.data.previous;
  }

  ngOnInit() {}

  /**
   * Handles the checking of a checkbox.
   * Add the exercise if not present in the checked exercises and removes it if exercise is present.
   * @param exo
   */
  public checkManage(exo: Exercise): void
  {
    if (this.allChecked.includes(exo)) {
      this.allChecked = this.allChecked.filter(e => e.code_exercise !== exo.code_exercise);
    } else {
      this.allChecked.push(exo);
    }
  }

  public closeDialog()
  {
    this.dialogRef.close()
  }
}

export interface DialogProgramData
{
  allExercises: Exercise[],
  previous: Exercise[],
}
