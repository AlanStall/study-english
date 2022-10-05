import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate } from 'react-router-dom';
import { db } from '../db';
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';

export function StudyNotRandom() {  
  const [wordsNotRandom, setWordsNotRandom] = useState('');
  const [index, setIndex] = useState(0);  
  const [DisabledNotRandom, setDisabledNotRandom] = useState(false);
  const [translateNotRandom, setTranslateNotRandom] = useState(false);    
  const [displayRecords, setDisplayRecords] = useState('');
  const [mostrarAlert, setMostrarAlert] = useState(false);
  const [mensagemDelete, setMensagemDelete] = useState("");

  const navigate = useNavigate();

  const wordsPhrases = useLiveQuery(async () => {
    const wordsPhrases = await db.wordsAndPhrases.toArray();
        
    setWordsNotRandom(() => (wordsPhrases[0] === undefined ? '' : wordsPhrases[0]));
    setIndex(1);
    setDisplayRecords(wordsPhrases.length);    
    
    



    /* for(let i = 0; i < wordsPhrases.length; i++){        
        console.log(`${i+1}. ${wordsPhrases[i].inEnglish}`)

        console.log(i);
        if(wordsPhrases[i-1].inEnglish == "caderno" ) {
            console.log(i);
        }
      } */
      
      
      



    /* let teste = wordsPhrases.findIndex(checkCurrentIndex);
    let teste03 = wordsPhrases.map((element, key)=> );
    let teste02 = Object.values(wordsNotRandom);

    function checkCurrentIndex(element, index, array){
        return element === wordsNotRandom
    }
    console.log(teste);
    console.log(teste02); */


    /* const array1 = wordsPhrases */
    /* const wordsPhrases02 = await db.wordsAndPhrases.toArray();
    const isLargeNumber = (element) => element === "caderno"; */
    /* console.log(wordsPhrases02.findIndex(isLargeNumber)+1); */
    
    /* const array2 = wordsPhrases.inEnglish[2]; */
    /* console.log(array2.findIndex(isLargeNumber2)+1);   */


    /* const array1 = [5, 12, 8, 130, 44, , , , , 50, , , ,26];
    const isLargeNumber2 = (element) => element === 26;
    console.log(array1.findIndex(isLargeNumber2)+1); */
    
    


    /* console.log(wordsPhrases.inEnglish); */
    /* console.log(wordsPhrases02.findIndex(isLargeNumber)); */







    

    return wordsPhrases;
  });


  
  /* console.log(wordsPhrases[index-1].inEnglish); */


  
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
        alert("Foi deletado" + deleteCount + " item: " + word.inEnglish);
        setMostrarAlert(!mostrarAlert);
      });
  }

  function alertDelete(){
    setMostrarAlert(true);
    setMensagemDelete("Você tem certeza que quer deleter este item?");
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

  const handleKeyPressInputNumber = e => {
    if (e.key === "Enter") {
        findNumberAndClearInput();
    }
  };

  

  
  return (
    <>
      <section
        className="min-h-screen min-w-[100%] pb-0.5 xs:pb-6"        
      >
        <Header />

        <div className="card bg-base-100 shadow-xl m-2 xs2:my-4 xs2:py-4 sm:mx-10 lg:mx-32">
          <div>
            <h2 className="font-bold text-[14px] xs:text-[24px]">MINHA LISTA</h2>
            <p className="text-[10px] xs:text-[14px] xs:font-bold">{`Palavras registradas:`}</p>
            <p className="font-bold text-[#570DF8] text-[12px] xs:text-[16px] sm:text-[20px] lg:text-[24px]">{`${displayRecords}`}</p>
            <h4 className="text-[10px] xs:text-[14px] xs:font-bold lg:text-[16px]">
              Veja cada palavra de forma crescente ou decrescente:
            </h4>
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Procure pelo nº de registro"
                  className="input input-bordered ml-auto p-1 h-6 w-24 text-[12px] xs2:w-44 xs:h-8"
                  id="find-number-random"
                  onChange={(e) => setIndex(Number(e.target.value))}
                  onKeyPress={handleKeyPressInputNumber}
                ></input>
                <button
                  className="btn btn-xs mr-auto m-0 xs:btn-sm"
                  onClick={findNumberAndClearInput}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="m-0 p-0 h-5 w-7 xs:p-0.5 xs:h-5 xs:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            
            <h2 className="font-bold text-[12px] m-2 xs:text-[16px] lg:text-[24px]">
              {wordsNotRandom.inEnglish === undefined ? '' : wordsNotRandom.inEnglish}
              {translateNotRandom && ( 
                <a>
                  {wordsNotRandom.inPortuguese === undefined
                    ? ''
                    : ' - ' + wordsNotRandom.inPortuguese}
                </a>                
              )}              
            </h2>
            { 
            mostrarAlert && 
            <div className="flex justify-center m-8">
                <div className="alert shadow-lg bg-gray-200 w-9/12">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span className='text-[blue]'>{mensagemDelete}</span>
                    </div>
                    <div className="flex-none">
                        <button className="btn btn-sm btn-primary" onClick={() => setMostrarAlert(!mostrarAlert)}>Cancel</button>
                        <button className="btn btn-sm btn-primary" onClick={() => deleteWords(wordsNotRandom)}>Confirm</button>
                    </div>
                </div>
            </div>
            }            
            <div>
              <button
                className="btn btn-xs h-8 btn-outline btn-primary xs2:h-6 lg:btn-md"
                onClick={first}
              >
                Primeira palavra
              </button>
              <button
                className="btn btn-xs w-10 btn-outline btn-primary lg:btn-md"
                onClick={descendingOrder}
              >
                -
              </button>
              <button
                className="btn btn-xs w-10 btn-outline btn-primary lg:btn-md"
                onClick={ascendingOrder}
              >
                +
              </button>
              <button
                className="btn btn-xs btn-outline btn-primary lg:btn-md"
                onClick={listenWordUserNotRandom}
                disabled={DisabledNotRandom}                
              >
                Ouvir
              </button>
              <button
                className="btn btn-xs btn-outline btn-primary lg:btn-md"
                onClick={() => setTranslateNotRandom(!translateNotRandom)}
              >
                Tradução
              </button>
              <button
                className="btn btn-xs btn-outline btn-primary lg:btn-md"
                onClick={editWordsNotRandom}
              >
                Editar
              </button>
              <button
                className="btn btn-xs btn-outline btn-primary lg:btn-md"
                onClick={alertDelete}
              >
                Deletar
              </button>
              <button
                className="btn btn-xs btn-outline btn-primary lg:btn-md"
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







/* import React, { useState } from "react";
import "./style.css";

const Input = ({}) => {
  const [val, setVal] = useState("");

  const handleTrack = () => {
    if (val.length !== 0) {
      // Do something with value
      console.log("got this:", val);
    }
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleTrack();
    }
  };

  return (
    <div>
      <input
        value={val}
        onChange={e => {
          setVal(e.target.value);
        }}
        onKeyPress={handleKeyPress}
      />
      <button
        onClick={() => {
          handleTrack();
        }}
      >
        Click
      </button>
    </div>
  );
};

export default function App() {
  return (
    <div>
      <Input />
    </div>
  );
} */