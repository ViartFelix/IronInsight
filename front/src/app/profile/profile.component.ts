import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { Record } from '../../models/Record';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  record: Record = {} as Record;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getRecords('2').subscribe((record: Record) => this.record = record);
  }
}
