import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { Exercise } from '../models/Exercise';
import { environment } from '../environnment';
import { ExerciseFilters } from '../models/ExerciseFilters';

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
                return EMPTY;
            })
        );
    }

    getOneExercise(id: string) {
        return this.http.get<Exercise>(`${environment.apiUrl}/exercise/${id}`).pipe(
            map((data: Exercise) => data),
            catchError((error: Error) => {
                console.error(error);
                return EMPTY;
            })
        )
    }

    getExercisesFromPrograms(id_program: string): Observable<Exercise[]> {
        return this.http.get<Exercise[]>(`${environment.apiUrl}/exercises-from-program/${id_program}`).pipe(
            map((data: Exercise[]) => {return data}),
            catchError((error: Error) => {
                console.error(error);
                return EMPTY;
            })
        );
    }

    retrieveFilters() : Observable<ExerciseFilters[]> {
        return this.http.get<ExerciseFilters[]>(`${environment.apiUrl}/exercise-filters`).pipe(
            map((data: ExerciseFilters[]) => data),
            catchError((error: Error) => {
                console.error(error);
                return EMPTY;
            })
        );
    }

    getExerciseFromFilters(filters: ExerciseFilters): Observable<Exercise[]> {
        return this.http.post<Exercise[]>(`${environment.apiUrl}/exercise-from-filters`, filters).pipe(
            map((data: Exercise[]) => data),
            catchError((error: Error) => {
                console.error(error);
                return EMPTY;
            })
        );
    }
}