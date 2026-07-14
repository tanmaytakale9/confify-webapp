import { connectDB } from "@/lib/dbconnect";
import Sender from "@/models/Sender";
 
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    let { sendername , avatar} = body;

    //console.log(sendername )
    // 🔹 check if username already exists
        const existingUser = await Sender.findOne({ sendername });
    
        if (existingUser) {
          return Response.json({
            success: false,
            message: "Username already taken"
          });
        }
 
 
     const senderuid = crypto.randomUUID().replace(/-/g, "").slice(0, 12);

     
    const sender = await Sender.create({
     senderuid,
      sendername,
      avatar
    });

    return Response.json({
      success: true,
      sender
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
      
    });
  }
}