import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {inject, Injectable} from "@angular/core";
import {User} from "../models/User";
import {BehaviorSubject, catchError, EMPTY, map, Observable, of, Subscription} from "rxjs";
import { environment } from '../environnment';
import AuthService from "./auth.service";
import {TrainingProgram} from "../models/Programs";


@Injectable({
  providedIn: 'root',
})

export class UserService {

  private http = inject(HttpClient);

  constructor(
  ) {}

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

  public getHomePosts(): Observable<TrainingProgram[]>
  {
    return this.http.get<TrainingProgram[]>(`${environment.apiUrl}/home-programs`).pipe(
      map((data: TrainingProgram[]) => data),
      catchError((error: Error) => {
        console.log(error)
        return EMPTY;
      })
    );
  }

  public fetchContacts(): Observable<User[]>
  {
    return this.http.get<User[]>(`${environment.apiUrl}/friends`).pipe(
      map((data: User[], usr) => data),
      catchError((error: Error) => {
        return EMPTY;
      })
    )
  }

  public deleteFriend(friendID: number): Observable<boolean>
  {
    return this.http.delete<boolean>(`${environment.apiUrl}/friends/delete/${friendID}`)
  }

  public addFriend(friendID: number): Observable<boolean> {
    const headers = {'headers': { 'content-type': 'application/json' }}

    return this.http.post<boolean>(`${environment.apiUrl}/friends/add/${friendID}`, {friend: friendID}, headers)
  }
}

