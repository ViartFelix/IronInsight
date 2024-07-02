import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, EMPTY, map, Observable} from 'rxjs';
import {environment} from '../environnment';
import {Record} from '../models/Record';
import AuthService from "./auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private _authService: AuthService  // injecting AuthService to get user's id_user'
  ) {
  }

  getRecords(id_user: string): Observable<Record[]> {
    return this.http.get<Record[]>(`${environment.apiUrl}/record/${id_user}`).pipe(
      map((data: any) => {
        return data
      }),
      catchError((error: Error) => {
        console.error(error);
        return EMPTY;
      })
    );
  }

  get authService(): AuthService {
    return this._authService;
  }
}
