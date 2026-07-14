import { connectDB } from "@/lib/dbconnect";
import Sender from "@/models/Sender";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    let { username } = body;
   // console.log(username);

    // // 🔹 validation
    // if (!username || username.length < 3) {
    //   return Response.json({
    //     success: false,
    //     available: false,
    //     message: "Minimum 3 characters required"
    //   });
    // }

    // username = username.toLowerCase().trim();

    // 🔹 check DB

    const existingUser = await Sender.findOne({ senderuid:username });

    if (existingUser) {
      return Response.json({
        success: true,
        user : existingUser
         
      });
    }

    return Response.json({
      success: false,
       
      message: "Username not available in database ❌"
    });

  } catch (error) {
    return Response.json({
      success: false,
      available: false,
      message: error.message
    });
  }
}