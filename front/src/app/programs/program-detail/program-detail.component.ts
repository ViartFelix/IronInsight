import { Component } from '@angular/core';
import { TrainingProgram } from '../../../models/Programs';
import { ActivatedRoute } from '@angular/router';
import { ProgramsService } from '../../../services/programs.service';
import { catchError, map } from 'rxjs';
import { ExercisesService } from '../../../services/exercises.service';
import { Exercise } from '../../../models/Exercise';
import { ExerciseItemComponent } from '../../exercises/exercise-item/exercise-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-program-detail',
  standalone: true,
  imports: [ExerciseItemComponent, CommonModule],
  templateUrl: './program-detail.component.html',
  styleUrl: './program-detail.component.scss'
})
export class ProgramDetailComponent {
  protected program!: TrainingProgram;
  protected exercises: Exercise[] = [];
  protected id!: string | null;

  constructor(
    private route: ActivatedRoute,
    private programsService: ProgramsService,
    private exercisesService: ExercisesService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.programsService.getOneProgram(this.id!)
      .pipe(
        map((result: TrainingProgram) => result),
        catchError((error: Error) => {
          console.error(error); 
          throw new DOMException('Erreur :', error.message);
        })
      )
      .subscribe((program: TrainingProgram) => {
        this.program = program;
        this.loadExercises();
      });
  }

  loadExercises() {
    this.program ?
      this.exercisesService.getExercisesFromPrograms(this.id!)
        .pipe(
          map((result: Exercise[]) => result),
          catchError((error: Error) => {
            console.error(error); 
            throw new DOMException('Erreur :', error.message);
          })
        )
        .subscribe((result: Exercise[]) => this.exercises = result)
    : new DOMException('Erreur aucun programme portant cet identifiant');
  }
}
