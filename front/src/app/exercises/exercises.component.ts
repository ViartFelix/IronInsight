import { Component } from '@angular/core';
import { ExercisesService } from '../../services/exercises.service';
import { CommonModule } from '@angular/common';
import { Exercise } from '../../models/Exercise';
import { ExerciseItemComponent } from './exercise-item/exercise-item.component';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, ExerciseItemComponent],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})
export class ExercisesComponent {
  protected response!: Exercise[];

  protected exampleResponse: Exercise = {} as Exercise;

  constructor(private exercisesService: ExercisesService) {}

  ngOnInit() {
    this.exercisesService.getExercises().subscribe((exercises) => this.response = exercises);
  }
}
