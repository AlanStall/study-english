import React, { useState } from 'react';
import { db } from '../db';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';

export function Add() {
  const [inEnglish, setInEnglish] = useState(['']);
  const [inPortuguese, setInPortuguese] = useState(['']);
  const [toShow, setToShow] = useState(false);
  const [status, setStatus] = useState('');

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

      setStatus(
        `Último registro adicionado com sucesso: '${inEnglish}'. Tradução: '${inPortuguese}'`
      );
      setToShow(false);
      setInEnglish('');
      setInPortuguese('');
    } catch (error) {
      setStatus(`Falha para adicionar: ${inEnglish}: ${error}`);
    }
  }

  return (
    <>
      <div className="min-h-screen">
        <Header />
        <p className="pt-6">{status}</p>
        <div className="pt-12">
          <div className="form-control">
            <label className="justify-center input-group input-group-lg p-2 sm:px-8 lg:p-12">
              <span className="p-px w-20 xxs:p-1 xs2:w-28 sm:w-1/4 sm:p-3">Em inglês:</span>
              <textarea
                type="text"
                placeholder="Digite aqui sua palavra ou frase…"
                className="input input-bordered input-lg min-h-[80px] p-1 w-3/4 sm:p-2"
                value={inEnglish}
                onChange={(ev) => setInEnglish(ev.target.value)}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="justify-center input-group input-group-lg p-2 sm:px-8 lg:p-12">
              <span className="p-px w-20 xxs:p-1 xs2:w-28 sm:w-1/4 sm:p-3">Em português:</span>
              <textarea
                type="text"
                placeholder="Digite aqui sua palavra ou frase…"
                className="input input-bordered input-lg min-h-[80px] p-1 w-3/4 sm:p-2"
                value={inPortuguese}
                onChange={(ev) => setInPortuguese(ev.target.value)}
              />
            </label>
          </div>
          <div className="p-6">            
            <button className="btn btn-outline btn-success m-2 p-2" onClick={addWordsPhrases}>
              ADICIONAR
            </button>
            <button
              className="btn btn-outline btn-error m-2 p-2"
              onClick={() => navigate('/ListRecords')}
            >
              CANCELAR
            </button>
            <button
              className="btn btn-outline btn-info m-2 p-2"
              onClick={() => navigate('/ListRecords')}
            >
              MINHA LISTA
            </button>
          </div>
        </div>
      </div>
      <div className="tall:absolute inset-x-0 bottom-0">
        <Footer />
      </div>
    </>
  );
}
