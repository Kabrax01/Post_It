import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import postRoutes from "./routes/post.route.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running at http://localhost:${PORT}/api/`);
});
