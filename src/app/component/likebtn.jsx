"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./likebtn.css";

function LikeBtn({ className,msgreaction,setmsgreaction }) {
  
  const [reaction, setReaction] = useState(msgreaction);


  const display = (react)=>{

    if(reaction){
      return;
    }

    setReaction(react);


    setmsgreaction(react);


  }

  return (
    <div>
      <div className={`content ${className || ""}`}>
        <Image
          className="like"
          src={reaction === "like" ? "/like-active.svg" : "/like.svg"}
          alt="like"
          width={20}
          height={20}
          onClick={() => display("like")}
        />

        <Image
          className="dislike"
          src={reaction === "dislike" ? "/dislike-active.svg" : "/dislike.svg"}
          alt="dislike"
          width={20}
          height={20}
          onClick={() => display("dislike")}
        />

        <Image
          className="thumb"
          src={reaction === "heart" ? "/heart-active.svg" : "/heart.svg"}
          alt="heart"
          width={20}
          height={20}
          onClick={() => display("heart")}
        />
      </div>
    </div>
  );
}

export default LikeBtn;
