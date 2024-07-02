import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import AuthService from '../../services/authService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLoggedIn()) {
      return true;
    } else {
      return this.router.navigate(['/']); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    }
  }
}
