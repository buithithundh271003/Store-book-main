import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connectDB = async (uri) => {
    try {
        const connect = await mongoose.connect(uri);
        console.log(`MongoDB connected: ${connect.connection.port} 🎉`);
    } catch (error) {
        console.log(`MongoDB connect error: ${error.message} ❌`);
    }
};
export default connectDB;
