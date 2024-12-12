import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/", (req, res) => {
    res.send("server is ready");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/api/`);
    connectDB();
});
