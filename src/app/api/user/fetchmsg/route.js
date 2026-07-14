import { connectDB } from "@/lib/dbconnect";
import Message from "@/models/Message";
import User from "@/models/User";

export async function GET(req) {
  try {
    await connectDB();

    //GET http://localhost:3000/api/message/inbox?uid=YOUR_UID

    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return Response.json({
        success: false,
        message: "UID required"
      });
    }

    // 🔹 check user exists
    const user = await User.findOne({ uid });

    if (!user) {
      return Response.json({
        success: false,
        message: "User not found"
      });
    }

    // 🔹 fetch messages
    const messages = await Message.find({ toUid: uid , isSeen: true })
      .sort({ createdAt: -1 }) // latest first
      .limit(50); // pagination basic

    return Response.json({
      success: true,
      messages
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    });
  }
}