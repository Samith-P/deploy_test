import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri =
            process.env.MONGODB_URI ||
            process.env.MONGODB_URL ||
            process.env.MONGoDB_URL; // fallback to legacy typo if present

        if (!uri || typeof uri !== "string" || uri.trim().length === 0) {
            throw new Error(
                "Missing MongoDB connection string. Set MONGODB_URI or MONGODB_URL as an environment variable."
            );
        }

        await mongoose.connect(uri);
    } catch (error) {
        console.log("ERROR while connecting to Mongodb:" + error);
        process.exit(1);
    }
};

export default connectDB;