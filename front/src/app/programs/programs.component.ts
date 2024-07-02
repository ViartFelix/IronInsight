import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProgramItemComponent } from './program-item/program-item.component';
import { ProgramsService } from '../../services/programs.service';
import { TrainingProgram } from '../../models/Programs';
import { MatButton } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import AuthService from '../../services/auth.service';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [
    CommonModule,
    ProgramItemComponent,
    MatButton,
    RouterLink,
  ],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss'
})
export class ProgramsComponent {
  protected response!: TrainingProgram[];

  constructor(
    protected authService: AuthService,
    private programsService: ProgramsService
  ) {}

  ngOnInit() {
    this.programsService.getPrograms().subscribe((programs) => this.response = programs);
  }


}
