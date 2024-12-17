import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import postRoutes from "./routes/post.route.js";

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/posts", postRoutes);

app.listen(port, () => {
    connectDB();
    console.log(`Server is running at http://localhost:${port}/api/`);
});
