import {router} from "../src/router";
import {commentService} from "../services/CommentService";

class CommentController {
  constructor() {
  }

  public init() {
    router.get('/comment-from-program/:id', this.handleAllCommentFromOneProgram)
    router.post('/new-comment', this.handleNewComment)
  }

  private handleAllCommentFromOneProgram(req, res) {
    commentService.getAllCommentFromProgram(req.params.id).then((comments) => {
      res.send(comments)
    })
  }

  private handleNewComment(req, res) {
    commentService.insertNewComment(req.body).then((response) => {
      res.send(response)
    })
  }
}

export const commentController = new CommentController();
