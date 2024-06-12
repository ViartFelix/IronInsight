import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from "@angular/core";
import {User} from "../interfaces/user.interface";
import {map, Observable, of, Subscription} from "rxjs";
import { environment } from '../environnment';


@Injectable({
  providedIn: 'root',
})

export class UserService {

  private http = inject(HttpClient);


  public registerUser(user: User): Observable<boolean>
  {
    const headers = {'headers': { 'content-type': 'application/json' }}

    return this.http.post<boolean>(`${environment.apiUrl}/register`, JSON.stringify(user), headers);
  }
}
