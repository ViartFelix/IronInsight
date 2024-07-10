import { Component } from '@angular/core';
import { ExercisesService } from '../../../services/exercises.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Exercise } from '../../../models/Exercise';
import { Router } from '@angular/router';
import { fileExtensionValidator } from '../../../validators/fileExtensionValidator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-exercise-creation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './exercise-creation.component.html',
  styleUrl: './exercise-creation.component.scss'
})
export class ExerciseCreationComponent {
  categoriesFilter!: any;
  difficultiesFilter!: any;
  selectedFile: File | null = null;
  form!: FormGroup;
  pattern=/06([0-9]{8})/;

  constructor(
    private exercisesService: ExercisesService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  public ngOnInit(): void
  {
    this.exercisesService.retrieveFilters().subscribe(
      (data) => {
          this.categoriesFilter = data[0];
          this.difficultiesFilter = data[1];
      }
    );

    this.form = new FormGroup({
      exerciseName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      exerciseDuration: new FormControl('00:00', [Validators.required]),
      exerciseImage: new FormControl('', [Validators.required, fileExtensionValidator(['jpg', 'png', 'gif', 'jpeg', 'webp'])]),
      exerciseCategory: new FormControl('', [Validators.required]),
      exerciseDifficulty: new FormControl('', [Validators.required])
    });
  }

  get file() {
    return this.form.get('exerciseImage');
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  submitExerciseCreation() {
    if(this.form.valid) {

      const newExercise: Exercise = {
        wording: this.form.controls['exerciseName'].value,
        duration: this.form.controls['exerciseDuration'].value
      }

      this.exercisesService.postNewExercise(
        this.selectedFile!,
        newExercise,
        this.form.controls['exerciseCategory'].value,
        this.form.controls['exerciseDifficulty'].value
      ).subscribe(() => {
        this.snackBar.open('Form validé!', 'OK', {
          duration: 5000,
          panelClass: ["success"]
        });
        this.router.navigate(['/exercices']);
      });
    }
    else {
      this.snackBar.open('Formulaire invalide!', 'OK', {
        duration: 5000,
        panelClass: ["error"]
      });
    }
  }
}
