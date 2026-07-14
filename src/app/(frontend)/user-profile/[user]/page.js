 

"use client"
import React, { useEffect } from 'react'
import "./user-porfile.css";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation"; 
import Image from "next/image";
import Copybtn from '@/app/component/copybtn';
import Toggle from '@/app/component/toggle';
import Hovi from '@/app/component/hovi';

import { toast } from 'react-toastify';



function page() {

    const router = useRouter();

    const {user} =useParams(); 

     

   

     const [username , setusername] = useState("");

      const [useremoji , setuseremoji] = useState("");

       const [accept_msg , setaccept_msg] =useState(true);



    useEffect(()=>{

        

  const user_info = async () => {

  try {
    const res = await fetch("/api/user/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user }),
    });

    const userData = await res.json();

     

    if (userData.success) {





        let RealUsername = localStorage.getItem("userName");
        let RealUserid = localStorage.getItem("userId");
 

        if((RealUsername !== user ) && (userData.user.uid !== RealUserid)){
        router.push("/log-in");
          return;
    }



      setusername(userData.user.username);
      setuseremoji(userData.user.avatar);
      setaccept_msg(userData.user.receiveMessages);

     
    } else {
      router.push("/log-in");
    }
  } catch (error) {
    console.error(error);
    router.push("/log-in");
  }
};

        user_info();

    },[])


   const userlink =`confify-webapp.vercel.app/create-message?user=${username}`;
   




// checking msg accept or not with api

    

        const toggle =  async () => {
        

             const newValue = !accept_msg;

            setaccept_msg(newValue);
            
        
        
            const apiCall = fetch("/api/user/toggleMsg", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username,  receiveMessages:newValue }),
            }).then(async (res) => {

            const data = await res.json();
         
          return data;  
          
        });
        
            toast.promise(apiCall, {
              pending: "Updating...",
              success: {
                render({ data }) {
        
                     
        return `${data.message}`;    
                   
    
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


<div className='full'>

   

    <div className='navi'>

<div className='set'>
    <div >Settings</div>
    
</div>

<div className='msg-logo'>

     <Image className='inbo' 
               src="/msg.svg"  
               alt="User avatar"
               width={50}
               height={50}
                onClick={()=>{
                  router.push(`/dashboard/${username}`);
                }}/>
</div>


    </div>

    <div className='pres'>Manage Your Presence</div>




    <div className='seco'>


        <div className='user-details'>
             
            <div className='use-fir'>

                <span>   <Image className='profile' 
                               src="/profile.svg"  
                               alt="User avatar"
                               width={30}
                               height={30}
                                /> </span>

                                <span className='use-fir-name'>Your Anonymous Identity</span>

            </div>

            <div className='use-sec'>

                <div className='use-emoj'> <span>{useremoji}</span></div>
                <span style={{fontSize:"30px", color:"white"}}> :</span>
                <div className='use-name'>@{username}</div>

            </div>

        </div>

        <div className='msg-set'></div>


                  <div className='msg'>

                <span>   <Image className='profile' 
                               src="/set.svg"  
                               alt="User avatar"
                               width={30}
                               height={30}
                                /> </span>

                                <span className='use-fir-name'>Message Settings</span>

            </div>

            <div className='accept'>

                <div className='ace-msg'>

                   <p>Accept Message</p>
                    <span>Aollw people to send message</span>
                </div>
                <div className='acpt-btn'>
                    <Toggle
 checked={accept_msg}
  onChange={toggle}
/>
                </div>

            </div>


            <div className='user-link'>

                <div className='link'> <Image className='profile' 
                               src="/link.svg"  
                               alt="User avatar"
                               width={30}
                               height={30}
                                />
                                

                                <span>Your Link</span>
                                
                                
                                </div>


<div className='link2'>

    <span>{userlink}</span>

    <Copybtn  text={userlink}/>

</div>
                                 

            </div>



    </div>

   <div className='last-mess' onClick={() => router.push(`/user-anaylis?user=${username}`)}><Hovi/></div>

</div>
       
      
    </>
  )
}

export default page
