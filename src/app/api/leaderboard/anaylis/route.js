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

    const [
      totalMessages,
      weeklyMessages,
      totalHearts,
      seenMessages
    ] = await Promise.all([

      Message.countDocuments({
        toUid: uid
      }),

      Message.countDocuments({
        toUid: uid,
        createdAt: {
          $gte: sevenDaysAgo
        }
      }),

      Message.countDocuments({
        toUid: uid,
        reaction: "heart"
      }),

      Message.countDocuments({
        toUid: uid,
        isSeen: true
      })

    ]);

    return Response.json({
      success: true,

      analytics: {
        totalMessages,
        weeklyMessages,
        totalHearts,
        seenMessages
      }
    });

  } catch (error) {

    return Response.json({
      success: false,
      message: error.message
    });

  }
}