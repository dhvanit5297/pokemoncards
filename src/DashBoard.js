import React, { useState } from "react";
import Header from "./Header";
import Cards from "./Cards";


function DashBoard() {

const [msg,setMsg]=useState('')

  const handleMsg=()=>{
    setMsg("Clicked")
  }

  
  return (
    <>
      <Header onClick={handleMsg}></Header>
      <Cards msg={msg}></Cards>
    </>
  );
}

export default DashBoard;
