import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CommentsService } from '../../../../services/comments.service';
import Comment from '../../../../models/Comment';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule],
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
      console.log(result);
    });
  }
}
