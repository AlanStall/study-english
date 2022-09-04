import React, { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { db } from "../db";
import { Header } from "./Header";
import { Footer } from "./Footer";
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
        < Header />
        <div className="page-add">
            <p className="registered-message">
            {status}
            </p>
            <div className="input-add-english form-control">
                <label className="text-input-english input-group input-group-lg">
                    <span className="span-inEnglish">Em inglês:</span>                    
                    <input  
                      type="text" 
                      placeholder="Digite aqui sua palavra ou frase…" 
                      className="input input-bordered input-lg"
                      id="input-word-english"
                      ref={inputEnglish}
                      onSelect={ev=>setInEnglish(ev.target.value)}/>
                </label>
            </div>

            <div className="input-add-portuguese form-control">
                <label className="text-input-portuguese input-group input-group-lg">
                    <span className="span-inPortuguese">Em português:</span>                    
                    <input 
                        type="text" 
                        placeholder="Digite aqui sua palavra ou frase…" 
                        className="input input-bordered input-lg"
                        id="input-word-portuguese"
                        ref={inputPortuguese}
                        onSelect={ev => setInPortuguese(ev.target.value)}/>
                </label>
            </div>
            <button className="btn btn-outline btn-error btn-cancel" onClick={() => navigate("/Study-list")}>CANCELAR</button>
            <button className="btn btn-outline btn-success btn-add" onClick={updateWords}>CONFIRMAR</button>
            <button className="btn btn-outline btn-info btn-my-list" onClick={() => navigate("/Study-list")}>MINHA LISTA</button>
            
        </div>
        < Footer />
  </>
}

{/* 
    <p>
      < Header />
      {status}
    </p>
    
    Palavra ou Frase: 
    <textarea className="input-01"      
      ref={inputEnglish}      
      id="form-input-english" 
      type="text"      
      onSelect={ev=>setInEnglish(ev.target.value)}
    />
    <br></br>
    <br></br>
    Tradução:
    <textarea className="input-02"
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
    <br></br>
    < Footer /> */}
