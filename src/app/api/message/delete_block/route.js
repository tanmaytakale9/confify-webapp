import { connectDB } from "@/lib/dbconnect";
import User from "@/models/User";
import Message from "@/models/Message";

export async function POST(req) {
  try {
    await connectDB();

    const { messageId } = await req.json();

    const message = await Message.findById(messageId);

    if (!message) {
      return Response.json({
        success: false,
        message: "Message not found 📩"
      });
    }

    const receiver = await User.findOne({
      uid: message.toUid
    });

    if (!receiver) {
      return Response.json({
        success: false,
        message: "Receiver not found 👤"
      });
    }

    // Add sender to block list
    if (!receiver.blockedSenders.includes(message.fromSenderId)) {

      receiver.blockedSenders.push(
        message.fromSenderId
      );

      await receiver.save();
    }

    // Delete message
    await Message.findByIdAndDelete(messageId);

    return Response.json({
      success: true,
      message: "Sender blocked and message deleted 🔒"
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    });
  }
}