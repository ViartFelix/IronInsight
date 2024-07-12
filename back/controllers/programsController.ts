import {router} from "../src/router";
import {programService} from "../services/ProgramService";
import auth from "../middlewares/authMiddleware";
import TrainingProgram from "../models/TrainingProgram";
import User from "../models/User";
import {jwtService} from "../services/JwtService";
import Comment from "../models/Comment";
import {dbService} from "../services/db-service";

class ProgramsController {
  constructor() {
  }

  public init() {
    router.get("/programs", this.handleAllPrograms)
    router.get('/program/:id', this.handleOneProgram)
    router.post('/program-add', this.handleCreateProgram, auth)
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


}

export const programsController = new ProgramsController();
