import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Exercise} from "../../../../models/Exercise";
import {NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSort} from "@angular/material/sort";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-program-new-exercise-dialog',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    MatSort,
    MatCheckbox
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
}

export interface DialogProgramData
{
  allExercises: Exercise[],
  previous: Exercise[],
}
