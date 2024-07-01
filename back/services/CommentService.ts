import { dbService } from "./db-service";

class CommentService
{

    constructor(){}

    public async getAllCommentFromProgram(id: number): Promise<Comment> {
        const r = await dbService.query("SELECT * FROM comment AS cmt JOIN training_program AS tp ON cmt.id_program = tp.id_program WHERE tp.id_program = ?", [id]);
        return r as Comment;
    }
}

export const commentService = new CommentService();