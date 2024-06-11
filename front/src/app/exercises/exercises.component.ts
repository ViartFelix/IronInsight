import { Component } from '@angular/core';
import { ExercisesService } from '../../services/exercises.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})
export class ExercisesComponent {
  protected response: any;

  constructor(private exercisesService: ExercisesService) {}

  ngOnInit() {
    this.exercisesService.getExercises().subscribe((exercises) => this.response = exercises);
  }
}
