import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExercisesService } from '../../../services/exercises.service';
import { Exercise } from '../../../models/Exercise';
import { CommonModule } from '@angular/common';
import { catchError, map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-exercise-detail',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule,MatIconModule,MatInputModule,MatSelectModule,MatFormFieldModule,MatDividerModule],
  templateUrl: './exercise-detail.component.html',
  styleUrl: './exercise-detail.component.scss'
})
export class ExerciseDetailComponent {
  protected exercise!: Exercise;
  protected id!: string | null;
  protected difficulty!: string | null;
  protected category!: string | null;

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
      .subscribe((exercise: Exercise) => {
        this.exercise = exercise;
        this.exercisesService.searchForCategory(this.exercise.category!).subscribe((result) => this.category = result.wording);
        this.exercisesService.searchForDifficulty(this.exercise.difficulty!).subscribe((result) => this.difficulty = result.wording);
      });
  }
}