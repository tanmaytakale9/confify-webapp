
"use client"
import React, { useEffect, useState } from 'react'
 import "./msgCard.css"
 import Likebtn from './likebtn'
 import Image from 'next/image'

 
import { toast } from 'react-toastify';

function msgCard({message}) {


  const [timer, setTimer] = useState(null);
  
  const [msgreaction , setmsgreaction] = useState(message.reaction);


//console.log(message);

 const handleSeen = async () => {

    if (message.isSeen) return;

    try {
      let res = await fetch("/api/message/seen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId: message._id,
        }),
      });
    
      let data = await res.json(); 

      toast("Marked as seen 👀", {
position: "top-right",
autoClose: 1000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: false,
draggable: true,
progress: undefined,
theme: "dark"
});

    } catch (error) {
      console.log(error);
    }
  };

  //// doing for mobile
  const openMessage = async () => {
    await handleSeen();   // Mark as seen
  };



  const Blockmsg = async ()=>{
 

    console.log("block start")
    try {
      let res = await fetch("/api/message/delete_block", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId: message._id,
        }),
      });
    
      let data = await res.json(); 

      toast( `${data.message}`, {
position: "top-right",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: false,
draggable: true,
progress: undefined,
theme: "dark"
});

    } catch (error) {
      console.log(error);
    }
  };


 
    const react_change = async (reaction)=>{

      try{


        let res = await fetch("/api/message/react", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId: message._id,
          reaction :reaction
        }),
      });
    
      let data = await res.json(); 
 

toast(`${data.message}`, {
position: "bottom-center",
autoClose: 1000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: false,
draggable: true,
progress: undefined,
theme: "dark", 
});


      }
       catch (error) {
      console.log(error);
    }

    }
 







  return (
    <div>
      
      
<div className="card0"    onMouseEnter={() => {
    const id = setTimeout(() => {
      handleSeen();
    }, 1000);

    setTimer(id);
  }}
  onMouseLeave={() => {
    clearTimeout(timer);
  }}   onClick={openMessage}>


  <div className="bg5">
    <div className='data0'>
      <div className='sender0'>

        <span className='emoji0'>
          
         <span>{message.fromSenderAvatar}</span> 

                  </span>

        <span className='sender-name0'>{`from  : ${message.fromSenderName}`}</span>

        <span className='block0' onClick={Blockmsg}> <Image className='ime0'
                src="/block.svg"   
                alt="Block"
                width={25}            
                height={18}           
              />
              <span>Block</span> 
               </span>

      </div>

      <div className='message0'>{message.message}

      </div>
      
       <div className='creatmsg99'>
        <p>{new Date(message.createdAt).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}</p>
           

       <Likebtn  className='reaction' msgreaction={msgreaction}  setmsgreaction={(reaction) => {
    setmsgreaction(reaction)
 
    react_change(reaction);
 
  }}  />

  </div>

    </div>
  </div>
  <div className="blob0"></div>
</div>



   
</div>



 
  )
}

export default msgCard
