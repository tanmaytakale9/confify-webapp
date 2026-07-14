import mongoose from "mongoose";

export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected");
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected:", conn.connection.host);
  } catch (error) {
    console.error("MongoDB Connection Error ❌:", error);
    throw error; // VERY IMPORTANT
  }
}