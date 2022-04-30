import { RequestHandler } from "express";
import {
    client,
    Collection,
    Create,
    Get,
    Index,
    Match,
    Paginate,
    Ref,
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
    let { id } = req.params;

    if (typeof id !== "string" || id.length >= 256) {
        const docs = await client
            .query(
                Paginate(Match(Index("good-ending-times-asc")), {
                    size: 10,
                })
            )
            .catch((e) =>
                res.status(500).json({
                    error: "An unexpected error occured while fetching the documents",
                    details: e,
                })
            );

        res.json(docs);
    } else {
        let doc;
        try {
            doc = await client.query(
                Get(Ref(Collection("good-ending-times"), id))
            );
        } catch (e) {
            res.status(404).json({
                error: `An unexpected error occured while fetching the document "${id}"`,
                details: e,
            });
            return;
        }

        res.json(doc);
    }
};
