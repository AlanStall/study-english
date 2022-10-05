import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate } from 'react-router-dom';
import { db } from '../db';
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';

export function StudyList() {
  const [wordsRandom, setWordsRandom] = useState('');
  const [wordsNotRandom, setWordsNotRandom] = useState('');
  const [index, setIndex] = useState(0);
  const [disabledRandom, setDisabledRandom] = useState(false);
  const [DisabledNotRandom, setDisabledNotRandom] = useState(false);
  const [translateNotRandom, setTranslateNotRandom] = useState(false);
  const [translateRandom, setTranslateRandom] = useState(false);
  const [wordByWord, setWordByWord] = useState([]);
  const [displayRecords, setDisplayRecords] = useState('');  
  const [allWords, setallWords] = useState(false);

  const navigate = useNavigate();

  const wordsPhrases = useLiveQuery(async () => {
    const wordsPhrases = await db.wordsAndPhrases.toArray();

    setWordByWord(wordsPhrases);
    setWordsRandom(() => (wordsPhrases[0] === undefined ? '' : wordsPhrases[0]));
    setWordsNotRandom(() => (wordsPhrases[0] === undefined ? '' : wordsPhrases[0]));
    setIndex(1);
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
        alert('Foi deletada ' + deleteCount + ' palavra: ' + word.inEnglish);
      });
  }

  function findWord() {
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
      clearInput();
    } else {
      setWordsNotRandom(wordsPhrases[index - 1]);
    }
  }

  function clearInput() {
    const numberInput = document.querySelector('#find-word-random');
    numberInput.value = '';
  }

  function findNumberAndClearInput() {
    findWord();
    clearInput();
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

  function deleteEachWord(word) {
    if (word === '') {
      alert('Não há palavras registradas. Por favor, adicione uma palavra ou frase.');
      return;
    }
    db.wordsAndPhrases
      .where('id')
      .equals(word.id)
      .delete()
      .then(function (deleteCount) {
        console.log('Foi deletada ' + deleteCount + ' palavra: ' + word.inEnglish);
      });
  }

  function showEachWord(translate) {
    setWordByWord(
      [...wordByWord].map((object) => {
        if (object.id === translate.id) {
          return {
            ...object,
            toShow: !translate.toShow            
          };          
        } else return object
      })      
    );
  }

  
  /* function showAllWords(){
    setallWords(true);

    let todos = [...wordByWord.inPortuguese];
    setToShowAll(todos);

    const data =[...wordsPhrases];
    setToShowAll(data.map((d) => <li key={d.id}>{d.inPortuguese}</li>));
    
  } */

  return (
    <>
      <section
        className=" min-h-screen pb-0.5 xs:pb-6"        
      >
        <Header />

        <div className="card bg-base-100 shadow-xl m-2 xs2:my-4 xs2:py-4 sm:mx-10 lg:mx-32">
          <div>
            <h2 className="font-bold text-[14px] xs:text-[24px]">MINHA LISTA</h2>
            <p className="text-[10px] xs:text-[14px] xs:font-bold">{`Palavras registradas:`}</p>
            <p className="font-bold text-[#570DF8] text-[12px] xs:text-[16px] sm:text-[20px] lg:text-[24px]">{`${displayRecords}`}</p>
            <h4 className="text-[10px] xs:pt-3 xs:text-[14px] xs:font-bold lg:text-[16px]">
              Veja cada palavra de forma aleatória:
            </h4>
            <br></br>
            <h2 className="font-bold text-[12px] m-2 xs:text-[16px] lg:text-[24px]">
              {`${wordsRandom.inEnglish === undefined ? '' : wordsRandom.inEnglish}`}
              {translateRandom && (
                <a>
                  {wordsRandom.inPortuguese === undefined ? '' : ' - ' + wordsRandom.inPortuguese}
                </a>
              )}
            </h2>
            <br></br>
            <div>
              <button
                className="btn btn-xs btn-outline btn-primary lg:btn-md"
                onClick={captureRandomWord}
              >
                Outra palavra
              </button>
              <button
                className="btn btn-xs btn-outline btn-primary lg:btn-md"
                onClick={listenWordRandomUser}
                disabled={disabledRandom}
                style={{ color: disabledRandom ? 'red' : '' }}
              >
                Ouvir
              </button>
              <button
                className="btn btn-xs btn-outline btn-primary lg:btn-md"
                onClick={() => setTranslateRandom(!translateRandom)}
              >
                Tradução
              </button>
              <button
                className="btn btn-xs btn-outline btn-primary lg:btn-md"
                onClick={editWordsRandom}
              >
                Editar
              </button>
              <button
                className="btn btn-xs btn-outline btn-primary lg:btn-md"
                onClick={() => deleteWords(wordsRandom)}
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
            <br></br>
            <hr></hr>
            <br></br>
            <h4 className="text-[10px] xs:text-[14px] xs:font-bold lg:text-[16px]">
              Veja cada palavra de forma crescente ou decrescente:
            </h4>

            <br></br>

            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Procure pelo nº de registro"
                  className="input input-bordered ml-auto p-1 h-6 w-24 xs2:w-44 xs:h-8"
                  onChange={(e) => setIndex(Number(e.target.value))}
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

            <br></br>
            <br></br>
            <h2 className="font-bold text-[12px] m-2 xs:text-[16px] lg:text-[24px]">
              {`${wordsNotRandom.inEnglish === undefined ? '' : wordsNotRandom.inEnglish}`}
              {translateNotRandom && (
                <a>
                  {wordsNotRandom.inPortuguese === undefined
                    ? ''
                    : ' - ' + wordsNotRandom.inPortuguese}
                </a>
              )}
            </h2>
            <br></br>
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
                style={{ color: DisabledNotRandom ? 'red' : '' }}
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
                onClick={() => deleteWords(wordsNotRandom)}
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

      <section>
        <h1 className="font-bold text-[#ffffff] py-4 text-[14px] sm:text-[18px]">LISTA COMPLETA</h1>
        <div className="overflow-x-auto bg-gray-300 rounded-xl py-3 pb-6 p-1 sm:pt-0 sm:p-8">
          <table className="table-fixed w-full shadow-xl">
            <thead className="p-3">
              <tr>
                <th className="pb-0 text-[#570DF8] font-bold text-[10px] xs:text-[12px]">
                  EM INGLÊS
                </th>
                <th className="pb-[20px] text-[#570DF8] font-bold text-[10px] xs:text-[12px]">
                  EM PORTUGUÊS
                  <button
                      className="btn-outline btn-primary relative left-[10px] top-[9px] m-0 p-1 rounded"
                      id="icon-translation"
                      data-theme="light"
                      onClick={() => setallWords(!allWords)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25px"
                      height="30px"
                      viewBox="800 795 200 200"
                      className="fill-current h-5 m-px xs:h-7"
                    >
                      <path d="M973.166,818.5H818.833c-12.591,0-22.833,10.243-22.833,22.833v109.333c0,12.59,10.243,22.833,22.833,22.833h154.333c12.59,0,22.834-10.243,22.834-22.833V841.333C996,828.743,985.756,818.5,973.166,818.5z M896,961.5h-77.167c-5.973,0-10.833-4.859-10.833-10.833V841.333c0-5.974,4.86-10.833,10.833-10.833H896V961.5z M978.58,872.129c-0.547,9.145-5.668,27.261-20.869,39.845c4.615,1.022,9.629,1.573,14.92,1.573v12c-10.551,0-20.238-1.919-28.469-5.325c-7.689,3.301-16.969,5.325-28.125,5.325v-12c5.132,0,9.924-0.501,14.366-1.498c-8.412-7.016-13.382-16.311-13.382-26.78h11.999c0,8.857,5.66,16.517,14.884,21.623c4.641-2.66,8.702-6.112,12.164-10.351c5.628-6.886,8.502-14.521,9.754-20.042h-49.785v-12h22.297v-11.986h12V864.5h21.055c1.986,0,3.902,0.831,5.258,2.28C977.986,868.199,978.697,870.155,978.58,872.129z" />
                      <path d="M839.035,914.262l-4.45,11.258h-15.971l26.355-61.09h15.971l25.746,61.09h-16.583l-4.363-11.258H839.035zM852.475,879.876l-8.902,22.604h17.629L852.475,879.876z" />
                    </svg>
                  </button>
                </th>
                <th className="pb-3 sm:w-3/12 md:w-2/12"></th>
              </tr>
            </thead>
            <tbody data-theme="light">
              {wordByWord?.map((word) => (
                <tr className="bg-white hover:bg-gray-100" key={word.id}>
                  <td className="border-solid border-2 break-words p-0.5 text-[10px] xs2:font-bold xs:text-[12px] ssm:text-[14px]">
                    {word.inEnglish}                    
                  </td>
                  <td className="border-solid border-2">                   
                    {
                      !allWords && (word.toShow === true 
                        ?
                        <a className="break-words p-0.5 text-[10px] xs2:font-bold xs:text-[12px] ssm:text-[14px]">
                          {word.inPortuguese === undefined ? '' : word.inPortuguese}
                        </a>
                        : ""
                        )
                      ||
                      allWords && (word.toShow === false 
                      ? 
                      <a className="break-words p-0.5 text-[10px] xs2:font-bold xs:text-[12px] ssm:text-[14px]">
                        {word.inPortuguese === undefined ? '' : word.inPortuguese}
                      </a>
                      : ""
                      )
                    }
                  </td>
                  <td className="buttons-line border-solid border-2">                  
                    <button
                      className="btn-outline btn-primary relative top-[4px] m-0 p-0 rounded"
                      id="icon-translation"
                      onClick={() => showEachWord(word)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25px"
                        height="30px"
                        viewBox="800 795 200 200"
                        className="fill-current h-5 m-px xs:h-7 xs:m-1"
                      >
                        <path d="M973.166,818.5H818.833c-12.591,0-22.833,10.243-22.833,22.833v109.333c0,12.59,10.243,22.833,22.833,22.833h154.333c12.59,0,22.834-10.243,22.834-22.833V841.333C996,828.743,985.756,818.5,973.166,818.5z M896,961.5h-77.167c-5.973,0-10.833-4.859-10.833-10.833V841.333c0-5.974,4.86-10.833,10.833-10.833H896V961.5z M978.58,872.129c-0.547,9.145-5.668,27.261-20.869,39.845c4.615,1.022,9.629,1.573,14.92,1.573v12c-10.551,0-20.238-1.919-28.469-5.325c-7.689,3.301-16.969,5.325-28.125,5.325v-12c5.132,0,9.924-0.501,14.366-1.498c-8.412-7.016-13.382-16.311-13.382-26.78h11.999c0,8.857,5.66,16.517,14.884,21.623c4.641-2.66,8.702-6.112,12.164-10.351c5.628-6.886,8.502-14.521,9.754-20.042h-49.785v-12h22.297v-11.986h12V864.5h21.055c1.986,0,3.902,0.831,5.258,2.28C977.986,868.199,978.697,870.155,978.58,872.129z" />
                        <path d="M839.035,914.262l-4.45,11.258h-15.971l26.355-61.09h15.971l25.746,61.09h-16.583l-4.363-11.258H839.035zM852.475,879.876l-8.902,22.604h17.629L852.475,879.876z" />
                      </svg>
                    </button>
                    <button
                      className="btn-outline btn-primary relative top-[4px] m-0 p-0 rounded"
                      id="icon-edit"                      
                      onClick={() => navigate(`/Edit/${word.id}`)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25px"
                        height="25px"
                        viewBox="0 30 505 505"
                        className="fill-current h-5 m-px xs:h-7 xs:m-1"
                      >
                        <path d="M376.956,237.143l58.504-57.637v255.468c0,34.352-27.852,62.207-62.207,62.207H62.209c-34.352,0-62.207-27.855-62.207-62.207V123.932c0-34.355,27.855-62.211,62.207-62.211h255.453l-59.848,58.234H58.597v318.359h318.359V237.143z M377.469,56.755l62.967,62.985l20.993-20.986l-62.968-62.985L377.469,56.755z M434.211,0l-20.989,20.99l62.968,62.968l20.989-20.989L434.211,0z M171.288,262.987l188.91-188.953l62.969,62.984l-188.91,188.938l-91.703,28.677L171.288,262.987z M202.596,265.369l10.77,10.953l161.938-159.184l-10.77-10.953L202.596,265.369z" />
                      </svg>
                    </button>
                    <button
                      className="btn-outline btn-primary relative top-[4px] m-0 p-0 rounded"
                      id="icon-delete"                      
                      onClick={() => deleteEachWord(word)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25px"
                        height="25px"
                        viewBox="0 0 950 950"
                        className="fill-current h-5 m-px xs:h-7 xs:m-1"
                      >
                        <path d="M176.415,880.5c0,11.046,8.954,20,20,20h507.67c11.046,0,20-8.954,20-20V232.487h-547.67V880.5L176.415,880.5zM562.75,342.766h75v436.029h-75V342.766z M412.75,342.766h75v436.029h-75V342.766z M262.75,342.766h75v436.029h-75V342.766z" />
                        <path d="M618.825,91.911V20c0-11.046-8.954-20-20-20h-297.15c-11.046,0-20,8.954-20,20v71.911v12.5v12.5H141.874c-11.046,0-20,8.954-20,20v50.576c0,11.045,8.954,20,20,20h34.541h547.67h34.541c11.046,0,20-8.955,20-20v-50.576c0-11.046-8.954-20-20-20H618.825v-12.5V91.911z M543.825,112.799h-187.15v-8.389v-12.5V75h187.15v16.911v12.5V112.799z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </>
  );
}
