import React from 'react'
import "./logo.css";

function logo({ className }) {
  return (

    <div className={className}>
 
    <div className='ani' style={{height:"120px" , width:"120px"  ,borderRadius:"80px", position:"relative"}}> 
     
     <img src="logo.svg" alt="" style={{position:"relative"
      , top:"-30px",
      left:"-38px"
     }}/>
       </div>
    </div>
  )
}

export default logo
