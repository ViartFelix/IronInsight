import { Component, Input } from '@angular/core';
import { Exercise } from '../../../models/Exercise';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-exercise-item',
  standalone: true,
  imports: [CommonModule, RouterModule,MatCardModule,MatButtonModule,MatIconModule],
  templateUrl: './exercise-item.component.html',
  styleUrl: './exercise-item.component.scss'
})
export class ExerciseItemComponent {
  @Input() exercise!: Exercise;
}
