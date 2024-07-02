import { Component } from '@angular/core';
import { ExercisesService } from '../../services/exercises.service';
import { CommonModule } from '@angular/common';
import { Exercise } from '../../models/Exercise';
import { ExerciseItemComponent } from './exercise-item/exercise-item.component';
import { ExerciseFiltersComponent } from './exercise-filters/exercise-filters.component';
import { ExerciseFilters } from '../../models/ExerciseFilters';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, ExerciseItemComponent, ExerciseFiltersComponent],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})
export class ExercisesComponent {
  protected response!: Exercise[];

  protected exampleResponse: Exercise = {} as Exercise;

  constructor(private exercisesService: ExercisesService) {}

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
