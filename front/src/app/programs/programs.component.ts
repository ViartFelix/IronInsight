import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProgramItemComponent } from './program-item/program-item.component';
import { ProgramsService } from '../../services/programs.service';
import { TrainingProgram } from '../../models/Programs';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [CommonModule, ProgramItemComponent],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss'
})
export class ProgramsComponent {
  protected response!: TrainingProgram[];

  constructor(private programsService: ProgramsService) {}

  ngOnInit() {
    this.programsService.getPrograms().subscribe((programs) => this.response = programs);
  }
}
