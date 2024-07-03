import Comment from "../models/Comment";
import { dbService } from "./db-service";

class CommentService
{

    constructor(){}

    public async getAllCommentFromProgram(id: number): Promise<Comment> {
        const r = await dbService.query("SELECT usr.username, cmt.comment, cmt.created_at FROM comment AS cmt JOIN training_program AS tp ON cmt.id_program = tp.id_program JOIN users AS usr ON cmt.id_user = usr.id_user WHERE cmt.id_program = ?", [id]);
        return r as Comment;
    }

    public async insertNewComment(comment: Comment): Promise<string> {
        const today = new Date();
        const r = await dbService.query("INSERT INTO comment (id_user, id_program, comment, created_at) VALUES (?, ?, ?, ?);", [comment.id_user, comment.id_program, comment.comment, today]);
        return r as string;
    }
}

export const commentService = new CommentService();