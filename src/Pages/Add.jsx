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
        `Último registro adicionado com sucesso: ${inEnglish}. Tradução: ${inPortuguese}`
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
        <h1 className='font-bold text-[12px] sm:text-[16px] p-4'>ADICIONE SUAS PALAVRAS OU FRASES, EM INGLÊS E PORTUGUÊS</h1>
        <p className="pt-2">{status}</p>
        <div className="pt-2">
          <div className="form-control">
            <label className="justify-center input-group input-group-lg p-2 sm:px-8 lg:p-8">
              <span className="font-bold text-[12px] sm:text-[14px] tracking-wider p-px w-20 xxs:p-1 xs2:w-28 sm:w-1/4 sm:p-3">
                Em inglês:
              </span>
              <textarea
                type="text"
                placeholder="Digite aqui sua palavra ou frase…"
                className="input input-bordered input-lg min-h-[80px] p-1 w-3/4 text-[12px] sm:p-2 sm:text-[14px]"
                value={inEnglish}
                onChange={(ev) => setInEnglish(ev.target.value)}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="justify-center input-group input-group-lg p-2 sm:px-8 lg:p-8">
              <span className="font-bold text-[12px] sm:text-[14px] tracking-wider p-px w-20 xxs:p-1 xs2:w-28 sm:w-1/4 sm:p-3">
                Em português:
              </span>
              <textarea
                type="text"
                placeholder="Digite aqui sua palavra ou frase…"
                className="input input-bordered input-lg min-h-[80px] p-1 w-3/4 text-[12px] sm:p-2 sm:text-[14px]"
                value={inPortuguese}
                onChange={(ev) => setInPortuguese(ev.target.value)}
              />
            </label>
          </div>
          <div className="p-6">
            <button className="btn btn-outline btn-success btn-xs sm:btn-sm lg:btn-md m-2 p-1" onClick={addWordsPhrases}>
              ADICIONAR
            </button>
            <button
              className="btn btn-outline btn-error btn-xs sm:btn-sm lg:btn-md m-2 p-1"
              onClick={() => navigate('/ListRecords')}
            >
              CANCELAR
            </button>
            <button
              className="btn btn-outline btn-info btn-xs sm:btn-sm lg:btn-md m-2 p-1"
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
