import {router} from "../src/router";
import { recordService } from "../services/RecordService";

class RecordController {
    constructor() {}

    public init()
    {
        router.get("/record/:id", this.handleRecords)
    }

    private handleRecords(req, res)
    {
        recordService.getRecordsByUser(req.params.id).then((record) => {
            res.send(record)
        })
    }
}

export const recordController = new RecordController();