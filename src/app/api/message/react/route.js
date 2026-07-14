import { connectDB } from "@/lib/dbconnect";
import Message from "@/models/Message";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { messageId, reaction } = body;

    // 🔹 validate
    const allowedReactions = ["like","dislike","heart"];

    if (!messageId || !allowedReactions.includes(reaction)) {
      return Response.json({
        success: false,
        message: "Invalid data"
      });
    }

    // 🔹 update reaction
    const updated = await Message.updateOne(
      { _id: messageId , reaction: { $ne: reaction }},
      {
        $set: {
          reaction
        }
      }
    );

    return Response.json({
      success: true,
      message: "Reaction added 👍"
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    });
  }
}