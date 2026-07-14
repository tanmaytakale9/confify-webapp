 
import React, { useState } from "react";
import Image from "next/image";
import "./likebtn2.css";

function LikeBtn2({ className ,reaction}) {
     
  return (
    <div>
      <div className={`content ${className || ""}`}>
        <Image
          className="like"
          src={reaction === "like" ? "/like-active.svg" : "/like.svg"}
          alt="like"
          width={20}
          height={20}
           
        />

        <Image
          className="dislike"
          src={reaction === "dislike" ? "/dislike-active.svg" : "/dislike.svg"}
          alt="dislike"
          width={20}
          height={20}
         
        />

        <Image
          className="thumb"
          src={reaction === "heart" ? "/heart-active.svg" : "/heart.svg"}
          alt="heart"
          width={20}
          height={20}
         
        />
      </div>
    </div>
  );
}

export default LikeBtn2;
