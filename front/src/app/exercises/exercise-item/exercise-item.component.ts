import { Component, Input } from '@angular/core';
import { Exercise } from '../../../models/Exercise';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-exercise-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './exercise-item.component.html',
  styleUrl: './exercise-item.component.scss'
})
export class ExerciseItemComponent {
  @Input() exercise!: Exercise;
}
