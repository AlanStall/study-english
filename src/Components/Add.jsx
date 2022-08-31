import React, { useState } from 'react'
import { db } from "../db";
import { useParams, useNavigate} from "react-router-dom";
import { Header } from "./Header";
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

        setStatus(`' ${inEnglish} ' adicionado com sucesso. Tradução adicionada é ' ${inPortuguese} '`);        
        setToShow(false); 
        setInEnglish("");
        setInPortuguese("");
        } catch (error) {
        setStatus(`Falha para adicionar: ${inEnglish}: ${error}`);
        }
    }

    return <>
        <p>
        < Header />
        {status}
        </p>
        <br></br>
        Palavra ou Frase:
        <input
        className="input-word"
        type="text"
        id="input-word-english"
        value={inEnglish}
        onChange={ev => setInEnglish(ev.target.value)}
        />
        <br></br>
        <br></br>
        Tradução:
        <input
        className="input-translation"
        type="text"
        id="input-word-portuguese"
        value={inPortuguese}
        onChange={ev => setInPortuguese(ev.target.value)}
        />
        <br></br><br></br>
        <button onClick={() => navigate("/Study-list")}>CANCELAR</button>
        <br></br>        
        <br></br>
        <button onClick={addWordsPhrases}>ADICIONAR</button>
        <br></br>
        <br></br>
        <hr></hr>
    </>
}

