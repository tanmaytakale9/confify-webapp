import { connectDB } from "@/lib/dbconnect";
import Message from "@/models/Message";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return Response.json({
        success: false,
        message: "uid required"
      });
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(
      sevenDaysAgo.getDate() - 7
    );

    const leaderboard = await Message.aggregate([
      {
        $match: {
          createdAt: {
            $gte: sevenDaysAgo
          }
        }
      },

      {
        $group: {
          _id: "$toUid",
          totalMessages: {
            $sum: 1
          },
          lastMessageAt: { $max: "$createdAt" }

        }
      },

      {
        $sort: {
          totalMessages: -1,
            lastMessageAt: -1

        }
      }
    ]);

    const rank =
      leaderboard.findIndex(
        user => user._id === uid
      ) + 1;

   const totalUsers=leaderboard.length;

    return Response.json({
      success: true,
      rank,
      totalUsers
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    });
  }
}