import { connectDB } from "@/lib/dbconnect";
import Message from "@/models/Message";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { messageId } = body;

    if (!messageId) {
      return Response.json({
        success: false,
        message: "Message ID required"
      });
    }

    // 🔹 update message
    const updated = await Message.updateOne(
      { _id: messageId , isSeen: false},
      {
        $set: {
          isSeen: true,
          seenAt: new Date()
        }
      }
    );

    return Response.json({
      success: true,
      message: "Marked as seen 👀"
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    });
  }
}