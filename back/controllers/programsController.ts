import {router} from "../src/router";
import {programService} from "../services/ProgramService";

class ProgramsController {
    constructor() {}

    public init()
    {
        router.get("/programs", this.handleAllPrograms)
        router.get('/program/:id', this.handleOneProgram)
    }

    private handleAllPrograms(req, res)
    {
        programService.getAllPrograms().then((programs) => {
            res.send(programs)
        })
    }

    private handleOneProgram(req, res)
    {
        programService.getOneProgram(req.params.id).then((programs) => {
            res.send(programs)
        })
    }
}

export const programsController = new ProgramsController();