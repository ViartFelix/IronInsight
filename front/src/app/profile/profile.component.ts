import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { Record } from '../../models/Record';
import { CommonModule } from '@angular/common';
import AuthService from "../../services/auth.service";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle } from "@angular/material/card";

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
    MatCardContent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private _records: Record[] = [];
  public hasLoaded: boolean = false;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
  ) {}

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

  get records(): Record[] { return this._records; }
}
