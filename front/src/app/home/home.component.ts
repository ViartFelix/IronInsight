import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {TrainingProgram} from "../../models/Programs";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private _homePosts: TrainingProgram[] = [];

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
    this.userService.getHomePosts().subscribe((data) => {
      this._homePosts = data;
    });
  }

  get homePosts(): TrainingProgram[] { return this._homePosts; }
}
