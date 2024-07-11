import {Component, inject} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { Record } from '../../models/Record';
import { CommonModule } from '@angular/common';
import AuthService from "../../services/auth.service";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle } from "@angular/material/card";
import {User} from "../../models/User";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {ProfileChangeDialogComponent} from "./profile-change-dialog/profile-change-dialog.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatButton,
    MatProgressSpinnerModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private _records: Record[] = [];
  public hasLoaded: boolean = false;

  private _user!: User;

  private readonly dialog = inject(MatDialog);

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) {
    this.getUser();
  }



  ngOnInit() {
    //take the current auth ID
    const profile_id: number = this.authService.user.value.id_user
    const strProfile = profile_id.toString()

    this.profileService
      .getRecords(strProfile)
      .subscribe((records: Record[]) => {
        this._records = records
        this.hasLoaded = true;
      });
  }

  public getUser()
  {
    this._user = this.authService.user.value
  }

  profileChangeOpen(): void
  {
    const dialog = this.dialog.open(ProfileChangeDialogComponent, {
      disableClose: true,
    })

    dialog.afterClosed().subscribe(values => {
      this.getUser()
    })
  }

  get records(): Record[] { return this._records; }
  get user(): User { return this._user; }
}
