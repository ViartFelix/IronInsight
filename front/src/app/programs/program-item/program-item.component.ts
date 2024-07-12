import { Component, Input } from '@angular/core';
import { TrainingProgram } from '../../../models/Programs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import AuthService from "../../../services/auth.service";
import {catchError, EMPTY, map, of} from "rxjs";
import {ProgramsService} from "../../../services/programs.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-program-item',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './program-item.component.html',
  styleUrl: './program-item.component.scss'
})
export class ProgramItemComponent {
  @Input() public program!: TrainingProgram;

  public readonly userID: number;

  constructor(
    public authService: AuthService,
    private programsService: ProgramsService,
    private snackbar: MatSnackBar,
  ) {
    this.userID = this.authService.user.value.id_user
  }

  likePost(id_program: number)
  {
    this.programsService.likeProgram(id_program)
      .pipe(
        map((res) => res),
        catchError((err: any) => {
          if(err.status >= 400) {
            this.snackbar.open( err.error.message ?? `Quelque chose s'est mal passé, veuillez réessayer...`, 'OK', {
              duration: 15000,
              panelClass: ["error"]
            })
            //return empty to prevent subscribe to fire.
            return EMPTY;
          }

          return of(err)
        })
      )
      .subscribe((data: any) => {
        this.snackbar.open(`Votre like a été enregistré`, 'OK', {
          duration: 15000,
          panelClass: ["success"]
        })
      });
  }

  dislikePost(id_program: number)
  {
    this.programsService.dislikeProgram(id_program)
      .pipe(
        map((res) => res),
        catchError((err: any) => {
          if(err.status >= 400) {
            this.snackbar.open( err.error.message ?? `Quelque chose s'est mal passé, veuillez réessayer...`, 'OK', {
              duration: 15000,
              panelClass: ["error"]
            })
            //return empty to prevent subscribe to fire.
            return EMPTY;
          }

          return of(err)
        })
      )
      .subscribe((data: any) => {
        this.snackbar.open(`Votre dislike a été enregistré`, 'OK', {
          duration: 15000,
          panelClass: ["success"]
        })
      });
  }
}
