import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate } from 'react-router-dom';
import { db } from '../db';
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';
import { IconTranslation } from '../Components/IconTranslation';
import { IconListening } from '../Components/IconListening';
import { IconEdit } from '../Components/IconEdit';
import { IconDelete } from '../Components/IconDelete';

export function ListRecords() {
  const [index, setIndex] = useState(0);
  const [wordByWord, setWordByWord] = useState([]);
  const [displayRecords, setDisplayRecords] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [allWords, setAllWords] = useState(false);

  const navigate = useNavigate();

  const wordsPhrases = useLiveQuery(async () => {
    const wordsPhrases = await db.wordsAndPhrases.toArray();

    setWordByWord(wordsPhrases);
    setIndex(1);
    setDisplayRecords(wordsPhrases.length);
    return wordsPhrases;
  });

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
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
        } else return object;
      })
    );
  }

  async function listenWord(word) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = word.inEnglish;
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
    await sleep(0);
    setDisabled(true);
    await sleep(1000);
    setDisabled(false);
  }

  return (
    <>
      <section className="">
        <Header />
      </section>

      <section>
        <h1 className="font-bold text-[#ffffff] py-4 tracking-[.20em] text-[14px] sm:text-[18px]">
          LISTA COMPLETA
        </h1>
        <h1 className="font-bold text-[#ffffff] pb-4 tracking-widest text-[14px] sm:text-[18px]">
          Itens adicionados: {displayRecords}
        </h1>
        <div className="overflow-x-auto bg-gray-300 rounded-xl py-3 pb-6 p-1 sm:pt-0 sm:p-8">
          <table className="table-fixed w-full shadow-xl tracking-wide">
            <thead className="p-3">
              <tr>
                <th className="pb-0 text-blue-600 font-bold text-[10px] xs:text-[12px] ssm:text-[14px]">
                  EM INGLÊS
                </th>
                <th className="pb-[20px] text-blue-600 font-bold text-[10px] xs:text-[12px] ssm:text-[14px]">
                  EM PORTUGUÊS
                  <button
                    className="btn-outline btn-secondary relative left-[0px] top-[11px] rounded"
                    id="icon-translation"
                    data-theme="emerald"
                    onClick={() => setAllWords(!allWords)}
                  >
                    <IconTranslation />
                  </button>
                </th>
                <th className="pb-3 sm:w-3/12 md:w-2/12"></th>
              </tr>
            </thead>
            <tbody data-theme="emerald">
              {wordByWord?.map((word) => (
                <tr className="bg-gray-100 hover:bg-gray-300" key={word.id}>
                  <td className="border-solid border-2 break-words p-1 leading-relaxed text-[10px] xs2:font-bold xs:text-[12px] ssm:text-[14px]">
                    {word.inEnglish}
                  </td>
                  <td className="border-solid border-2 p-1 leading-snug">
                    {(!allWords &&
                      (word.toShow === true ? (
                        <a className="break-words text-[10px] xs2:font-bold xs:text-[12px] ssm:text-[14px]">
                          {word.inPortuguese === undefined ? '' : word.inPortuguese}
                        </a>
                      ) : (
                        ''
                      ))) ||
                      (allWords &&
                        (word.toShow === false ? (
                          <a className="break-words text-[10px] xs2:font-bold xs:text-[12px] ssm:text-[14px]">
                            {word.inPortuguese === undefined ? '' : word.inPortuguese}
                          </a>
                        ) : (
                          ''
                        )))}
                  </td>
                  <td className="buttons-line border-solid border-2">
                    <button
                      className="btn-outline btn-secondary relative top-[4px] m-0 p-0 rounded"
                      id="icon-translation"
                      onClick={() => showEachWord(word)}
                    >
                      <IconTranslation />
                    </button>
                    <button
                      className="btn-outline btn-secondary relative top-[4px] m-0 p-0 rounded"
                      id="icon-listening"
                      disabled={disabled}
                      onClick={() => listenWord(word)}
                    >
                      <IconListening />
                    </button>
                    <button
                      className="btn-outline btn-secondary relative top-[4px] m-0 p-0 rounded"
                      id="icon-edit"
                      onClick={() => navigate(`/Edit/${word.id}`)}
                    >
                      <IconEdit />
                    </button>
                    <button
                      className="btn-outline btn-secondary relative top-[4px] m-0 p-0 rounded"
                      id="icon-delete"
                      onClick={() => deleteEachWord(word)}
                    >
                      <IconDelete />
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
