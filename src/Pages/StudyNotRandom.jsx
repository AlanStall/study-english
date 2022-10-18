import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate } from 'react-router-dom';
import { db } from '../db';
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';
import { IconInputSearch } from '../Components/IconInputSearch';

export function StudyNotRandom() {
  const [wordsNotRandom, setWordsNotRandom] = useState('');
  const [index, setIndex] = useState(0);
  const [DisabledNotRandom, setDisabledNotRandom] = useState(false);
  const [translateNotRandom, setTranslateNotRandom] = useState(false);
  const [displayRecords, setDisplayRecords] = useState('');
  const [mostrarAlert, setMostrarAlert] = useState(false);
  const [mensagemDelete, setMensagemDelete] = useState('');

  const navigate = useNavigate();

  const wordsPhrases = useLiveQuery(async () => {
    const wordsPhrases = await db.wordsAndPhrases.toArray();

    setWordsNotRandom(() => (wordsPhrases[0] === undefined ? '' : wordsPhrases[0]));
    setIndex(1);
    setDisplayRecords(wordsPhrases.length);

    return wordsPhrases;
  });

  function sleep(ms) {
    return new Promise((result) => setTimeout(result, ms));
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
        alert('Foi deletado ' + deleteCount + ' item: ' + word.inEnglish);
        setMostrarAlert(!mostrarAlert);
      });
  }

  function alertDelete() {
    setMostrarAlert(true);
    setMensagemDelete('Você tem certeza que quer deleter este item?');
  }

  function findWordByNumber() {
    if (wordsNotRandom === '') {
      alert('Não há palavras registradas. Por favor, adicione uma palavra ou frase.');
      return;
    }
    if (index === wordsPhrases.length) {
      setIndex(wordsPhrases.length - 1);
    }
    if (index > wordsPhrases.length || (index <= 0 && wordsPhrases[0] != undefined)) {
      alert(
        'Existem ' +
          wordsPhrases.length +
          ' palavras registradas. Por favor, entre com um número entre ' +
          1 +
          ' e ' +
          wordsPhrases.length +
          '.'
      );
      setIndex(0);
      setWordsNotRandom(wordsPhrases[0]);
      clearInputNumber();
    } else {
      setWordsNotRandom(wordsPhrases[index - 1]);
    }
  }

  function clearInputNumber() {
    const numberInput = document.querySelector('#find-number-random');
    numberInput.value = '';
  }

  function findNumberAndClearInput() {
    findWordByNumber();
    clearInputNumber();
  }

  function first() {
    if (wordsNotRandom === '') {
      alert('Não há palavras registradas. Por favor, adicione uma palavra ou frase.');
      return;
    }
    setIndex(1);
    let firstWord = wordsPhrases[0];
    setWordsNotRandom(firstWord);
  }

  function ascendingOrder() {
    let wordAscending = '';
    if (wordsNotRandom === '') {
      alert('Não há palavras registradas. Por favor, adicione uma palavra ou frase.');
      return;
    }
    if (index < wordsPhrases.length - 1) {
      setIndex(index + 1);
      wordAscending = wordsPhrases[index];
    } else {
      setIndex(wordsPhrases.length - 1);
      wordAscending = wordsPhrases[index];
    }
    setWordsNotRandom(wordAscending);
  }

  function descendingOrder() {
    let wordDescending = '';
    if (wordsNotRandom === '') {
      alert('Não há palavras registradas. Por favor, adicione uma palavra ou frase.');
      return;
    }
    if (index >= 1 && index <= wordsPhrases.length - 1) {
      setIndex(index - 1);
      wordDescending = wordsPhrases[index - 1];
    } else {
      setIndex(0);
      wordDescending = wordsPhrases[index];
    }
    setWordsNotRandom(wordDescending);
  }

  async function listenWordUserNotRandom() {
    if (wordsNotRandom === '') {
      alert('Não há palavras registradas. Por favor, adicione uma palavra ou frase.');
      return;
    }
    const speech = new SpeechSynthesisUtterance();
    speech.text = wordsNotRandom.inEnglish;
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
    await sleep(0);
    setDisabledNotRandom(true);
    await sleep(1000);
    setDisabledNotRandom(false);
  }

  function editWordsNotRandom() {
    if (wordsNotRandom === '') {
      alert('Não há palavras registradas. Por favor, adicione uma palavra ou frase.');
      return;
    } else {
      navigate(`/Edit/${wordsNotRandom.id}`);
    }
  }

  const handleKeyPressInputNumber = (e) => {
    if (e.key === 'Enter') {
      findNumberAndClearInput();
    }
  };

  return (
    <>
      <section className="min-h-screen min-w-[100%] pb-0.5 xs:pb-6">
        <Header />

        <div className="card bg-base-100 shadow-xl tracking-wider m-2 xs2:my-4 xs2:py-4 sm:mx-10 lg:mx-32">
          <div>
            <h2 className="font-bold text-[14px] xs:text-[16px]">MINHA LISTA</h2>
            <p className="text-[10px] xs:text-[14px] xs:font-bold">{`Itens adicionados:`}</p>
            <p className="font-bold text-blue-300 text-[12px] xs:text-[16px] sm:text-[20px] lg:text-[24px]">{`${displayRecords}`}</p>
            <h4 className="text-[10px] xs:text-[16px] xs:font-bold xs:pt-3 lg:text-[20px]">
              Veja cada palavra de forma crescente ou decrescente:
            </h4>
            <div className="form-control">
              <div className="input-group my-4">
                <input
                  type="text"
                  placeholder="Procure pelo nº de registro"
                  className="input input-bordered ml-auto p-1 h-6 w-36 text-[10px] xs2:w-44 xs:h-8 md:text-[12px]"
                  id="find-number-random"
                  onChange={(e) => setIndex(Number(e.target.value))}
                  onKeyPress={handleKeyPressInputNumber}
                ></input>
                <button
                  className="btn btn-xs mr-auto m-0 xs:btn-sm"
                  onClick={findNumberAndClearInput}
                >
                  <IconInputSearch />
                </button>
              </div>
            </div>

            <h2 className="font-bold my-6 text-[10px] xs:text-[12px] lg:text-[20px]">
              {wordsNotRandom.inEnglish === undefined ? '' : wordsNotRandom.inEnglish}
              {translateNotRandom && (
                <a>
                  {wordsNotRandom.inPortuguese === undefined
                    ? ''
                    : ' - ' + wordsNotRandom.inPortuguese}
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
                      onClick={() => deleteWords(wordsNotRandom)}
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div>
              <button
                className="btn btn-xs h-8 btn-outline btn-info xs2:h-6 lg:btn-md"
                onClick={first}
              >
                Primeira palavra
              </button>
              <button
                className="btn btn-xs w-10 btn-outline btn-info lg:btn-md"
                onClick={descendingOrder}
              >
                -
              </button>
              <button
                className="btn btn-xs w-10 btn-outline btn-info lg:btn-md"
                onClick={ascendingOrder}
              >
                +
              </button>
              <button
                className="btn btn-xs btn-outline btn-info lg:btn-md"
                onClick={listenWordUserNotRandom}
                disabled={DisabledNotRandom}
              >
                Ouvir
              </button>
              <button
                className="btn btn-xs btn-outline btn-info lg:btn-md"
                onClick={() => setTranslateNotRandom(!translateNotRandom)}
              >
                Tradução
              </button>
              <button
                className="btn btn-xs btn-outline btn-info lg:btn-md"
                onClick={editWordsNotRandom}
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
