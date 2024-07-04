import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsService } from '../../../../services/comments.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import Comment from '../../../../models/Comment';
import { ActivatedRoute } from '@angular/router';
import AuthService from '../../../../services/auth.service';
import { catchError, EMPTY, map } from 'rxjs';
import { User } from '../../../../models/User';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comment-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInput, MatFormFieldModule, MatButton],
  templateUrl: './comment-input.component.html',
  styleUrl: './comment-input.component.scss'
})
export class CommentInputComponent {
  protected newComment!: Comment;
  protected form!: FormGroup;
  private actualUser: any;

  constructor(
    private commentsService: CommentsService,
    private route: ActivatedRoute,
    protected authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.actualUser = this.authService.user;
    this.form = new FormGroup({
      comment: new FormControl('', Validators.required),
    });
  }

  insertNewComment() {
    if(this.form.valid) {
      this.newComment = {
        id_program: this.route.snapshot.paramMap.get('id')!,
        id_user: this.actualUser.id_user.toString(),
        comment: this.form.controls['comment'].value,
      }
      this.commentsService.postNewComment(this.newComment)
      .pipe(
        catchError((err) => {
          this.snackBar.open(err, 'OK', {
            duration: 5000,
            panelClass: ["error"]
          });
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.snackBar.open('Commentaire ajouté!', 'OK', {
          duration: 5000,
          panelClass: ["success"]
        });
        this.form.reset();
      });
    }
  }
}
