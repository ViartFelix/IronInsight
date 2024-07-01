import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { TrainingProgram } from '../models/Programs';
import { environment } from '../environnment';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

    constructor(private http: HttpClient) {}

    getPrograms(): Observable<TrainingProgram[]> {
        return this.http.get<TrainingProgram[]>(`${environment.apiUrl}/programs`).pipe(
            map((data: TrainingProgram[]) => {return data}),
            catchError((error: Error) => {
                console.error(error);
                return EMPTY;
            })
        );
    }

    getOneProgram(id: string) {
        return this.http.get<TrainingProgram>(`${environment.apiUrl}/program/${id}`).pipe(
            map((data: TrainingProgram) => data),
            catchError((error: Error) => {
                console.error(error);
                return EMPTY;
            })
        )
    }
}