import {router} from "../src/router";
import { commentService } from "../services/CommentService";

class CommentController {
    constructor() {}

    public init()
    {
        router.get('/comment-from-program/:id', this.handleAllCommentFromOneProgram)
    }

    private handleAllCommentFromOneProgram(req, res) {
        commentService.getAllCommentFromProgram(req.params.id).then((exercises) => {
            res.send(exercises)
        })
    }
}

export const commentController = new CommentController();