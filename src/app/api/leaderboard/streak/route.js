 
import { connectDB } from "@/lib/dbconnect";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const { uid } = await req.json();

    const user = await User.findOne({ uid });

    if (!user) {
      return Response.json({
        success: false,
        message: "User not found"
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // First login ever
    if (!user.lastLoginDate) {
      user.streak = 1;
      user.lastLoginDate = today;
      await user.save();

      return Response.json({
        success: true,
        streak: user.streak
      });
    }

    const lastLogin = new Date(user.lastLoginDate);
    lastLogin.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (today - lastLogin) / (1000 * 60 * 60 * 24)
    );

    // Same day
    if (diffDays === 0) {
      return Response.json({
        success: true,
        streak: user.streak,
        message:"same day"
      });
    }

    // Consecutive day
    if (diffDays === 1) {
      user.streak += 1;
    }

    // Missed one or more days
    if (diffDays > 1) {
      user.streak = 1;
    }

    user.lastLoginDate = today;

    await user.save();

    return Response.json({
      success: true,
      streak: user.streak
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    });
  }
}