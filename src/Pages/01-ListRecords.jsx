import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate } from 'react-router-dom';
import { db } from '../db';
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';

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
        } else return object
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
        <h1 className="font-bold text-[#ffffff] py-4 text-[14px] sm:text-[18px]">LISTA COMPLETA</h1>
        <h1 className="font-bold text-[#ffffff] pb-4 text-[14px] sm:text-[18px]">Itens cadastrados: {displayRecords}</h1>
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
                      onClick={() => setAllWords(!allWords)}
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
                <tr className="bg-gray-100 hover:bg-gray-300" key={word.id}>
                  <td className="border-solid border-2 break-words p-1 leading-relaxed text-[10px] xs2:font-bold xs:text-[12px] ssm:text-[14px]">
                    {word.inEnglish}                    
                  </td>
                  <td className="border-solid border-2 p-1 leading-snug">                   
                    {
                      !allWords && (word.toShow === true 
                        ?
                        <a className="break-words text-[10px] xs2:font-bold xs:text-[12px] ssm:text-[14px]">
                          {word.inPortuguese === undefined ? '' : word.inPortuguese}
                        </a>
                        : ""
                        )
                      ||
                      allWords && (word.toShow === false 
                      ? 
                      <a className="break-words text-[10px] xs2:font-bold xs:text-[12px] ssm:text-[14px]">
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
                      id="icon-translation"
                      disabled={disabled}                      
                      onClick={() => listenWord(word)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25px"
                        height="30px"
                        viewBox="0 0 249.316 249.316"
                        className="fill-current h-5 m-px xs:h-7 xs:m-1"
                      >                        
                        <path className="fill-[#f87979]" d="M124.663,0C55.919,0,0,55.924,0,124.652c0,68.744,55.919,124.663,124.663,124.663c68.733,0,124.652-55.924,124.652-124.663C249.316,55.919,193.397,0,124.663,0z M124.663,226.184c-55.995,0-101.542-45.547-101.542-101.531c0-55.99,45.547-101.531,101.542-101.531c55.984,0,101.526,45.547,101.526,101.531S180.648,226.184,124.663,226.184z"/>
                        <path d="M104.419,87.145c-1.403-0.876-2.937-1.316-4.46-1.316c-2.04,0-4.079,0.783-5.798,2.312l-21.854,19.619c-1.202-0.702-2.594-1.137-4.085-1.137H49.316c-4.449,0-8.066,3.601-8.066,8.066v18.906c0,4.455,3.617,8.072,8.066,8.072h18.906c1.207,0,2.344-0.288,3.367-0.756l22.567,20.239c2.997,2.698,6.957,3.079,10.264,1.006c3.302-2.056,5.379-6.233,5.379-10.802V97.958C109.798,93.4,107.721,89.228,104.419,87.145z"/>
                        <path d="M99.947,163.978L99.947,163.978c-2.222,0-4.34-0.85-6.126-2.459l-22.327-20.022c-1.067,0.444-2.167,0.669-3.272,0.669H49.316c-4.723,0-8.566-3.845-8.566-8.571v-18.906c0-4.724,3.843-8.566,8.566-8.566h18.906c1.37,0,2.751,0.354,4.017,1.026l21.588-19.38c1.77-1.574,3.947-2.439,6.132-2.439c1.632,0,3.266,0.481,4.725,1.392c3.464,2.186,5.615,6.491,5.615,11.237v53.396c0,4.769-2.151,9.07-5.615,11.227C103.224,163.494,101.585,163.978,99.947,163.978zM71.679,140.319l22.811,20.457c1.6,1.44,3.487,2.202,5.458,2.202c1.45,0,2.904-0.431,4.206-1.247c3.174-1.976,5.145-5.952,5.145-10.378V97.958c0-4.406-1.972-8.388-5.146-10.39c-1.298-0.81-2.749-1.239-4.193-1.239c-1.968,0-3.858,0.756-5.466,2.185L72.37,108.374l-0.315-0.184c-1.198-0.699-2.523-1.068-3.833-1.068H49.316c-4.172,0-7.566,3.394-7.566,7.566v18.906c0,4.175,3.394,7.571,7.566,7.571h18.906c1.065,0,2.128-0.239,3.159-0.711L71.679,140.319z"/>
                        <path d="M155.595,164.069c-1.779,0-3.552-0.68-4.911-2.034c-2.709-2.714-2.709-7.109,0-9.823c15.197-15.191,15.191-39.917,0-55.109c-2.714-2.714-2.714-7.109,0-9.823c2.709-2.714,7.109-2.714,9.823,0c20.614,20.614,20.614,54.146,0.005,74.749C159.147,163.389,157.374,164.069,155.595,164.069z"/>
                        <path d="M134.758,149.411c-1.779,0-3.557-0.68-4.911-2.034c-2.714-2.714-2.714-7.109,0-9.823c3.448-3.443,5.347-8.023,5.347-12.901c0-4.868-1.904-9.453-5.347-12.901c-2.714-2.714-2.714-7.109,0-9.823s7.114-2.714,9.823,0c6.07,6.07,9.41,14.142,9.41,22.719c0,8.588-3.34,16.654-9.41,22.724C138.31,148.731,136.531,149.411,134.758,149.411z"/>
                        <path d="M176.432,183.188c-1.773,0-3.546-0.68-4.906-2.034c-2.714-2.714-2.714-7.109,0-9.823c12.466-12.466,19.33-29.034,19.33-46.673s-6.87-34.212-19.341-46.678c-2.709-2.714-2.709-7.109,0-9.823c2.72-2.714,7.114-2.714,9.828,0c15.093,15.093,23.404,35.153,23.404,56.501s-8.305,41.408-23.399,56.49C179.99,182.508,178.211,183.188,176.432,183.188z"/>
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
