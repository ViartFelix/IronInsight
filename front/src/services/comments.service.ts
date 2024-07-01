import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { environment } from '../environnment';
import Comment from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

    constructor(private http: HttpClient) {}

    getCommentsFromPrograms(id_program: string): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${environment.apiUrl}/comment-from-program/${id_program}`).pipe(
            map((data: Comment[]) => {return data}),
            catchError((error: Error) => {
                console.error(error);
                return EMPTY;
            })
        );
    }
}