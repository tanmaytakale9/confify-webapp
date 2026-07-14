import mongoose from "mongoose";

const SenderSchema = new mongoose.Schema(
  {
    senderuid: {
      type: String,
      required: true,
      unique: true,
       index: true
    }, 
 
    sendername:{
       type: String,
      required: true,
      unique: true
    },

    avatar: {
      type: String,  
      default: "😎"
    },
    
    cooldownUntil: {
  type: Date,
  default: null
}

  }, {
    timestamps: true
  }
);
 
 
export default mongoose.models.Sender || mongoose.model("Sender", SenderSchema);