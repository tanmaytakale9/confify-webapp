import { connectDB } from "@/lib/dbconnect";
import Sender from "@/models/Sender";
import Message from "@/models/Message";
 

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    /// have to chnage here 
    const uid = searchParams.get("uid");
    
   // console.log("okay" ,uid)

    if (!uid) {
      return Response.json({
        success: false,
        message: "UID required"
      });
    }

    // 🔹 check user exists
    const user = await Sender.findOne({ senderuid : uid });

    if (!user) {
      return Response.json({
        success: false,
        message: "User not found"
      });
    }

    // 🔹 fetch messages
    const messages = await Message.find({ fromSenderId: uid })
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