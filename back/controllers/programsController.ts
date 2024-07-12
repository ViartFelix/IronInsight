import {router} from "../src/router";
import {programService} from "../services/ProgramService";
import auth from "../middlewares/authMiddleware";
import TrainingProgram from "../models/TrainingProgram";
import User from "../models/User";
import {jwtService} from "../services/JwtService";
import Comment from "../models/Comment";
import {dbService} from "../services/db-service";
import {jwtDecoderMiddleware} from "../middlewares/jwtDecoderMiddleware";
import {userService} from "../services/UserService";

class ProgramsController {
  constructor() {
  }

  public init() {
    router.get("/programs", this.handleAllPrograms)
    router.get('/program/:id', this.handleOneProgram)
    router.post('/program-add', this.handleCreateProgram, auth)
    router.post('/program/:id/like', this.handleLike, [auth, jwtDecoderMiddleware])
    router.post('/program/:id/dislike', this.handleDislike, [auth, jwtDecoderMiddleware])
  }

  private handleAllPrograms(req, res) {
    programService.getAllPrograms().then((programs) => {
      res.send(programs)
    })
  }

  private handleOneProgram(req, res) {
    programService.getOneProgram(req.params.id).then((program) => {
      res.send(program)
    })
  }

  private async handleCreateProgram(req, res) {
    try {
      //transforming the body request for better IDE detection
      const programCreate = req.body as TrainingProgram;
      programCreate.created_at = new Date()
      //attempts to create the program in the DB
      const created = await programService.createProgram(programCreate, programCreate.user)
      if (!created) {
        throw new Error("Could not create")
      } else {
        res.status(200).send({
          message: "Program created successfully."
        })
      }
    } catch (e) {
      return res.status(500).send({
        message: 'Unknown error when creating program'
      });
    }
  }

  private async handleLike(req, res)
  {
    try {
      const userReq = req.auth as User;
      const postId = req.params.id;
      const targetPost = await programService.getOneProgram(postId);

      if(await userService.hasLikedProgram(targetPost, userReq))
      {
        res.status(500).send({
          message: "You already liked that post !"
        })

        return;
      } else {
        await userService.likePost(targetPost, userReq)

        res.sendStatus(200)

        return;
      }
    } catch (e) {
      return res.status(500).send({
        message: 'Unknown error when liking post'
      });
    }
  }

  private async handleDislike(req, res)
  {
    try {
      const userReq = req.auth as User;
      const postId = req.params.id;
      const targetPost = await programService.getOneProgram(postId);

      if(!await userService.hasLikedProgram(targetPost, userReq))
      {
        res.status(500).send({
          message: "You cannot dislike a comment you didn't like before."
        })

        return;
      } else {
        await userService.dislikePost(targetPost, userReq)

        res.sendStatus(200)

        return;
      }
    } catch (e) {
      return res.status(500).send({
        message: 'Unknown error when disliking post'
      });
    }
  }
}

export const programsController = new ProgramsController();
