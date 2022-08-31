import React, { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { useNavigate } from "react-router-dom";
import { db } from "../db";
import { Header } from "./Header";
import './Study-list.css'

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
        
        <h2>MINHA LISTA</h2>
        <br></br>
        <hr></hr>
        <br></br>

        <h4>Veja cada palavra de forma aleatória:</h4>
        <br></br>        
        {
            `${wordsRandom.inEnglish === undefined ? "" : wordsRandom.inEnglish}`
        }
        {
            translateRandom && 
            <a className="translation">{wordsRandom.inPortuguese === undefined ? "" : " - " + wordsRandom.inPortuguese}</a>
        }
        <br></br><br></br>
        <button id="update-word-random" onClick={captureRandomWord}>Outra palavra</button>
        <button id="listen-word-random" onClick={listenWordRandomUser} disabled={disabledRandom} style={{ color: disabledRandom ? 'red' : 'green' }}>Ouvir</button>
        <button id="translation-word-random" onClick={() => setTranslateRandom(!translateRandom)}>Tradução</button>
        <button id="edit-word-random" onClick={editWordsRandom}>Editar</button> 
        <button id="delete-word-random" onClick={()=>deleteWords(wordsRandom)}>Deletar</button>
        <button onClick={() => navigate("/add")}>ADICIONAR</button>
        <br></br><br></br>
        <hr></hr>
        <br></br>
        <h4>Veja cada palavra de forma crescente ou decrescente:</h4>
        <br></br>
        <input
            type="number"
            id="find-word-random"
            placeholder='Nº de ordem da palavra'
            onChange={(e) => setIndex(Number(e.target.value))}
        >
        </input>
        <button id="find-word-random" onClick={findNumberAndClearInput}>ENCONTRAR</button>
        <br></br>
        <br></br>
        {
            `${wordsNotRandom.inEnglish === undefined ? "" : wordsNotRandom.inEnglish}`
        }        
        {
            translateNotRandom && 
            <a className="translation">{wordsNotRandom.inPortuguese === undefined ? "" : " - " + wordsNotRandom.inPortuguese}</a>
        }
        <br></br>
        <br></br>
        <button id="first-word-not-random" onClick={first}>Primeira palavra da lista</button>
        <button id="descending-order" onClick={descendingOrder}> - </button>
        <button id="ascending-order" onClick={ascendingOrder}> + </button>
        <button id="listen-word-not-random" onClick={listenWordUserNotRandom} disabled={DisabledNotRandom} style={{ color: DisabledNotRandom ? 'red' : 'green' }}>Ouvir</button>
        <button id="translation-word-not-random" onClick={() => setTranslateNotRandom(!translateNotRandom)}>Tradução</button>
        <button id="edit-word-not-random" onClick={editWordsNotRandom}>Editar</button>  
        <button id="delete-word-not-random" onClick={()=>deleteWords(wordsNotRandom)}>Deletar</button>
        <button onClick={() => navigate("/add")}>ADICIONAR</button>
        <br></br>
        <br></br>
        <hr></hr>
        <br></br>
        <h3>LISTA COMPLETA</h3>        
        <br></br>
        {
            wordByWord?.map(word =>
            <ul 
                key={word.id} id="wordByWord">
                {word.inEnglish} {word.toShow && 
                <a className="translation">{word.inPortuguese === undefined ? "" : " - " + word.inPortuguese}</a>}                
                <button id="translation" onClick={() => showEachWord(word)}>Traduzir</button> 
                <button onClick={() => navigate(`/Edit/${word.id}`)}>Editar</button>                
                <button id="delete" onClick={()=>deleteEachWord(word)}>Deletar</button>
            </ul>)
        }
        <br></br>        
        <hr></hr>
    </>
}
