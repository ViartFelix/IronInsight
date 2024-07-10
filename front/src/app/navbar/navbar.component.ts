import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import AuthService from "../../services/auth.service";
import {NgIf} from "@angular/common";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    NgIf,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(
    private _authService: AuthService,
  ) {
  }

  get authService(): AuthService { return this._authService; }
}
