import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import AuthService from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificatedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLoggedIn()) {
      return true;
    } else {
      return this.router.navigate(['/']);
    }
  }
}
