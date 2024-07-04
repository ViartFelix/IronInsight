import {Component, Inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import AuthService from "../services/auth.service";
import {User} from "../models/User";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'IronInsight';

  public readonly user: User;
  public readonly token: string;

  constructor(
    private authService: AuthService
  ) {
    this.user = this.authService.user.value
    this.token = this.authService.token.value
  }

  protected readonly JSON = JSON;
}
