import {Component, inject} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { Record } from '../../models/Record';
import { CommonModule } from '@angular/common';
import AuthService from "../../services/auth.service";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle } from "@angular/material/card";
import {User} from "../../models/User";
import {MatButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ProfileChangeDialogComponent} from "./profile-change-dialog/profile-change-dialog.component";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatButton
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private _records: Record[] = [];
  public hasLoaded: boolean = false;

  private readonly _user: User;

  private readonly dialog = inject(MatDialog);

  constructor(
    private _profileService: ProfileService,
    private authService: AuthService,
  ) {
    this._user = this.authService.user.value
  }

  ngOnInit() {
    //take the current auth ID
    const profile_id: number = this.authService.user.value.id_user
    const strProfile = profile_id.toString()

    this._profileService
      .getRecords(strProfile)
      .subscribe((records: Record[]) => {
        this._records = records
        this.hasLoaded = true;
      });
  }

  profileChangeOpen(): void
  {
    const dialog = this.dialog.open(ProfileChangeDialogComponent)
  }

  get records(): Record[] { return this._records; }
  get user(): User { return this._user; }
}
