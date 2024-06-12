import { Component, Input } from '@angular/core';
import { TrainingProgram } from '../../../models/Programs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-program-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './program-item.component.html',
  styleUrl: './program-item.component.scss'
})
export class ProgramItemComponent {
  @Input() program!: TrainingProgram;
}
