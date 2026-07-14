"use client"

import React, { useEffect, useState } from 'react'
import "./dashboard.css";
import MsgCard from '@/app/component/msgCard';
  
import Msg_not_found from '@/app/component/msg_not_found';

import { useParams, useRouter, useSearchParams } from "next/navigation"; 

import Image from "next/image";
import { toast } from 'react-toastify';
import { updateTag } from 'next/cache';

import MsgLoad from '@/app/component/msgLoad';
import EmptyMsg from '@/app/component/emptyMsg';



function page() {

//   const searchParams = useSearchParams();
// const uid = searchParams.get("uid");
//  console.log(uid);

   const router = useRouter();


    const [selectedPlan, setSelectedPlan] = useState("silver");

//     useEffect( ()=>{


//       const getData = async () => {
    
//         const apiCall = await fetch("/api/user/check", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(uid),
//     });
         
//         const data =  await apiCall.json();
//         console.log(data);

//         if(data.success){

//             toast.success(`welocme : ${data.username}`, {
// position: "top-right",
// autoClose: 2000,
// hideProgressBar: false,
// closeOnClick: false,
// pauseOnHover: true,
// draggable: true,
// progress: undefined,
// theme: "light",
 
// });

//         }else{

//                  toast.warn(`error: ${data.message}`, {
// position: "top-right",
// autoClose: 2000,
// hideProgressBar: false,
// closeOnClick: false,
// pauseOnHover: true,
// draggable: true,
// progress: undefined,
// theme: "light",
 
// });

// router.push('./log-in')

//         }

       

//   };

//   getData();



//     },[])



 
 
const params = useParams();

const user = params.user;
 
const [msgmode, setmsgmode] =useState("seen");
const [fetchMsg , setfetchMsg] = useState([]); 

const [loader ,setloader] = useState(false);




    useEffect(()=>{

        

  const user_info = async () => {

   
  try {

 /////////loader active
      setloader(true);

    const res = await fetch("/api/user/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( {username : user} ),
    });

    const userData = await res.json();
 

    if (userData.success) {





        let RealUsername = localStorage.getItem("userName");
        let RealUserid = localStorage.getItem("userId");

        if((RealUsername !== user )&& (userData.user.uid !== RealUserid)){
        router.push("/log-in");

    }



     //// fetching messages 




     try{

          const result = await fetch(
  `/api/user/fetchmsg?uid=${userData.user.uid}`,
  {
    method: "GET",
  }
);   
     
    const result_data = await result.json();

    //console.log(result_data);

    if(result_data.success){

      ///saving mgs
      setfetchMsg(result_data.messages);
       
       //console.log(fetchMsg);




    }else{

      console.log(result_data.message);
    }
     








     

     }
     catch (error) {
    console.error(error);
    router.push("/log-in");
  }
       














     
    } else {
      console.log(userData.message)
      router.push("/log-in");
    }
  } catch (error) {
    console.error(error);
    router.push("/log-in");
  }finally{
    setloader(false);
  }
};

        user_info();

    },[])

 


      useEffect(()=>{


       


  
          const fetchMessagesonMode = async (mode) => {
 
          
            try{ 

              setloader(true);

         let RealUserid = localStorage.getItem("userId");

        

          const apiCall = fetch(
      mode === "seen"
        ? `/api/user/fetchmsg?uid=${RealUserid}`
        : `/api/user/notSeenMsg?uid=${RealUserid}`,
      {
        method: "GET",
      }
    ).then(async (res) => {
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch messages");
      }

      setfetchMsg(data.messages);

      return data;
    })


  toast.promise(apiCall, {
    pending: `Loading ${mode} messages...`,
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
 

          
 
     
}catch(error){
  console.log(error)

}finally{

  setloader(false);
}
}

        fetchMessagesonMode(msgmode);



      },[msgmode]);















































































 





    
  return (
    <>
 
    <div className='fullpage'> 

         <div className='navbar'>

            <div className='navfirst'>

                <div className='log-img'>
                
                 <Image 
        src="/logo.svg"  
        alt="User avatar"
        width={75}
        height={75}
      />

                </div>

                <div className='brand-name'>CONFIFY
                   

                </div>
            </div>

            <div  >

                <div>  
                    <Image className='profile' 
               src="/profile.svg"  
               alt="User avatar"
               width={35}
               height={35}
                onClick={()=>{
                  const username = localStorage.getItem("userName");

                   router.push(`/user-profile/${username}`);
                 // router.push(`/user-profile/${localStorage.getItem("userName")}`);
                }}/>

                </div>

                <span className='edit'>
                    Edit Profile
                </span>
            </div>

         </div>



         <div className='inbox'>Messages</div>

         <div className='category'>

    <div className="glass-radio-group">
   
<input
  type="radio"
  name="plan"
  id="glass-silver"
  checked={selectedPlan === "silver"}
  onChange={() =>{ setSelectedPlan("silver");
                   setmsgmode("seen")
  }}
/>

  <label  htmlFor="glass-silver">Seen</label>

 
<input
  type="radio"
  name="plan"
  id="glass-gold"
  checked={selectedPlan === "gold"}
  onChange={() => {setSelectedPlan("gold");
                         setmsgmode("unseen")}}
/>

  <label htmlFor="glass-gold">Unseen</label>
 

  <div className="glass-glider"></div>

</div>

         </div>


         <div className='All-msg'>




                     
                     {
                   

                    loader ? (
                          <MsgLoad />
                           ) : fetchMsg.length === 0 ? (

                             <EmptyMsg />   //other option <Msg_not_found/>

                            ) : (



                              /////fetching all messgaes here 
                             fetchMsg.map((msg) => (


                             <MsgCard
                             key={msg._id}
                           message={msg} />
                             
                           ))
                           )

                      


                     }
                  
                     
                     
                     
                              </div>

          




    </div>
      
    </>
  )
}

export default page
