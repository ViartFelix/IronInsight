import {router} from "../src/router";
import {recordService} from "../services/RecordService";
import {Record} from "../models/Record";

class RecordController {
  constructor() {
  }

  public init() {
    router.get("/record/:id", this.handleRecords)
  }

  private handleRecords(req, res) {
    recordService.getRecordsByUser(req.params.id).then((records: Record[]) => {
      res.status(200).json(records)
    }).catch((e) => {
      res.status(500).json({
        e: e.toString(),
        message: "An unknown error happened."
      })
    })
  }
}

export const recordController = new RecordController();
