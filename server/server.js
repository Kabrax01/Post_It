import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import Post from "./models/post.model.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/api/", (req, res) => {
    res.send("server is ready");
});

app.post("/api/posts", async (req, res) => {
    const post = req.body;
    console.log(req.body);

    if (!post.author || !post.title || !post.content || !post.createdAt) {
        return res
            .status(400)
            .json({ success: false, message: "Please provide all fields" });
    }

    const newPost = new Post(post);

    try {
        await newPost.save();
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        console.error(`Error in post request. Message: ${error.message}`);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.delete("/api/posts/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await Post.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Post deleted" });
    } catch (error) {
        console.error(`Error in delete request. Message: ${error.message}`);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.listen(port, () => {
    connectDB();
    console.log(`Server is running at http://localhost:${port}/api/`);
});
