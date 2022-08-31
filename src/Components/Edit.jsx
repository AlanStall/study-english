import React, { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { db } from "../db";
import { Header } from "./Header";
import './Edit.css'

export function Edit() {
  const [record, setRecord] = useState({});
  const [inEnglish, setInEnglish] = useState();
  const [inPortuguese, setInPortuguese] = useState();  
  const [status, setStatus] = useState("");   

  const { id } = useParams();
  const navigate = useNavigate();

  let inputEnglish = useRef();
    useEffect(() => {
      inputEnglish.current.value = record.inEnglish;                  
    }, [record.inEnglish]);

  let inputPortuguese = useRef();
  useEffect(() => {
    inputPortuguese.current.value = record.inPortuguese;
  }, [record.inPortuguese]);

  useEffect(() => {
    db.transaction('r', [db.wordsAndPhrases], async () => {
      const upRecord = await db.wordsAndPhrases.get(parseInt(id));
      setInEnglish(upRecord.inEnglish);
      setInPortuguese(upRecord.inPortuguese);   
      setRecord(upRecord);  
    });
  }, []);


  async function updateWords() {
    try {      
      const updateWords = await db.wordsAndPhrases
      .update(parseInt(id), {
          inEnglish,
          inPortuguese,
      });
      
      navigate("/Study-list")
    } catch (error) {
      setStatus(`Failed to add ${inEnglish}: ${error}`);
    }    
  }

  return <>
    <p>
      < Header />
      {status}
    </p>
    
    Palavra ou Frase: 
    <input       
      ref={inputEnglish}      
      id="form-input-english" 
      type="text"      
      onSelect={ev=>setInEnglish(ev.target.value)}
    />
    <br></br>
    <br></br>
    Tradução:
    <input      
      ref={inputPortuguese}       
      id="form-input-portuguese" 
      type="text"
      onSelect={ev => setInPortuguese(ev.target.value)}
    />
    
    <br></br>
    <br></br>
    <button onClick={() => navigate("/Study-list")}>CANCELAR</button>
    <br></br>
    <br></br>    
    <button onClick={updateWords}>CONFIRMAR</button>
    <br></br>
    <br></br>
    <hr></hr>
    
  </>
}