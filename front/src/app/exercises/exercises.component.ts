import { Component } from '@angular/core';
import { ExercisesService } from '../../services/exercises.service';
import { CommonModule } from '@angular/common';
import { Exercise } from '../../models/Exercise';
import { ExerciseItemComponent } from './exercise-item/exercise-item.component';
import { ExerciseFiltersComponent } from './exercise-filters/exercise-filters.component';
import { ExerciseFilters } from '../../models/ExerciseFilters';
import AuthService from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, ExerciseItemComponent, ExerciseFiltersComponent, RouterLink, MatButton],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})
export class ExercisesComponent {
  protected response!: Exercise[];

  protected exampleResponse: Exercise = {} as Exercise;

  constructor(private exercisesService: ExercisesService, protected authService: AuthService) {}

  ngOnInit() {
    this.exercisesService.getExercises().subscribe((exercises) => {
      this.response = exercises;
    });
  }

  searchFromFilters(filters: ExerciseFilters) {
    this.exercisesService.getExerciseFromFilters(filters).subscribe((exercises) => {
      this.response = exercises
    });
  }

}
