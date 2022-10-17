import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { db } from '../db';
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';

export function Edit() {
  const [record, setRecord] = useState({});
  const [inEnglish, setInEnglish] = useState();
  const [inPortuguese, setInPortuguese] = useState();
  const [status, setStatus] = useState('');

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
      // Edit word/phrase!
      const updateWords = await db.wordsAndPhrases.update(parseInt(id), {
        inEnglish,
        inPortuguese
      });

      navigate('/ListRecords');
    } catch (error) {
      setStatus(`Failed to add ${inEnglish}: ${error}`);
    }
  }

  return (
    <>
      <div className="min-h-screen">
        <Header />
        <p className="pt-6">{status}</p>
        <div className="pt-12">
          <div className="form-control">
            <label className="justify-center input-group input-group-lg p-2 sm:px-8 lg:p-8">
              <span className="font-bold text-[18px] tracking-wider p-px w-20 xxs:p-1 xs2:w-28 sm:w-1/4 sm:p-3">
                Em inglês:
              </span>
              <textarea
                type="text"
                placeholder="Digite aqui sua palavra ou frase…"
                className="input input-bordered input-lg min-h-[80px] p-1 w-3/4 sm:p-2"
                ref={inputEnglish}
                onSelect={(ev) => setInEnglish(ev.target.value)}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="justify-center input-group input-group-lg p-2 sm:px-8 lg:p-8">
              <span className="font-bold text-[18px] tracking-wider p-px w-20 xxs:p-1 xs2:w-28 sm:w-1/4 sm:p-3">
                Em português:
              </span>
              <textarea
                type="text"
                placeholder="Digite aqui sua palavra ou frase…"
                className="input input-bordered input-lg min-h-[80px] p-1 w-3/4 sm:p-2"
                ref={inputPortuguese}
                onSelect={(ev) => setInPortuguese(ev.target.value)}
              />
            </label>
          </div>
          <div className="p-6">
            <button className="btn btn-outline btn-success m-2 p-2" onClick={updateWords}>
              CONFIRMAR
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
