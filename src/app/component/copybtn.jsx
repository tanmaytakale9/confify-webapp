
"use client";
import React from 'react'
import "./copybtn.css"
 

import { toast } from "react-toastify";

function copybtn({ text  }) {

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);

      toast.success("Link copied!");
    } catch (error) {
      toast.error("Failed to copy link");
      console.error(error);
    }
  };

  return (

    <div>
      <button className="Btn14" onClick={handleCopy}>
  <svg viewBox="0 0 512 512" className="svgIcon14" height="1em"><path d="M288 448H64V224h64V160H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64zm-64-96H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64z"></path></svg>
  <p className="text14">COPY</p>
  <span className="effect14"></span>
</button>

    </div>
  )
}

export default copybtn
