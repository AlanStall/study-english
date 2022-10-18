import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate } from 'react-router-dom';
import { db } from '../db';
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';

export function StudyRandom() {
  const [wordsRandom, setWordsRandom] = useState('');
  const [disabledRandom, setDisabledRandom] = useState(false);
  const [translateRandom, setTranslateRandom] = useState(false);
  const [displayRecords, setDisplayRecords] = useState('');
  const [mostrarAlert, setMostrarAlert] = useState(false);
  const [mensagemDelete, setMensagemDelete] = useState('');

  const navigate = useNavigate();

  const wordsPhrases = useLiveQuery(async () => {
    const wordsPhrases = await db.wordsAndPhrases.toArray();

    setWordsRandom(() => (wordsPhrases[0] === undefined ? '' : wordsPhrases[0]));
    setDisplayRecords(wordsPhrases.length);
    return wordsPhrases;
  });

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function randomWord() {
    return wordsPhrases[randomIntFromInterval(0, wordsPhrases.length - 1)];
  }

  function captureRandomWord() {
    if (wordsRandom === '') {
      alert('Não há palavras registradas. Por favor, adicione uma palavra ou frase.');
      return;
    }
    setWordsRandom(randomWord());
  }

  function sleep(ms) {
    return new Promise((result) => setTimeout(result, ms));
  }

  async function listenWordRandomUser() {
    if (wordsRandom === '') {
      alert('Não há palavras registradas. Por favor, adicione uma palavra ou frase.');
      return;
    }
    const speech = new SpeechSynthesisUtterance();
    speech.text = wordsRandom.inEnglish;
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
    await sleep(0);
    setDisabledRandom(true);
    await sleep(1000);
    setDisabledRandom(false);
  }

  function editWordsRandom() {
    if (wordsRandom === '') {
      alert('Não há palavras registradas. Por favor, adicione uma palavra ou frase.');
      return;
    } else {
      navigate(`/Edit/${wordsRandom.id}`);
    }
  }

  function deleteWords(word) {
    if (word === '') {
      alert('Não há palavras registradas. Por favor, adicione uma palavra ou frase.');
      return;
    }
    db.wordsAndPhrases
      .where('id')
      .equals(word.id)
      .delete()
      .then(function (deleteCount) {
        alert('Foi deletado' + deleteCount + ' item: ' + word.inEnglish);
        setMostrarAlert(!mostrarAlert);
      });
  }

  function alertDelete() {
    setMostrarAlert(true);
    setMensagemDelete('Você tem certeza que quer deleter este item?');
  }

  return (
    <>
      <section className="min-h-screen pb-0.5 overscroll-auto xs:pb-6">
        <Header />
        <div className="card bg-base-100 shadow-xl m-2 tracking-wider xs2:my-4 xs2:py-4 sm:mx-10 lg:mx-32">
          <div>
            <h2 className="font-bold text-[14px] xs:text-[24px]">MINHA LISTA</h2>
            <p className="text-[10px] xs:text-[14px] xs:font-bold">{`Itens adicionados:`}</p>
            <p className="font-bold text-blue-300 text-[12px] xs:text-[16px] sm:text-[20px] lg:text-[24px]">{`${displayRecords}`}</p>
            <h4 className="text-[10px] xs:pt-3 xs:text-[14px] xs:font-bold lg:text-[16px]">
              Veja cada palavra de forma aleatória:
            </h4>
            <br></br>
            <h2 className="font-bold my-6 text-[10px] xs:text-[12px] lg:text-[20px]">
              {`${wordsRandom.inEnglish === undefined ? '' : wordsRandom.inEnglish}`}
              {translateRandom && (
                <a>
                  {wordsRandom.inPortuguese === undefined ? '' : ' - ' + wordsRandom.inPortuguese}
                </a>
              )}
            </h2>
            {mostrarAlert && (
              <div className="flex justify-center m-8">
                <div className="alert shadow-lg bg-gray-200 text-[12px] w-12/12 sm:w-10/12">
                  <div>
                    <span className="font-bold text-blue-900">{mensagemDelete}</span>
                  </div>
                  <div className="flex-none">
                    <button
                      className="btn btn-xs btn-error lg:btn-sm"
                      onClick={() => setMostrarAlert(!mostrarAlert)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="btn btn-xs btn-secondary lg:btn-sm"
                      onClick={() => deleteWords(wordsRandom)}
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
            )}
            <br></br>
            <div>
              <button
                className="btn btn-xs btn-outline btn-info lg:btn-md"
                onClick={captureRandomWord}
              >
                Outra palavra
              </button>
              <button
                className="btn btn-xs btn-outline btn-info lg:btn-md"
                onClick={listenWordRandomUser}
                disabled={disabledRandom}
              >
                Ouvir
              </button>
              <button
                className="btn btn-xs btn-outline btn-info lg:btn-md"
                onClick={() => setTranslateRandom(!translateRandom)}
              >
                Tradução
              </button>
              <button
                className="btn btn-xs btn-outline btn-info lg:btn-md"
                onClick={editWordsRandom}
              >
                Editar
              </button>
              <button className="btn btn-xs btn-outline btn-info lg:btn-md" onClick={alertDelete}>
                Deletar
              </button>
              <button
                className="btn btn-xs btn-outline btn-info lg:btn-md"
                onClick={() => navigate('/add')}
              >
                ADICIONAR
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="tall:absolute inset-x-0 bottom-0">
        <Footer />
      </div>
    </>
  );
}
