import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from "@angular/core";
import {User} from "../models/User";
import {map, Observable, of, Subscription} from "rxjs";
import { environment } from '../environnment';
import AuthService from "./auth.service";


@Injectable({
  providedIn: 'root',
})

export class UserService {

  private http = inject(HttpClient);

  constructor() {}

  public registerUser(user: User): Observable<boolean>
  {
    const headers = {'headers': { 'content-type': 'application/json' }}

    return this.http.post<boolean>(`${environment.apiUrl}/register`, JSON.stringify(user), headers);
  }

  public loginUser(userReq: object): Observable<boolean>
  {
    const headers = {'headers': { 'content-type': 'application/json' }}

    return this.http.post<boolean>(`${environment.apiUrl}/login`, JSON.stringify(userReq), headers);
  }

  public changeUserData(userData: User): Observable<boolean>
  {
    const headers = {'headers': { 'content-type': 'application/json' }}

    return this.http.post<boolean>(`${environment.apiUrl}/change-user`, JSON.stringify(userData), headers)
  }
}
