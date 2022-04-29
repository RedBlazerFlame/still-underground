import { RequestHandler } from "express";
import {
    client,
    Collection,
    Create,
    Index,
    Match,
    Paginate,
    Get,
    Ref,
} from "../scripts/fauna.js";
import { isTimeRecord } from "../scripts/timeRecord.js";

export const neutralEndingTimesPost: RequestHandler = async (req, res) => {
    let data = req.body;

    // Validate input to check if its a time record
    if (!isTimeRecord(data)) {
        res.status(400).json({
            error: "The request body is of the incorrect shape",
        });
        return;
    }

    const doc = await client
        .query(Create(Collection("neutral-ending-times"), { data }))
        .catch((e) =>
            res.status(500).json({
                error: "An unexpected error occured while creating the document",
                details: e,
            })
        );

    res.json(doc);
};

export const neutralEndingTimesGet: RequestHandler = async (req, res) => {
    let { id } = req.body;

    if (typeof id !== "string" || id.length >= 256) {
        const docs = await client
            .query(
                Paginate(Match(Index("neutral-ending-times-asc")), {
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
                Get(Ref(Collection("neutral-ending-times"), id))
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
