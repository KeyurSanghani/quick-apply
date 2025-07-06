import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

// Connect to the database
export const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Database is connected");
    })
}