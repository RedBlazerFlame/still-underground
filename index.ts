// Imports
import "./scripts/setup-dotenv.js";
import express from "express";
import http from "http";
import {
    goodEndingTimesGet,
    goodEndingTimesPost,
} from "./handlers/good-ending-times.js";
import {
    neutralEndingTimesGet,
    neutralEndingTimesPost,
} from "./handlers/neutral-ending-times.js";

// Declaring Constants
const ROOT = "src";
const HTML_ROOT = "src/docs";
const PORT = process.env.PORT || 6900;

// Setting up Server
const app = express();
const httpServer = http.createServer(app);

// Middleware
app.use(express.json());

// API Routes

/// Post a new entry to the good ending table
app.post("/api/good-ending-times", goodEndingTimesPost);

/// Gets the top 10 times (good)
app.get("/api/good-ending-times", goodEndingTimesGet);
app.get("/api/good-ending-times/:id", goodEndingTimesGet);

/// Post a new entry to the neutral ending table
app.post("/api/neutral-ending-times", neutralEndingTimesPost);

/// Gets the top 10 times (neutral)
app.get("/api/neutral-ending-times", neutralEndingTimesGet);
app.get("/api/neutral-ending-times/:id", neutralEndingTimesGet);

/// Test route to see if the server is working
app.get("/api/test/:id", (req, res) => {
    console.log(req.params.id);
    res.json(req.params);
});

// Static File Serving
app.use(express.static(ROOT));
app.use(express.static(HTML_ROOT));

// Listening to the port
httpServer.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
