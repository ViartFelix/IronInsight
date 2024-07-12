import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, EMPTY, map, Observable} from 'rxjs';
import {TrainingProgram} from '../models/Programs';
import {environment} from '../environnment';
import AuthService from "./auth.service";
import {Exercise} from "../models/Exercise";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  getPrograms(): Observable<TrainingProgram[]> {
    return this.http.get<TrainingProgram[]>(`${environment.apiUrl}/programs`).pipe(
      map((data: TrainingProgram[]) => {
        return data
      }),
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

  /**
   * Plublishes the newly created training program to the back-end
   * @param data {TrainingProgramSubmit}
   */
  publishProgram(data: TrainingProgramSubmit) {
    const headers = {
      'headers':
        {
          'content-type': 'application/json',
        }
    }

    let userSend
    //getting the current user
    this.authService.user.subscribe((user) => {
      userSend = user
    })

    const toSend = {
      user: userSend,
      ...data
    }

    return this.http.post<boolean>(`${environment.apiUrl}/program-add`, JSON.stringify(toSend), headers);
  }

  /**
   * Attempts to like a program
   */
  public likeProgram(id_program: number)
  {
    return this.http.post<boolean>(`${environment.apiUrl}/program/${id_program}/like`, '');
  }

  /**
   * Attempts to like a program
   */
  public dislikeProgram(id_program: number)
  {
    return this.http.post<boolean>(`${environment.apiUrl}/program/${id_program}/dislike`, '');
  }
}

export interface TrainingProgramSubmit {
  name: string;
  description: string;
  exercises: Exercise[];
}
