import Comment from "../models/Comment";
import { dbService } from "./db-service";

class CommentService
{

    constructor(){}

    public async getAllCommentFromProgram(id: number): Promise<Comment> {
        const r = await dbService.query("SELECT * FROM comment AS cmt JOIN training_program AS tp ON cmt.id_program = tp.id_program WHERE tp.id_program = ?", [id]);
        return r as Comment;
    }

    public async insertNewComment(comment: Comment): Promise<string> {
        const r = await dbService.query("INSERT INTO comment (id_user, id_program, comment) VALUES (?, ?, ?);", [comment.id_user, comment.id_program, comment.comment]);
        return r as string;
    }
}

export const commentService = new CommentService();