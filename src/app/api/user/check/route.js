import { connectDB } from "@/lib/dbconnect";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    let { username } = body; 

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

    const existingUser = await User.findOne({ username });

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