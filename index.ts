// Imports
import express from "express";
import http from "http";

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
app.post("/api/test/", (req, res) => {
    console.log(req.body);
    if (req.body?.secret === "Hikifes2019") {
        res.json({
            ...req.body,
            message: "You found the hidden message",
            purpose:
                "This is just a test route to see if the backend is working",
        });
    } else {
        res.json(req.body);
    }
});

// Static File Serving
app.use(express.static(ROOT));
app.use(express.static(HTML_ROOT));

// Listening to the port
httpServer.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
