import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.LIVE_MONGODB_URL ?? "mongodb://mongodb:27017/PostsDB"
        );
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`MongoDB error ${error.message}`);
        process.exit(1);
    }
};
