import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Exercise } from '../models/Exercise';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
    private url = 'http://localhost:3333';

    constructor(private http: HttpClient) {}

    getExercises(): Observable<Exercise[]> {
        return this.http.get<Exercise[]>(`${this.url}/exercises`).pipe(
            map((data: Exercise[]) => {return data}),
            catchError((error: Error) => {
                console.error(error);
                return [];
            })
        );
    }
}