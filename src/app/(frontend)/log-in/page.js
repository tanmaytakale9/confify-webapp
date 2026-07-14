"use client"
import React, { useEffect } from 'react'
import "./log-in.css";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

import Btn from '@/app/component/button';
import { toast } from 'react-toastify';


 

function page() {

    

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const emojiOptions = ["😎","😈","👻", "👽", "🐱"];


  const handleSubmit =  async () => {

    if (!username || !selectedEmoji) {
  toast.error("Please enter a username and select an emoji!");
  
  return;
}


    const apiCall = fetch("/api/user/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, avatar: selectedEmoji }),
    }).then(async (res) => {
    const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Request failed");
  }

  return data;  
  
});

    toast.promise(apiCall, {
      pending: "Creating your identity...",
      success: {
        render({ data }) {


          //saving userId or userName
           localStorage.setItem("userId", data.user.uid);
           localStorage.setItem("userName", data.user.username);
  

          setTimeout(() => {
         router.push( `/user-profile/${data.user.username}`);  
        }, 2500); 

          return `Welcome: ${data.user.username}`;  
        },
      },
      error: {
        render({ data }) {
          return `Error: ${data.message}`;
        },
      },
    });
  };

  

  
  useEffect(()=>{

    const userName =localStorage.getItem("userName");

   
    if(userName){
      

      const check_user = async () => {

        let res = await fetch("/api/user/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username :userName }),
    })

    const data2 = await res.json();

    if(data2.success){

      router.push(`/user-profile/${data2.user.username}`)

    } 

    
      }

      check_user();
       
    }

  },[])



























































































































  return (
    <>
      <div className='page'>

          <div className='welcome'>
 <span>
  WELCOME
 </span>
          </div>

          <div className='sec'>
            <span>
              Create Your Anonymous Identity
            </span>
          </div>
             
             <div className='third'>

              
                     
               <div className="card">
 

            <div className='username'>

               <label className="block text-sm text-white/60 mb-2">Choose your username</label>
                
                 <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username..."
      
                />
               </div>
             

               

              <div className='useremoji'>

               
      


                
               <label className="block text-sm text-white/60 mb-2">Select Character</label>
                
                
                <div className='emoji'>  {
                    emojiOptions.map((emoji) => (

                      <span key={emoji}  onClick={() => setSelectedEmoji(emoji)  }   className="emoji-item" > {emoji} </span>
                    )
                  
                  
                  )


                  }</div>

                  </div>

               
               <div className='last'>
                    
                    <div className='select-emoji'>{selectedEmoji}</div>

                    <div className='doty'> : </div>
                    <div className='name'>{username}  </div >
                   

                  </div>


<Btn className="okay"  onClick={handleSubmit} />
                       
              
  
                  </div>



                   
                

 


             </div>

 
 
      </div>

    </>
  )
}

export default page
