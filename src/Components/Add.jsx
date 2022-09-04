import React, { useState } from 'react'
import { db } from "../db";
import { useParams, useNavigate} from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import './Add.css'

export function Add() {
  
  const [ inEnglish , setInEnglish ] = useState([""]);
  const [ inPortuguese , setInPortuguese ] = useState([""]);
  const [ toShow, setToShow ] = useState(false);
  const [ status, setStatus ] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

    async function addWordsPhrases() {
        try {
        // Add the new word/phrase!
        const id = await db.wordsAndPhrases.add({ 
            inEnglish,
            inPortuguese,
            toShow
        });

        setStatus(`Último registro adicionado com sucesso: ' ${inEnglish}'. Tradução: ' ${inPortuguese}'`);        
        setToShow(false); 
        setInEnglish("");
        setInPortuguese("");
        } catch (error) {
        setStatus(`Falha para adicionar: ${inEnglish}: ${error}`);
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
                        value={inEnglish}
                        onChange={ev => setInEnglish(ev.target.value)}/>
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
                        value={inPortuguese}
                        onChange={ev => setInPortuguese(ev.target.value)}/>
                </label>
            </div>
            <button className="btn btn-outline btn-error btn-cancel" onClick={() => navigate("/Study-list")}>CANCELAR</button>
            <button className="btn btn-outline btn-success btn-add" onClick={addWordsPhrases}>ADICIONAR</button>
            <button className="btn btn-outline btn-info btn-my-list" onClick={() => navigate("/Study-list")}>MINHA LISTA</button>
            
        </div>
        < Footer />
        
        
    </>
}

