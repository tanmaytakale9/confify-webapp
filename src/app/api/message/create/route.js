import { connectDB } from "@/lib/dbconnect";
import Message from "@/models/Message";
import Sender from "@/models/Sender";
 
import User from "@/models/User";

import { moderateMessage } from "@/lib/moderation";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    let { username, message, senderId } = body;

    // 🔹 basic validation
    if (!message || message.trim().length < 3) {
      return Response.json({
        success: false,
        message: "Message must be at least 3 characters"
      });
    }

    message = message.trim();

    // 🔹 find receiver
    const receiver = await User.findOne({ username });

    if (!receiver) {
      return Response.json({
        success: false,
        message: "User not found 👤"
      });
    }

    // 🔹 check toggle (can receive or not)
    if (!receiver.receiveMessages) {
      return Response.json({
        success: false,
        message: "User is not accepting messages❗"
      });
    }

    // 🔹 block check
    if (receiver.blockedSenders.includes(senderId)) {
      return Response.json({
        success: false,
        message: "You are temprory blocked 🚫"
      });
    }

    // 🔹 rate limit (5 messages per day)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const count = await Message.countDocuments({
      fromSenderId: senderId,
      createdAt: { $gte: startOfDay }
    });

    if (count >= 10) {
      return Response.json({
        success: false,
        message: "Daily limit reached (10 messages) 🩷"
      });
    }





    // 🔹 simple toxicity check (basic version)
    const result = moderateMessage(message);
 
const toxicScore = result.toxicScore;
const isToxic = result.isToxic;

const protectedMsg = result.cleanMessage;

if (toxicScore >= 6) {
  return Response.json({
    success: false,
    message: "Message rejected due to excessive toxicity ❤️‍🩹"
  });
}

 
      

    // // 🔹 positive mode check
    // if (receiver.positiveMode && isToxic) {
    //   return Response.json({
    //     success: false,
    //     message: "Only positive messages allowed"
    //   });
    // }



     // 🔹 find sender
    const sender = await Sender.findOne({ senderuid : senderId });

    if (!sender) {
      return Response.json({
        success: false,
        message: "sender not found 👤"
      });
    }
 



    //// check sender is toxic


    if ( sender.cooldownUntil && sender.cooldownUntil > new Date()) {
 

       const now = new Date();
  const diffMs = sender.cooldownUntil - now; // difference in milliseconds
  const diffHours = Math.ceil(diffMs / (1000 * 60 * 60 )); // convert to hours, round up
 
  return Response.json({
    success: false,
    message: `You are on cooldown until ${diffHours} hour(s).`
  });

}



 
 



    // 🔹 save message
    const newMessage = await Message.create({

      toUid: receiver.uid,  
      toUsername:receiver.username,
      toAvatar:receiver.avatar,

      fromSenderId: sender.senderuid,
      fromSenderName:sender.sendername,
      fromSenderAvatar:sender.avatar,

      //message
      message : protectedMsg,


    //   isToxic,
      toxicScore: isToxic ? 1 : 0
    });




    
/////////////////////////////////////////

const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const toxicMessages = await Message.countDocuments({
  fromSenderId: sender.senderuid,
  toxicScore: 1,
   createdAt: { $gte: sevenDaysAgo }
});

const totalMessages = await Message.countDocuments({
  fromSenderId: sender.senderuid ,
   createdAt: { $gte: sevenDaysAgo }
});

const toxicPercentage =
  totalMessages > 0
    ? Number(((toxicMessages / totalMessages) * 100).toFixed(1))
    : 0;
 
    let cooldownHours = 0;

if (toxicPercentage >= 80) {
  cooldownHours = 24; // 24 hours
} else if (toxicPercentage >= 60) {
  cooldownHours = 2; // 2 hours
}


 if(totalMessages >= 3){

if (cooldownHours > 0) {

  const cooldownUntil = new Date(
    Date.now() + cooldownHours * 60 * 60* 1000 
  );

  await Sender.updateOne(
    { senderuid: sender.senderuid },
    { cooldownUntil }
  );

  // return Response.json({
  //   success: false,
  //   message: `You are on cooldown for ${cooldownHours} hour(s).`
  // });
}

}





////////////
    return Response.json({
      success: true,
      message: "Message sent ✅",
      data: newMessage
    });



  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    });
  }
}





















