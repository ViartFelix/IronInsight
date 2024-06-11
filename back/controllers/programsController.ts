import {router} from "../src/router";
import {programService} from "../services/ProgramService";

class ProgramsController {
    constructor() {}

    public init()
    {
        router.get("/programs", this.handleAllPrograms)
    }

    private handleAllPrograms(req, res)
    {
        programService.getAllPrograms().then((programs) => {
            res.send(programs)
        })
    }
}

export const programsController = new ProgramsController();