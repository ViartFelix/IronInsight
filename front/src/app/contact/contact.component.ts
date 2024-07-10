import { Component } from '@angular/core';
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions} from "@angular/material/card";
import AuthService from "../../services/auth.service";
import {MatButton} from "@angular/material/button";

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
  ) {

  }

  ngOnInit()
  {
    this.userService.fetchContacts().subscribe((data: User[]) => {
      this._isFetching = false;
      this._allContacts = data
    })
  }

  /**
   * Makes a request to delete a friend on the database
   */
  deleteFriend()
  {
    return false;
  }

  get allContacts(): User[] { return this._allContacts; }
  get isFetching(): boolean { return this._isFetching; }
}
