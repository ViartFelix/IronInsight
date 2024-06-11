import { Component } from '@angular/core';
import { ExercisesService } from '../../services/exercises.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  response: any;

  constructor(private exercisesService: ExercisesService) {}

  ngOnInit() {
    this.exercisesService.getExercises().subscribe((exercises) => this.response = exercises);
  }
}
