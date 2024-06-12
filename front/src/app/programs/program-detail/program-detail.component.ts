import { Component } from '@angular/core';
import { TrainingProgram } from '../../../models/Programs';
import { ActivatedRoute } from '@angular/router';
import { ProgramsService } from '../../../services/programs.service';
import { catchError, map } from 'rxjs';

@Component({
  selector: 'app-program-detail',
  standalone: true,
  imports: [],
  templateUrl: './program-detail.component.html',
  styleUrl: './program-detail.component.scss'
})
export class ProgramDetailComponent {
  protected program!: TrainingProgram;
  protected id!: string | null;

  constructor(private route: ActivatedRoute, private programsService: ProgramsService) {}

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
      .subscribe((program: TrainingProgram) => this.program = program);
  }
}
