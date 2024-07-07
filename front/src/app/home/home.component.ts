import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {TrainingProgram} from "../../models/Programs";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle} from "@angular/material/card";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatProgressSpinner,
    MatCardContent,
    MatCardSubtitle
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

  get homePosts(): TrainingProgram[] { return this._homePosts; }
  get isLoaded(): boolean { return this._isLoaded; }
}
