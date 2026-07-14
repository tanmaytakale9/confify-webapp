import React from 'react'
 import "./toggle.css"
function toggle({ checked, onChange }) {
  return (
   <div >

     
      <div className="love">
        <input id="switch" type="checkbox"  checked={checked}
        onChange={onChange}/>
        <label className="love-heart" htmlFor="switch">
          <i className="left"></i>
          <i className="right"></i>
          <i className="bottom"></i>
          <div className="round"></div>
        </label>
      </div>
 
    </div>
  )
}

export default toggle
