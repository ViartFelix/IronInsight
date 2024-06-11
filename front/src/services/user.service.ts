import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from "@angular/core";
import {User} from "../interfaces/user.interface";
import {map, Observable, of, Subscription} from "rxjs";


@Injectable({
  providedIn: 'root',
})

export class UserService {

  private http = inject(HttpClient);
  private readonly api: string = "http://localhost:3333"


  public registerUser(user: User): Observable<boolean>
  {
    return this.http.post<boolean>(
      `${this.api}/register`,
      JSON.stringify(user),
      {
        'headers': { 'content-type': 'application/json' }
      }
    )
  }
}
