import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, tap } from 'rxjs';
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
            map((data: Exercise[]) => {
                return data.map(exercise => ({
                    ...exercise,
                    image: `${environment.apiUrl}/images/${exercise.image}`
                } as Exercise));
            }),
            catchError((error: Error) => {
                console.error(error);
                return EMPTY;
            })
        );
    }

    getOneExercise(id: string) {
        return this.http.get<Exercise>(`${environment.apiUrl}/exercise/${id}`).pipe(
            map((data: Exercise) => {
                return {
                    ...data,
                    image: `${environment.apiUrl}/images/${data.image}`
                } as Exercise
            }),
            catchError((error: Error) => {
                console.error(error);
                return EMPTY;
            })
        )
    }

    getExercisesFromPrograms(id_program: string): Observable<Exercise[]> {
        return this.http.get<Exercise[]>(`${environment.apiUrl}/exercises-from-program/${id_program}`).pipe(
            map((data: Exercise[]) => {
                return data.map(exercise => ({
                    ...exercise,
                    image: `${environment.apiUrl}/images/${exercise.image}`
                } as Exercise));
            }),
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
            map((data: Exercise[]) => {
                return data.map(exercise => ({
                    ...exercise,
                    image: `${environment.apiUrl}/images/${exercise.image}`
                } as Exercise));
            }),
            catchError((error: Error) => {
                console.error(error);
                return EMPTY;
            })
        );
    }

  postNewExercise(file: File, exercise: Exercise, cat: string, dif: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('exercise', JSON.stringify(exercise));
    formData.append('category', cat);
    formData.append('difficulty', dif);

    return this.http.post<string>(`${environment.apiUrl}/new-exercise`, formData).pipe(
      catchError((error: Error) => {
        console.error('Error posting new exercise:', error);
        return EMPTY;
      })
    );
  }
}