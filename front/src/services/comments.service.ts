import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { environment } from '../environnment';
import Comment from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
    private readonly comments$: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);


    constructor(private http: HttpClient) {}

    getCommentsFromPrograms(id_program: string): Observable<Comment[]> {
        this.http.get<Comment[]>(`${environment.apiUrl}/comment-from-program/${id_program}`).pipe(
            map((data: Comment[]) => {return data}),
            catchError((error: Error) => {
                console.error(error);
                return EMPTY;
            })
        ).subscribe((comments) => {
            this.comments$.next(comments);
        });

        return this.comments$;
    }

    postNewComment(comment: Comment): Observable<string> {
        return this.http.post<string>(`${environment.apiUrl}/new-comment`, comment).pipe(
            map((data: string) => data),
            tap(() => this.comments$.next([...this.comments$.getValue(), comment])),
            catchError((error: Error) => {
                console.error(error);
                return EMPTY;
            })
        );
    }

    get comments(): BehaviorSubject<Comment[]> { return this.comments$; }
}