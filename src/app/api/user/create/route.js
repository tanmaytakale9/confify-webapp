import { connectDB } from "@/lib/dbconnect";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    let { username } = body;
    let {avatar} = body;

    // 🔹 basic validation
    if (!username || username.length < 3) {
      return Response.json({
        success: false,
        message: "Username must be at least 3 characters"
      });
    }

    username = username.toLowerCase().trim();

    // 🔹 check if username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return Response.json({
        success: false,
        message: "Username already taken"
      });
    }

    //  generate uid
    const uid = crypto.randomUUID();

    
    const user = await User.create({
      uid,
      username,
      avatar
    });

    return Response.json({
      success: true,
      user
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    });
  }
}