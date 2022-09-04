import React, { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { useNavigate } from "react-router-dom";
import { db } from "../db";
import { Header } from "./Header";
import { Footer } from "./Footer";
import './Study-list.css'
import backgroundMyList from "../../public/rawad-semaan-unsplash.webp";

export function StudyList() {
    
    const [wordsRandom, setWordsRandom] = useState("");
    const [wordsNotRandom, setWordsNotRandom] = useState("");
    const [index, setIndex] = useState(0);
    const [disabledRandom, setDisabledRandom] = useState(false);
    const [DisabledNotRandom, setDisabledNotRandom] = useState(false);
    const [translateNotRandom, setTranslateNotRandom] = useState(false);
    const [translateRandom, setTranslateRandom] = useState(false);
    const [wordByWord, setWordByWord] = useState([]);
    
    const navigate = useNavigate();    

    const wordsPhrases = useLiveQuery(
        async () => {
            const wordsPhrases = await db.wordsAndPhrases.toArray();

            setWordByWord(wordsPhrases);
            setWordsRandom(() =>
                (wordsPhrases[0] === undefined) ? "" : wordsPhrases[0]);
            setWordsNotRandom(() =>
                (wordsPhrases[0] === undefined) ? "" : wordsPhrases[0]);
            setIndex(1);
            return wordsPhrases;
        },
    );

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function randomWord() {
        return wordsPhrases[randomIntFromInterval(0, wordsPhrases.length - 1)];
    }

    function captureRandomWord() {
        if (wordsRandom === "") {
            alert('Não há palavras registradas. Por favor, adicione uma palavra ou frase.');
            return;
        }
        setWordsRandom(randomWord());
    }

    function sleep(ms) {
        return new Promise(result => setTimeout(result, ms));
    }

    async function listenWordRandomUser() {
        if (wordsRandom === "") {
            alert('Não há palavras registradas. Por favor, adicione uma palavra ou frase.');
            return;
        }
        const speech = new SpeechSynthesisUtterance();
        speech.text = wordsRandom.inEnglish;
        speech.lang = "en-US";
        window.speechSynthesis.speak(speech);
        await sleep(0);
        setDisabledRandom(true);
        await sleep(1000);
        setDisabledRandom(false);
    }

    function editWordsRandom(){
        if (wordsRandom === "") {
            alert('Não há palavras registradas. Por favor, adicione uma palavra ou frase.');
            return;
        }else{
            navigate(`/Edit/${wordsRandom.id}`);
        }
    }

    function deleteWords(word){
        if (word === "") {            
            alert('Não há palavras registradas. Por favor, adicione uma palavra ou frase.');
            return;
        }
        db.wordsAndPhrases
        .where("id").equals(word.id)
        .delete()
        .then(function (deleteCount) {
            alert("Foi deletada " + deleteCount + " palavra: " + word.inEnglish);
            
            
            /* alert
                (
                <div class="alert shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>we use cookies for no reason.</span>
                </div>
                <div class="flex-none">
                    <button class="btn btn-sm btn-ghost">Deny</button>
                    <button class="btn btn-sm btn-primary">Accept</button>
                </div>
                </div>
                ); */
            
            
        });
    }

    function findWord() {
        if (wordsNotRandom === "") {
            alert('Não há palavras registradas. Por favor, adicione uma palavra ou frase.');
            return;
        }
        if (index === wordsPhrases.length) {
            setIndex(wordsPhrases.length - 1);
        }
        if (index > wordsPhrases.length || index <= 0 && wordsPhrases[0] != undefined) {
            alert('Existem ' + wordsPhrases.length + ' palavras registradas. Por favor, entre com um número entre ' + 1 + ' e ' + wordsPhrases.length + '.');
            setIndex(0);
            setWordsNotRandom(wordsPhrases[0]);
            clearInput();
        } else {
            setWordsNotRandom(wordsPhrases[index - 1]);
        }
    }

    function clearInput() {
        const numberInput = document.querySelector("#find-word-random");
        numberInput.value = "";
    }

    function findNumberAndClearInput() {
        findWord();
        clearInput();
    }

    function first() {
        if (wordsNotRandom === "") {
            alert('Não há palavras registradas. Por favor, adicione uma palavra ou frase.');
            return;
        }
        setIndex(1);
        let firstWord = wordsPhrases[0];
        setWordsNotRandom(firstWord);
    }

    function ascendingOrder() {

        let wordAscending = "";
        if (wordsNotRandom === "") {
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
        let wordDescending = "";
        if (wordsNotRandom === "") {
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
        if (wordsNotRandom === "") {
            alert('Não há palavras registradas. Por favor, adicione uma palavra ou frase.');
            return;
        }
        const speech = new SpeechSynthesisUtterance();
        speech.text = wordsNotRandom.inEnglish;
        speech.lang = "en-US";
        window.speechSynthesis.speak(speech);
        await sleep(0);
        setDisabledNotRandom(true);
        await sleep(1000);
        setDisabledNotRandom(false);
    }

    function editWordsNotRandom(){
        if (wordsNotRandom === "") {
            alert('Não há palavras registradas. Por favor, adicione uma palavra ou frase.');
            return;
        }else{
            navigate(`/Edit/${wordsNotRandom.id}`);
        }
    }

    function deleteEachWord(word){
        if (word === "") {
            alert('Não há palavras registradas. Por favor, adicione uma palavra ou frase.');
            return;
        }
        db.wordsAndPhrases
        .where("id").equals(word.id)
        .delete()
        .then(function (deleteCount) {
            console.log("Foi deletada " + deleteCount + " palavra: " + word.inEnglish);
        });
    }

    function showEachWord(translate) {
        setWordByWord([...wordByWord].map(object => {
            if (object.id === translate.id) {
                return {
                    ...object,
                    toShow: !translate.toShow
                }
            }
            else return object;
        }))
    }

    return <>   
        < Header />
        
        <div className="my-list">
            <h2 className="title font-bold">MINHA LISTA</h2>
            <h4 className="sub-title font-bold">Veja cada palavra de forma aleatória:</h4>
            <br></br>        
            <h2 className="wordsRandom">
            {
                `${wordsRandom.inEnglish === undefined ? "" : wordsRandom.inEnglish}`
            }
            {
                translateRandom && 
                <a className="translation">{wordsRandom.inPortuguese === undefined ? "" : " - " + wordsRandom.inPortuguese}</a>
            }
            </h2>
            <br></br><br></br>
            <div className="buttons-my-list">
                <button className="btn btn-outline btn-primary" onClick={captureRandomWord}>Outra palavra</button>
                <button className="btn btn-outline btn-primary" onClick={listenWordRandomUser} disabled={disabledRandom} style={{ color: disabledRandom ? "red" : "" }}>Ouvir</button>
                <button className="btn btn-outline btn-primary" onClick={() => setTranslateRandom(!translateRandom)}>Tradução</button>
                <button className="btn btn-outline btn-primary" onClick={editWordsRandom}>Editar</button> 
                <button className="btn btn-outline btn-primary" onClick={()=>deleteWords(wordsRandom)}>Deletar</button>
                <button className="btn btn-outline btn-primary" onClick={() => navigate("/add")}>ADICIONAR</button>
            </div>
            <br></br>
            <hr></hr>
            
            <h4 className="sub-title font-bold">Veja cada palavra de forma crescente ou decrescente:</h4>
            <br></br>


            <div className="form-control">
                <div className="input-group">
                    <input 
                        type="text" 
                        placeholder="Nº de ordem da palavra…" 
                        className="input input-bordered"                 
                        id="find-word-random"                
                        onChange={(e) => setIndex(Number(e.target.value))}>                    
                    </input>
                    <button className="btn btn-square" onClick={findNumberAndClearInput}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>                        
                    </button>
                </div>
            </div>

            <br></br>
            <br></br>
            <h2 className="wordsNotRandom">
            {
                `${wordsNotRandom.inEnglish === undefined ? "" : wordsNotRandom.inEnglish}`
            }        
            {
                translateNotRandom && 
                <a className="translation">{wordsNotRandom.inPortuguese === undefined ? "" : " - " + wordsNotRandom.inPortuguese}</a>
            }
            </h2>
            <br></br>
            <br></br>
            <div className="buttons-my-list">
                <button className="btn btn-outline btn-primary" id="first-word-not-random" onClick={first}>Primeira palavra</button>
                <button className="btn btn-outline btn-primary" id="descending-order" onClick={descendingOrder}> - </button>
                <button className="btn btn-outline btn-primary" id="ascending-order" onClick={ascendingOrder}> + </button>
                <button className="btn btn-outline btn-primary" id="listen-word-not-random" onClick={listenWordUserNotRandom} disabled={DisabledNotRandom} style={{ color: DisabledNotRandom ? "red" : "" }}>Ouvir</button>
                <button className="btn btn-outline btn-primary" id="translation-word-not-random" onClick={() => setTranslateNotRandom(!translateNotRandom)}>Tradução</button>
                <button className="btn btn-outline btn-primary" id="edit-word-not-random" onClick={editWordsNotRandom}>Editar</button>  
                <button className="btn btn-outline btn-primary" id="delete-word-not-random" onClick={()=>deleteWords(wordsNotRandom)}>Deletar</button>
                <button className="btn btn-outline btn-primary" onClick={() => navigate("/add")}>ADICIONAR</button>
            </div>            

            <section className="complete-list">
                <h1 className="font-bold" style={{fontSize: "20px", color: "#570DF8", padding: "25px"}}>LISTA COMPLETA</h1>
                <div className="overflow-x-auto" id="table-div">            
                    <table className="table w-full">        
                        <thead>
                            <tr>                    
                                <th className="english-column">EM INGLÊS</th>
                                <th className="portuguese-column">EM PORTUGUÊS</th>
                                <th className="buttons-column"></th>
                            </tr>
                        </thead>
                        <tbody>        
                            {
                            wordByWord?.map(word =>                
                            <tr className="hover"
                            key={word.id} id="wordByWord">                    
                                <td className="english-line">{word.inEnglish}</td>
                                
                                <td className="portuguese-line">{word.toShow && 
                                    <a className="translation2" >{word.inPortuguese === undefined ? "" : word.inPortuguese}</a>}</td>
                                <td className="buttons-line">
                                    <button id="translation" onClick={() => showEachWord(word)}>Traduzir</button>
                                    <button onClick={() => navigate(`/Edit/${word.id}`)}>Editar</button>
                                    <button id="delete" onClick={()=>deleteEachWord(word)}>Deletar</button>            
                                </td>
                            </tr>)                
                            }
                        </tbody>
                    </table>            
                </div>
            </section>
        </div>                
        < Footer />
                
    </>
}
