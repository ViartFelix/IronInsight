import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {catchError, EMPTY, map, Observable, of} from "rxjs";
import {TrainingProgram} from "../../models/Programs";
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardActions
} from "@angular/material/card";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import AuthService from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatProgressSpinner,
    MatCardContent,
    MatCardSubtitle,
    MatCardActions
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  /** All asked posts from the back-end */
  private _homePosts: TrainingProgram[] = [];
  /** If the fetching of posts has been fetched */
  private _isLoaded = false;

  constructor(
    private userService: UserService,
    private _authService: AuthService,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit(): void
  {
    this.getHomePosts();
  }

  public getHomePosts(): void
  {
    this._isLoaded = false;

    this.userService.getHomePosts().subscribe((data) => {
      this._isLoaded = true;
      this._homePosts = data;
    });
  }

  /**
   * Checks if the id user provided is friend with the auth user
   * @param idFriend
   */
  public areFriends(idFriend: number)
  {
    return this._authService.contactList.value.includes(idFriend)
  }

  public deleteFriend(idFriend: number, friendUsername: string)
  {
    this.userService.deleteFriend(idFriend)
      .pipe(
        map((res) => res),
        catchError((res: any) => {
          if(res.status >= 400) {
            this.snackbar.open(`Quelque chose s'est mal passé, veuillez réessayer...`, 'OK', {
              duration: 15000,
              panelClass: ["error"]
            })
            //return empty to prevent subscribe to fire.
            return EMPTY;
          }

          return of(res)
        })
      ).subscribe((data: any) => {
      this.snackbar.open(`Vous n'êtes désormais plus amis avec ${friendUsername}.`, 'OK', {
        duration: 15000,
        panelClass: ["success"]
      })
    });
  }

  /**
   * Adds a friend
   * @param idFriend
   * @param friendUsername
   */
  public addFriend(idFriend: number, friendUsername: string)
  {
    this.userService.addFriend(idFriend)
      .pipe(
        map((res) => res),
        catchError((res: any) => {
          console.log(res)
          if(res.status >= 400) {
            this.snackbar.open(res.error.message ?? `Quelque chose s'est mal passé, veuillez réessayer...`, 'OK', {
              duration: 15000,
              panelClass: ["error"]
            })
            //return empty to prevent subscribe to fire.
            return EMPTY;
          }

          return of(res)
        })
      ).subscribe((data: any) => {
        this.snackbar.open(`Vous êtes désormais amis avec ${friendUsername}.`, 'OK', {
          duration: 15000,
          panelClass: ["success"]
        })
      });
  }

  get homePosts(): TrainingProgram[] { return this._homePosts; }
  get isLoaded(): boolean { return this._isLoaded; }
  get authService(): AuthService { return this._authService; }
}
