import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
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

    getExercisesFromFilters(filters: ExerciseFilters): Observable<Exercise[]> {
        let params = new HttpParams();
        for (let key in filters) {
          if (filters.hasOwnProperty(key) && filters[key as keyof ExerciseFilters] != null) {
            params = params.append(key, filters[key as keyof ExerciseFilters]!);
          }
        }

        return this.http.get<Exercise[]>(`${environment.apiUrl}/exercises`, { params }).pipe(
            map((data: Exercise[]) => data),
            catchError((error: Error) => {
              console.error(error);
              return EMPTY;
            })
          );
    }
}