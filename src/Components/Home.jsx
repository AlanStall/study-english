import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './Pronunciation.css'

export function Home() {
  
  const navigate = useNavigate();
  

  return (
    <>
        <h1>APLICAÇÃO PARA ESTUDAR INGLÊS</h1>
        <br></br>
        <div>            
            <button onClick={() => navigate("/Pronunciation")}>PRATICAR PRONÚNCIA</button><br></br>            
            <br></br>
            <button onClick={() => navigate("/Study-list")}>MINHA LISTA</button><br></br>
        </div>      
    </>
  )
}