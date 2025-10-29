import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(ProcessingInstruction.env.MONGODB_URI);
    console.log("MongoDB connected: ", conn.connection.host);
  } catch (error) {
    console.log("error connecting to MongoDB: ", error.message);
    process.exit(1);
  }
};
