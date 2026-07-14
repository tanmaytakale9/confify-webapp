"use client"

import React, { Suspense } from 'react'
import "./user-anaylis.css"; 
import Image from 'next/image';
import html2canvas from "html2canvas";
import Share from '@/app/component/share';
import Sharingcard from '@/app/component/sharingcard';


import { toast } from 'react-toastify';

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation";





function UserAnalysisContent() {




const router = useRouter(); 
const searchParams = useSearchParams();
 const user = searchParams.get("user");

 const [USER, setUSER] = useState({});
 const [userRank,setuserRank]=useState("");

 const [userdetail , setuserdetail] = useState({});

 const [rankers , setrankers] =useState([]);

 const [mystreak ,setmystreak] =useState("");








 
 
     useEffect(()=>{

if (!user) {
    router.replace("/not-found");
    return;
  }
 
         
 
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
 
 
            setUSER(userData.user);








            const [streakRes, rankRes, analysisRes, leaderboardRes] =
  await Promise.all([
    fetch("/api/leaderboard/streak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: userData.user.uid }),
    }),

    
    fetch(`/api/leaderboard/rank?uid=${userData.user.uid}`),

    fetch(`/api/leaderboard/anaylis?uid=${userData.user.uid}`),
    fetch(`/api/leaderboard/week`)
  ]);


  const [streakData, rankData, analysisData,leaderboardData] =
  await Promise.all([
    streakRes.json(),
    rankRes.json(),
    analysisRes.json(),
    leaderboardRes.json()
  ]);

 
      if(streakData.success){


        if(!streakData.message === "same day"){

          toast('🔥 Streak updated!', {
position: "top-right",
autoClose: 1000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: false,
draggable: false,
progress: undefined,
theme: "dark"
});  
        }
           

 setmystreak(streakData.streak);

      }
      





      ////////call third api here

 
     if(rankData.success){
      setuserRank(rankData.rank);
     }




     /////////calll 4th api

 

     if(analysisData.success){
      
      setuserdetail(analysisData.analytics);
     }
     ///////

     if (leaderboardData.success) {
  setrankers(leaderboardData.leaderboard);

     toast('leaderboard updated!📊', {
position: "top-right",
autoClose: 1000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: false,
draggable: false,
progress: undefined,
theme: "dark"
});

}


 
 
      
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
 

   

      const downloadCard = async () => {

   const card =
     document.getElementById("sharecard2");

   const canvas =
     await html2canvas(card, {
       scale: 2
     });

   const image =
     canvas.toDataURL("image/png");

   const link =
     document.createElement("a");
   link.href = image;

  link.download =
     "confify-profile.png";

   link.click();

 };















































































  return (
    <div>

        <div className='ful-pa'>
       

            <div className='navbar'>

                <div className='brand'>
                    <p>

                       <Image
        src="/logo.svg"    
        alt="logo image"   
        width={70}          
        height={80}
         loading="eager"           
      />
                    </p>
                    <span>Confify</span>

                     
                     
                </div>

                <div className='share'>  <Share  onClick={downloadCard}  /> </div>

            </div>


            <div    className='glassmos'>

                <div className='emo'> <span>{USER.avatar}</span></div>

                <div className='user'> <span>@{USER.username}</span></div>

                <div className='user-det'>

                    <div className='streak'> <p>Streak</p> 
                        
                        <span className='st2'> 
                            <Image  
        src="/streak.svg"    
        alt="Example image"   
        width={40}           
        height={40}          
      />    <span>{mystreak}</span>
      
      </span>
                        

                        </div>

                    <div className='rank'>
                        <p>Rank</p> 
                        
                        <span className='ra2'> 
                            <Image  
        src="/rank.svg"    
        alt="Example image"   
        width={40}           
        height={40}          
      />    <span>{userRank}</span>
      
      </span>

                    </div>

                </div>


            </div>

 

            <div className='second'>

                <div className="card-container1">        
                    
                    <Image  
        src="/total-msg.svg"    
        alt="Example image"   
        width={45}           
        height={45}          
       className='pos-img'/> 
       

      <span className='msgdata'>{userdetail.totalMessages}</span>

      <span className='underline'>Total Messages</span>
      
       </div>


                <div className="card-container1">
                     <Image  
        src="/dyn-heart.svg"    
        alt="Example image"   
        width={45}           
        height={45}          
       className='pos-img'/> 
       

      <span className='msgdata'>{userdetail.totalHearts}</span>

      <span className='underline'>Total Heart Given</span>
                </div>

                <div className="card-container1">

 <Image  
        src="/week-msg.svg"    
        alt="Example image"   
        width={45}           
        height={45}          
       className='pos-img'/> 
       

      <span className='msgdata'>{userdetail.weeklyMessages}</span>

      <span className='underline'>This Week</span>

                </div>

                <div className="card-container1">


 <Image  
        src="/seen-eyes.svg"    
        alt="Example image"   
        width={45}           
        height={45}          
       className='pos-img'/> 
       

      <span className='msgdata'>{userdetail.seenMessages}</span>

      <span className='underline'>Seen Message</span>

                </div>

            </div>




            <div className='thirdd'>


                <div className='up'>

                    <p className='trop'>  
 <Image  
        src="/notelet.svg"    
        alt="Example image"   
        width={30}           
        height={30}          
        /></p> <span className='top10'>Top-10 this week </span>

                    <span className='st'> <div className='loadd'></div> <span>  Live </span> </span>

                </div>



                <div className='part2'>



                      <div className='one'>
                         
                         <div className='rankbox'>1</div>

                         <div className='emojibox'>{rankers[0]?.avatar ? rankers[0].avatar : "" }

                         </div>

                         <div className='user'>@{rankers[0]?.username ? rankers[0].username : "" }</div>


                         <div className='ra-las'>

                                  <span>{rankers[0]?.totalMessages ? rankers[0].totalMessages : ""}</span>
                
                                     <p>Total Message</p>
                         </div>
                         
                         
                          </div>



                            <div className='one'>
                         
                         <div className='rankbox'>2</div>

                         <div className='emojibox'>{rankers[1]?.avatar ? rankers[1].avatar : "" }

                         </div>

                         <div className='user'>@{rankers[1]?.username ? rankers[1].username : "" }</div>


                         <div className='ra-las'>

                                  <span>{rankers[1]?.totalMessages ? rankers[1].totalMessages : ""}</span>
                
                                     <p>Total Message</p>
                         </div>
                         
                         
                          </div>
 

                            <div className='one'>
                         
                         <div className='rankbox'>3</div>

                         <div className='emojibox'>{rankers[2]?.avatar ? rankers[2].avatar : "" }

                         </div>

                         <div className='user'>@{rankers[2]?.username ? rankers[2].username : "" }</div>


                         <div className='ra-las'>

                                  <span>{rankers[2]?.totalMessages ? rankers[2].totalMessages : ""}</span>
                
                                     <p>Total Message</p>
                         </div>
                         
                         
                          </div>

                            <div className='one'>
                         
                         <div className='rankbox'>4</div>

                         <div className='emojibox'>{rankers[3]?.avatar ? rankers[3].avatar : "" }

                         </div>

                         <div className='user'>@{rankers[3]?.username ? rankers[3].username : "" }</div>


                         <div className='ra-las'>

                                  <span>{rankers[3]?.totalMessages ? rankers[3].totalMessages : ""}</span>
                
                                     <p>Total Message</p>
                         </div>
                         
                         
                          </div>



                            <div className='one'>
                         
                         <div className='rankbox'>5</div>

                         <div className='emojibox'>{rankers[4]?.avatar ? rankers[4].avatar : "" }

                         </div>

                         <div className='user'>@{rankers[4]?.username ? rankers[4].username : "" }</div>


                         <div className='ra-las'>

                                  <span>{rankers[4]?.totalMessages ? rankers[4].totalMessages : ""}</span>
                
                                     <p>Total Message</p>
                         </div>
                         
                         
                          </div>




                            <div className='one'>
                         
                         <div className='rankbox'>6</div>

                         <div className='emojibox'>{rankers[5]?.avatar ? rankers[5].avatar : "" }

                         </div>

                         <div className='user'>@{rankers[5]?.username ? rankers[5].username : "" }</div>


                         <div className='ra-las'>

                                  <span>{rankers[5]?.totalMessages ? rankers[5].totalMessages : ""}</span>
                
                                     <p>Total Message</p>
                         </div>
                         
                         
                          </div>




                            <div className='one'>
                         
                         <div className='rankbox'>7</div>

                         <div className='emojibox'>{rankers[6]?.avatar ? rankers[6].avatar : "" }

                         </div>

                         <div className='user'>@{rankers[6]?.username ? rankers[6].username : "" }</div>


                         <div className='ra-las'>

                                  <span>{rankers[6]?.totalMessages ? rankers[6].totalMessages : ""}</span>
                
                                     <p>Total Message</p>
                         </div>
                         
                         
                          </div>




                            <div className='one'>
                         
                         <div className='rankbox'>8</div>

                         <div className='emojibox'>{rankers[7]?.avatar ? rankers[7].avatar : "" }

                         </div>

                         <div className='user'>@{rankers[7]?.username ? rankers[7].username : "" }</div>


                         <div className='ra-las'>

                                  <span>{rankers[7]?.totalMessages ? rankers[7].totalMessages : ""}</span>
                
                                     <p>Total Message</p>
                         </div>
                         
                         
                          </div>

                            <div className='one'>
                         
                         <div className='rankbox'>9</div>

                         <div className='emojibox'>{rankers[8]?.avatar ? rankers[8].avatar : "" }

                         </div>

                         <div className='user'>@{rankers[8]?.username ? rankers[8].username : "" }</div>


                         <div className='ra-las'>

                                  <span>{rankers[8]?.totalMessages ? rankers[8].totalMessages : ""}</span>
                
                                     <p>Total Message</p>
                         </div>
                         
                         
                          </div>



                            <div className='one'>
                         
                         <div className='rankbox'>10</div>

                         <div className='emojibox'>{rankers[9]?.avatar ? rankers[9].avatar : "" }

                         </div>

                         <div className='user'>@{rankers[9]?.username ? rankers[9].username : "" }</div>


                         <div className='ra-las'>

                                  <span>{rankers[9]?.totalMessages ? rankers[9].totalMessages : ""}</span>
                
                                     <p>Total Message</p>
                         </div>
                         
                         
                          </div>



                </div>


            </div>



            <div className='unkstar1'>   <Image  
        src="/firstmed.svg"    
        alt="Example image"   
        width={35}           
        height={35}          
        /></div>

        <div className='unkstar2'>   <Image  
        src="/secmed.svg"    
        alt="Example image"   
        width={35}           
        height={35}          
        /></div>

        <div className='unkstar3'>   <Image  
        src="/thirdmed.svg"    
        alt="Example image"   
        width={35}           
        height={35}          
        /></div>



<Sharingcard id="sharecard2" className='displayno'  user={USER} userdetail={userdetail}  />


<button className="bttnn" onClick={()=>router.back()}>
  <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
  <span>Back</span>
</button>

        </div>

 
      
    </div>
  )
}


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserAnalysisContent />
    </Suspense>
  );
}