import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { username, receiveMessages } = await req.json();

      console.log(username," ",receiveMessages);

    // Validation
    if (!username) {
      return NextResponse.json(
        {
          success: false,
          message: "Username is required",
        },
        { status: 400 }
      );
    }

    if (typeof receiveMessages !== "boolean") {
      return NextResponse.json(
        {
          success: false,
          message: "receiveMessages must be true or false",
        },
        { status: 400 }
      );
    }

    // Find and update user
    const user = await User.findOneAndUpdate(
      { username },
      { receiveMessages },
      { new: true }
    );

    // User not found
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Message receiving ${
          receiveMessages ? "enabled" : "disabled"
        }`,
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Toggle Message Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}