import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
 

      username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },


    avatar: {
      type: String,  
      default: "😎"
    },

     // toggle: can receive messages or not
    receiveMessages: {
      type: Boolean,
      default: true
    },

   
    blockedSenders: [
      {
        type: String  
      }
    ]
    ,

    streak: {
  type: Number,
  default: 0
},

lastLoginDate: {
  type: Date,
  default: null
},

    count: {
    type: Number,
     default: 0
  }

  },
  {
    timestamps: true
  }
);

  

export default mongoose.models.User || mongoose.model("User", UserSchema);