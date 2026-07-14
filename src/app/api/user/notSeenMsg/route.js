import { connectDB } from "@/lib/dbconnect";
import Message from "@/models/Message";

 

// GET http://localhost:3000/api/message/notSeenMsg?uid=u789

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return Response.json({
        success: false,
        message: "UID required"
      });
    }

    const messages = await Message.find({
      toUid: uid,
      isSeen: false
    }).sort({ createdAt: -1 });

    return Response.json({
      success: true,
      count: messages.length,
      messages
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    });
  }
}