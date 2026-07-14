import { connectDB } from "@/lib/dbconnect";
import Message from "@/models/Message";

export async function GET() {
  try {
    await connectDB();

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

          username: {
            $first: "$toUsername"
          },

          avatar: {
            $first: "$toAvatar"
          },

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
      },

      {
        $limit: 10
      }
    ]);

    // console.log(leaderboard);

    return Response.json({
      success: true,
      leaderboard
    });

  } catch (error) {

    return Response.json({
      success: false,
      message: error.message
    });

  }
}