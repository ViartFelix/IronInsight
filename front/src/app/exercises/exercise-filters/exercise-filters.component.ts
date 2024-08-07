import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseFilters } from '../../../models/ExerciseFilters';
import { ExercisesService } from '../../../services/exercises.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-exercise-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatFormFieldModule],
  templateUrl: './exercise-filters.component.html',
  styleUrl: './exercise-filters.component.scss'
})
export class ExerciseFiltersComponent {
  categoriesFilter!: any;
  difficultiesFilter!: any;
  form!: FormGroup;

  @Output() filters = new EventEmitter<ExerciseFilters>();

  constructor(private exercisesService: ExercisesService) {}

  ngOnInit() {
    this.exercisesService.retrieveFilters().subscribe(
      (data) => {
          this.categoriesFilter = data[0];
          this.difficultiesFilter = data[1];
      }
    );

    this.form = new FormGroup({
      wording: new FormControl(''),
      category: new FormControl(''),
      difficulty: new FormControl(''),
    });
  }

  submitFilters() {
    const filters = Object.assign(
      {},
      this.form.controls['wording'].value && { wording: this.form.controls['wording'].value },
      this.form.controls['category'].value && { category: this.form.controls['category'].value },
      this.form.controls['difficulty'].value && { difficulty: this.form.controls['difficulty'].value }
    );
  
    this.filters.emit(filters as ExerciseFilters);
  }
}
