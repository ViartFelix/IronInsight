import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { environment } from '../environnment';
import Comment from '../models/Comment';
import { Record } from '../models/Record';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

    constructor(private http: HttpClient) {}

    getRecords(id_user: string): Observable<Record> {
        return this.http.get<Record>(`${environment.apiUrl}/record/${id_user}`).pipe(
            tap((data) => {
                console.log(data);
            }),
            map((data: any) => {return data}),
            catchError((error: Error) => {
                console.error(error);
                return EMPTY;
            })
        );
    }
}