import React from 'react'
import { useNavigate } from "react-router-dom";
import './Header.css'
import backgroundHeader from "../../public/rawad-semaan-unsplash.webp";

export function Header() {
  
  const navigate = useNavigate();
  

  return (
    <>
    
    <div className="buttons-header" style={{backgroundImage: `url(${backgroundHeader})`}}>      
      <button className="btn-sm btn-success btn-start" onClick={() => navigate("/")}>INÍCIO</button>
      <button className="btn-sm btn-success btn-training" onClick={() => navigate("/Pronunciation")}>PRATICAR PRONÚNCIA</button>         
      <button className="btn-sm btn-success btn-list" onClick={() => navigate("/Study-list")}>MINHA LISTA</button>
    </div>    
    
    </>
  )
}