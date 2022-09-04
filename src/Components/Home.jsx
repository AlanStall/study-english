import React from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css';
import background from "../../public/chris-dickens-unsplash-0.webp";

export function Home() {
  
  const navigate = useNavigate();
  
  return (
    <div className="hero min-h-screen" id="background" style={{backgroundImage: `url(${background})`, Height: "90%" }}>
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="title font-bold">STUDY ENGLISH</h1>
          <br></br>
          <button className="btn btn-primary btn-01" onClick={() => navigate("/Pronunciation")}>PRATICAR PRONÚNCIA</button>          
          <button className="btn btn-primary btn-02" onClick={() => navigate("/Study-list")}>MINHA LISTA</button>    
                
        </div>        
      </div>       
    </div>
  )
}