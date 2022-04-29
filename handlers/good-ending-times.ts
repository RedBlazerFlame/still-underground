import { RequestHandler } from "express";
import {
    client,
    Collection,
    Create,
    Index,
    Match,
    Paginate,
} from "../scripts/fauna.js";
import { isTimeRecord } from "../scripts/timeRecord.js";

export const goodEndingTimesPost: RequestHandler = async (req, res) => {
    let data = req.body;

    // Validate input to check if its a time record
    if (!isTimeRecord(data)) {
        res.status(400).json({
            error: "The request body is of the incorrect shape",
        });
        return;
    }

    const doc = await client
        .query(Create(Collection("good-ending-times"), { data }))
        .catch((e) =>
            res.status(500).json({
                error: "An unexpected error occured while creating the document",
                details: e,
            })
        );

    res.json(doc);
};

export const goodEndingTimesGet: RequestHandler = async (req, res) => {
    let data = req.body;

    // TODO Handle the case where an id is included
    const docs = await client
        .query(
            Paginate(Match(Index("good-ending-times-asc")), {
                size: 10,
            })
        )
        .catch((e) =>
            res.status(500).json({
                error: "An unexpected error occured while creating the document",
                details: e,
            })
        );

    res.json(docs);
};
