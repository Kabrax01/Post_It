import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: String,
        required: false,
    },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
