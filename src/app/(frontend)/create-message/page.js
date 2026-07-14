"use client"
import "./create-message.css";  
 
import { toast } from 'react-toastify'; 

import Sendermsg from "@/app/component/sendermsg";
import NewSender from "@/app/component/newSender";

import EmptyMsg from "@/app/component/emptyMsg";
import React, { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation";




 function CreateMessageContent() {

 
   ///reciver usernmae 
   
const router = useRouter(); 
const searchParams = useSearchParams();
 const reciver = searchParams.get("user");
 

useEffect(() => {
  const user = searchParams.get("user");

  if (!user) {
    router.replace("/not-found");
    return;
  }
}, []);




   
   ////sender username 
   const [sender, setSender] = useState("");
 
   useEffect(() => {
  const senderName = localStorage.getItem("senderId");

  if (senderName) {
    setSender(senderName);
  }
}, []);






   const [showPast, setShowPast] = useState(false);

   
   const [login, setlogin] = useState(false);

   const [message, setmessage] = useState([]);


   const [Createmsg ,setCreatemsg ] = useState("");


   
 





useEffect(()=>{
 
 if (!sender) return;

  //console.log("sender:", sender);

 
 
   
    if(sender){
      
    

      const check_user = async () => {


        try{

        let res = await fetch("/api/sender/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username : sender }),
    })

    const data2 = await res.json();

     
    if(data2.success){
 
       setlogin(true);

    } 
  
  }catch (error) {
    console.error(error);
  } 

    
      }

      check_user();
       
    }

  },[sender])



//////////////////// pastmessage handle check

   const pastmessage = async () =>{

    toast('Processing for past messages!', {
position: "top-right",
autoClose: 1000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: false,
draggable: true,
progress: undefined,
theme: "dark",
 
}); 


setShowPast(true);


 
             
        

          const apiCall = fetch(`/api/sender/message?uid=${sender}`,
      {
        method: "GET",
      }
    ).then(async (res) => {
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch messages");
      }

      setmessage(data.messages);
      //console.log(data.messages)

      return data;
    })





    ///////////////////
 
  toast.promise(apiCall, {
    pending: `Loading messages...`,
    success: {
      render({ data }) {
        
        return `${data.messages.length} messages loaded`;
      },
    },
    error: {
      render({ data }) {
        return data.message || "Something went wrong";
      },
    },
  });
 

          
 

   }






/////////////////////////////////////////////////
//////////////  sent message api handle   ///////

     const sendmessage = async()=>{


      //console.log(sender)


           const sentmsg = fetch("/api/message/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username : reciver,
    message :Createmsg,
    senderId : sender,
  }),
}).then(async (res) => {
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to sent message");
      }
 
      //console.log(data.message)

      return data;
    })











      toast.promise(sentmsg, {
    pending: `Sending messages...`,
    success: {
      render({ data }) {
        
        return `${data.message}`;
      },
    },
    error: {
      render({ data }) {
        return data.message || "Something went wrong";
      },
    },
  });







     }






































   
    
  return (

 
    <div>

{ login === false ? ( 
  
  
  <div className="login">

<NewSender login={login} setlogin={setlogin} setSender={setSender} />


  </div>















































) : (
        <div className="ful-pa">


            



              <div className="anony"> <span>Confify Anonymous Messanger </span></div>




               <div className="create-msg">


                <div className="container_chat_bot">
  <div className="container-chat-options">
    <div className="chat">
      <div className="chat-bot">
        <textarea
          id="chat_bot"
          name="chat_bot"
          placeholder="Create Yours message...✦˚"

          value={Createmsg}
  onChange={(e) => setCreatemsg(e.target.value)}
        ></textarea>
      </div>
      <div className="options">
        <div className="btns-add">
      
         
          <button className="love" onClick={pastmessage}>
            <svg
              viewBox="0 0 24 24"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.01 8.01 0 0 0 5.648 6.667M10.03 13c.151 2.439.848 4.73 1.97 6.752A15.9 15.9 0 0 0 13.97 13zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.01 8.01 0 0 0 19.938 13M4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333A8.01 8.01 0 0 0 4.062 11m5.969 0h3.938A15.9 15.9 0 0 0 12 4.248A15.9 15.9 0 0 0 10.03 11m4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.01 8.01 0 0 0-5.648-6.667"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
        <button className="btn-submit"  onClick={sendmessage}>
          <i>
            <svg viewBox="0 0 512 512">
              <path
                fill="currentColor"
                d="M473 39.05a24 24 0 0 0-25.5-5.46L47.47 185h-.08a24 24 0 0 0 1 45.16l.41.13l137.3 58.63a16 16 0 0 0 15.54-3.59L422 80a7.07 7.07 0 0 1 10 10L226.66 310.26a16 16 0 0 0-3.59 15.54l58.65 137.38c.06.2.12.38.19.57c3.2 9.27 11.3 15.81 21.09 16.25h1a24.63 24.63 0 0 0 23-15.46L478.39 64.62A24 24 0 0 0 473 39.05"
              ></path>
            </svg>
          </i>
        </button>
      </div>
    </div>
  </div>
   
</div>




               </div>


                   {showPast && (
          <>
            <span className="pas">Your Past Messages </span>
            <div className="past-msg">
              


              {message.length === 0 ? (
  <div className="emptymsg"> <EmptyMsg/> </div>
) : (
  message.map((msg) => (
    <Sendermsg
      key={msg._id}
      message={msg}
    />
  ))
)}
            
            </div>
          </>
        )}

 
        </div>

        )}
      
    </div>
  )
}




export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateMessageContent />
    </Suspense>
  );
}
