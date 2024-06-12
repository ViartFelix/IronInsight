import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Exercise } from '../models/Exercise';
import { environment } from '../environnment';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

    constructor(private http: HttpClient) {}

    getExercises(): Observable<Exercise[]> {
        return this.http.get<Exercise[]>(`${environment.apiUrl}/exercises`).pipe(
            map((data: Exercise[]) => {return data}),
            catchError((error: Error) => {
                console.error(error);
                return [];
            })
        );
    }

    getOneExercise(id: string) {
        console.log(id);
        return this.http.get<Exercise>(`${environment.apiUrl}/exercise/${id}`).pipe(
            map((data: Exercise) => data),
            catchError((error: Error) => {
                console.error(error);
                return EMPTY;
            })
        )
    }
}