"use client"
import React, { useEffect } from 'react'
import "./newSender.css";
import { useState } from "react"; 
import { toast } from 'react-toastify';

 

function newSender({ login, setlogin,setSender }) {

     
  const [username, setUsername] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const emojiOptions = ["😎","😈","👻", "👽", "🐱"];


  const handleSubmit =  async (e) => {

     e?.preventDefault();
    

    if (!username || !selectedEmoji) {
  toast.error("Please enter a username and select an emoji!");
  
  return;
}


    const apiCall = fetch("/api/sender", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  sendername : username, avatar: selectedEmoji }),
    }).then(async (res) => {
    const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Request failed");
  }

   //saving userId or userName
           localStorage.setItem("senderId", data.sender.senderuid);
           localStorage.setItem("senderName", data.sender.sendername);

           setSender(data.sender.senderuid);

  return data;  
  
});

    toast.promise(apiCall, {
      pending: "Creating your identity...",
      success: {
        render({ data }) {


          // //saving userId or userName
          //  localStorage.setItem("senderId", data.sender.senderuid);
          //  localStorage.setItem("senderName", data.sender.sendername);

          //  setSender(data.sender.senderuid);
  

          setTimeout(() => {
         setlogin(true); 
        }, 2000); 

          return `Welcome: ${data.sender.sendername}`;  
        },
      },
      error: {
        render({ data }) {
          return `Error: ${data.message}`;
        },
      },
    });
  };

  

   
























































































































  return (
    <>

        <div className='upper'>Create Your Anonymous Id</div>

    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Enter Name.. </label>
          
           <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username..."
      
                />
        </div>
        <div className="form-group">
          <label htmlFor="textarea">Select Your avtar</label>


              
                <div className='emoji221'>  {
                    emojiOptions.map((emoji) => (

                      <span key={emoji}  onClick={() => setSelectedEmoji(emoji) }   className="emoji-item221" > {emoji} </span>
                    )
                  
                  
                  )


                  }</div>


           </div> 
           <div className='end'>

            <div className='displayemoji'>{selectedEmoji}</div>
            <span className='dot'>:</span>
            <div className='displayname'>{username}</div>

           </div>
        <button type="submit" className="form-submit-btn">Submit</button>
      </form>
    </div>
       
    
     
    </>
  )
}

 


export default newSender
