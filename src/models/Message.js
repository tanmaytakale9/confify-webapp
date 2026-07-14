import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {

    /// reciver
    toUid: {
      type: String,
      required: true,
      index: true
    },


     toUsername: {
      type: String,
       required: true, 
    },

    toAvatar: {
      type: String,
      required: true, 
    },



    /////sender

    fromSenderId: {
      type: String,
      required: true,
      index: true
    },

      fromSenderName: {
      type: String,
      required: true 
    },

    fromSenderAvatar: {
      type: String,
      required: true 
    },





    message: {
      type: String,
      required: true
    },

    // reactions: like, funny, dislike
    reaction: {
      type: String,
      enum: ["like","dislike" ,"heart"],
      default: null
    },

    // seen system
    isSeen: {
      type: Boolean,
      default: false
    },

    seenAt: {
      type: Date,
      default: null
    },
 
     
    toxicScore: {
      type: Number,
      default: 0
    }
  } ,
   { timestamps: true }

);

// 🔥 IMPORTANT INDEXES (for scale)

MessageSchema.index({ toUid: 1, createdAt: -1 });      // inbox fast
MessageSchema.index({ fromSenderId: 1, createdAt: -1 }); // sender activity fast


//🧹 Automatically delete messages after 30 days
//    MessageSchema.index(
//   { createdAt: 1 },
//    { expireAfterSeconds: 30 * 24 * 60 * 60 }
//    ); 
 

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);