import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExercisesService } from '../../../services/exercises.service';
import { Exercise } from '../../../models/Exercise';
import { CommonModule } from '@angular/common';
import { catchError, map } from 'rxjs';

@Component({
  selector: 'app-exercise-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise-detail.component.html',
  styleUrl: './exercise-detail.component.scss'
})
export class ExerciseDetailComponent {
  protected exercise!: Exercise;
  protected id!: string | null;

  constructor(private route: ActivatedRoute, private exercisesService: ExercisesService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.exercisesService.getOneExercise(this.id!)
      .pipe(
        map((result: Exercise) => result),
        catchError((error: Error) => {
          console.error(error); 
          throw new DOMException('Erreur :', error.message);
        })
      )
      .subscribe((exercise: Exercise) => this.exercise = exercise);
  }
}