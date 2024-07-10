import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CommentsService } from '../../../../services/comments.service';
import Comment from '../../../../models/Comment';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule,],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss'
})
export class CommentListComponent {
  @Input() programID: number = 0;
  protected comments: Comment[] = [];

  constructor(private commentService: CommentsService) {}

  ngOnInit() {
    this.commentService.getCommentsFromPrograms(this.programID.toString()).subscribe((result) => {
      this.comments = result;
    });
  }
}
