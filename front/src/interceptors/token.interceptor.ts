import {inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHandlerFn
} from '@angular/common/http';
import AuthService from '../services/auth.service';
import {Observable} from "rxjs";

/** Will place the authorisation token in the request if the user is logged in */
export function tokenInterceptor(request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>>
{
  const auth = inject(AuthService)

  if(auth.isLoggedIn()) {
    const token = auth.token.value

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request);
}
