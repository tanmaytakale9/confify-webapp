import React from 'react'
 import "./Sendermsg.css"
import Likebtn2 from './likebtn2'
 

function sendermsg({ message }) {

  
  return (
    <div>
      
      
<div className="card">
  <div className="bg">
    <div className='data'>
      <div className='sender'>

        <span className='emoji'>
          
         <span>{message.toAvatar}</span> 

                  </span>

        <span className='sender-name'>{`to  :  ${message.toUsername}`}</span>

         

      </div>

      <div className='message'>{message.message}

      </div>

<div className='creatmsg909'>
        <p>{new Date(message.createdAt).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}</p>
           
       <Likebtn2  className='reaction' reaction={message.reaction}/> 

 </div>


    </div>
  </div>
  <div className="blob"></div>
</div>



   
</div>



 
  )
}

export default sendermsg
