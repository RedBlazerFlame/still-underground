var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { client, Collection, Create, Index, Match, Paginate, } from "../scripts/fauna.js";
import { isTimeRecord } from "../scripts/timeRecord.js";
export const goodEndingTimesPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body;
    // Validate input to check if its a time record
    if (!isTimeRecord(data)) {
        res.status(400).json({
            error: "The request body is of the incorrect shape",
        });
        return;
    }
    const doc = yield client
        .query(Create(Collection("good-ending-times"), { data }))
        .catch((e) => res.status(500).json({
        error: "An unexpected error occured while creating the document",
        details: e,
    }));
    res.json(doc);
});
export const goodEndingTimesGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body;
    // TODO Handle the case where an id is included
    const docs = yield client
        .query(Paginate(Match(Index("good-ending-times-asc")), {
        size: 10,
    }))
        .catch((e) => res.status(500).json({
        error: "An unexpected error occured while creating the document",
        details: e,
    }));
    res.json(docs);
});
