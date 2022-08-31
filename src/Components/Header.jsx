import React from 'react'
import { useNavigate } from "react-router-dom";
import './Header.css'

export function Header() {
  
  const navigate = useNavigate();
  

  return (
    <>
    <br></br>
    <hr></hr>
    <br></br>
    
    <button onClick={() => navigate("/")}>INÍCIO</button>   
    
    <button onClick={() => navigate("/Study-list")}>MINHA LISTA</button>

    <button onClick={() => navigate("/Pronunciation")}>PRATICAR PRONÚNCIA</button>
    
    <br></br>
    <br></br>
    <hr></hr>
    <br></br>
    </>
  )
}