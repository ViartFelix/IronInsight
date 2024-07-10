import { Component } from '@angular/core';
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions} from "@angular/material/card";
import AuthService from "../../services/auth.service";
import {MatButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, EMPTY, map, of} from "rxjs";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatButton
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private _allContacts!: User[]
  private _isFetching: boolean = true;

  constructor(
    private userService: UserService,
    private authSevice: AuthService,
    private snackbar: MatSnackBar
  ) {

  }

  ngOnInit()
  {
    this.fetchContacts()
  }

  /**
   * Fetches contacts for the current user
   * @private
   */
  private fetchContacts()
  {
    this.userService.fetchContacts().subscribe((data: User[]) => {
      this._isFetching = false;
      this._allContacts = data
    })
  }

  /**
   * Makes a request to delete a friend on the database
   */
  deleteFriend(friendID: number, friendUsername: string)
  {
    this._isFetching = true

    this.userService.deleteFriend(friendID)
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

        //and we fetch new data
        this.fetchContacts()
    });

  }

  get allContacts(): User[] { return this._allContacts; }
  get isFetching(): boolean { return this._isFetching; }
}
