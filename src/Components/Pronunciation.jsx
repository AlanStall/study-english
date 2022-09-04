import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import './Pronunciation.css'
import backgroundPronunciation from "../../public/rawad-semaan-unsplash.webp";

export function Pronunciation() {
  
  const navigate = useNavigate();
  
  const words = ["ability", "able", "about", "above", "accept", "according", "account", "across", "act", "action", "activity", "actually", "add", "address", "administration", "adult", "affect", "after", "again", "against", "age", "agency", "agent", "agree", "agreement", "all", "allow", "almost", "alone", "along", "already", "also", "although", "always", "american", "among", "amount", "analysis", "and", "animal", "another", "answer", "any", "anyone", "anything", "appear", "approach", "area", "argue", "arm", "around", "arrive", "art", "article", "artist", "ask", "assume", "attack", "attention", "attorney", "audience", "author", "authority", "available", "avoid", "away", "baby", "back", "bad", "bag", "ball", "bank", "bar", "be", "beat", "beautiful", "because", "become", "bed", "before", "begin", "behavior", "behind", "believe", "benefit", "best", "better", "between", "beyond", "big", "bill", "billion", "black", "blood", "blue", "board", "body", "book", "born", "both", "box", "boy", "break", "bring", "brother", "budget", "build", "building", "business", "but", "call", "camera", "campaign", "can", "cancer", "candidate", "capital", "car", "card", "care", "career", "case", "catch", "cause", "cell", "center", "central", "century", "certain", "certainly", "chair", "challenge", "chance", "change", "character", "charge", "check", "child", "choice", "choose", "church", "citizen", "city", "civil", "claim", "class", "clear", "clearly", "close", "coach", "cold", "collection", "college", "color", "come", "commercial", "community", "company", "compare", "computer", "concern", "condition", "conference", "Congress", "consider", "consumer", "contain", "continue", "control", "cost", "could", "country", "couple", "course", "court", "cover", "create", "crime", "cultural", "culture", "cup", "current", "customer", "cut", "dark", "data", "daughter", "day", "dead", "deal", "death", "debate", "decade", "decide", "decision", "deep", "defense", "degree", "democrat", "democratic", "describe", "design", "despite", "detail", "determine", "develop", "development", "die", "difference", "different", "difficult", "dinner", "direction", "director", "discover", "discuss", "discussion", "disease", "do", "doctor", "dog", "down", "draw", "dream", "drive", "drop", "drug", "during", "each", "early", "east", "easy", "eat", "economic", "economy", "edge", "education", "effect", "effort", "either", "election", "else", "employee", "end", "energy", "enjoy", "enough", "enter", "entire", "environment", "environmental", "especially", "establish", "even", "evening", "event", "ever", "every", "everybody", "everyone", "everything", "evidence", "exactly", "example", "executive", "exist", "expect", "experience", "expert", "explain", "face", "fact", "factor", "fail", "fall", "family", "far", "fast", "father", "fear", "federal", "feel", "feeling", "few", "field", "fight", "figure", "fill", "film", "final", "finally", "financial", "find", "fine", "finger", "finish", "fire", "firm", "first", "fish", "floor", "focus", "follow", "food", "foot", "force", "foreign", "forget", "form", "former", "forward", "free", "friend", "front", "full", "future", "game", "garden", "gas", "general", "generation", "get", "girl", "give", "glass", "go", "good", "government", "great", "green", "ground", "group", "grow", "growth", "guess", "gun", "guy", "hair", "half", "hand", "hang", "happen", "happy", "hard", "have", "he", "head", "health", "heart", "heat", "heavy", "help", "her", "here", "herself", "hi", "him", "himself", "his", "history", "hit", "hold", "home", "hope", "hospital", "hot", "hotel", "house", "how", "however", "huge", "human", "hundred", "husband", "idea", "identify", "if", "image", "imagine", "impact", "important", "improve", "in", "include", "including", "increase", "indeed", "indicate", "individual", "industry", "information", "inside", "instead", "institution", "interest", "interesting", "international", "interview", "into", "investment", "involve", "issue", "it", "item", "it's", "itself", "job", "join", "just", "keep", "key", "kid", "kill", "kind", "kitchen", "knowledge", "land", "language", "large", "last", "late", "later", "laugh", "law", "lawyer", "lead", "leader", "learn", "leave", "left", "leg", "legal", "less", "let", "letter", "level", "lie", "life", "light", "like", "likely", "line", "list", "listen", "little", "live", "local", "long", "look", "lose", "love", "low", "machine", "magazine", "main", "maintain", "major", "majority", "make", "man", "manage", "management", "manager", "many", "market", "marriage", "material", "matter", "may", "maybe", "me", "mean", "measure", "media", "medical", "meet", "meeting", "member", "memory", "mention", "message", "method", "middle", "might", "military", "million", "mind", "minute", "miss", "mission", "model", "modern", "moment", "money", "month", "more", "morning", "most", "mother", "mouth", "move", "movement", "movie", "much", "music", "must", "my", "myself", "name", "nation", "national", "natural", "nature", "near", "nearly", "necessary", "need", "network", "never", "new", "news", "newspaper", "next", "nice", "night", "no", "none", "nor", "north", "not", "note", "nothing", "notice", "now", "n't", "number", "occur", "of", "off", "offer", "office", "officer", "official", "often", "oh", "oil", "okay", "old", "on", "once", "only", "onto", "open", "operation", "opportunity", "option", "or", "order", "organization", "other", "our", "out", "outside", "over", "page", "pain", "painting", "paper", "parent", "part", "participant", "particular", "particularly", "partner", "party", "pass", "patient", "pattern", "peace", "people", "per", "perform", "performance", "perhaps", "person", "personal", "phone", "physical", "pick", "picture", "piece", "place", "plan", "plant", "play", "player", "point", "police", "policy", "political", "politics", "poor", "popular", "population", "position", "positive", "possible", "power", "practice", "prepare", "present", "president", "pressure", "pretty", "prevent", "price", "private", "probably", "problem", "process", "produce", "product", "production", "professional", "professor", "program", "project", "property", "protect", "prove", "provide", "public", "pull", "purpose", "put", "quality", "question", "quickly", "quite", "race", "radio", "raise", "range", "rate", "rather", "reach", "read", "ready", "real", "reality", "realize", "really", "reason", "receive", "recent", "recently", "recognize", "record", "red", "reduce", "reflect", "region", "relate", "relationship", "religious", "remain", "remember", "remove", "report", "represent", "republican", "require", "research", "resource", "respond", "response", "responsibility", "rest", "result", "return", "reveal", "rich", "right", "rise", "risk", "road", "rock", "role", "room", "rule", "run", "safe", "same", "save", "say", "scene", "school", "science", "scientist", "score", "season", "seat", "second", "section", "security", "see", "seek", "seem", "sell", "send", "senior", "sense", "series", "serious", "serve", "service", "set", "several", "sex", "sexual", "shake", "share", "shoot", "short", "shot", "should", "shoulder", "show", "side", "sign", "significant", "similar", "simple", "simply", "since", "sing", "single", "sister", "site", "situation", "size", "skill", "skin", "small", "smile", "so", "social", "society", "soldier", "some", "somebody", "someone", "something", "sometimes", "song", "soon", "sort", "sound", "source", "south", "southern", "space", "speak", "special", "specific", "speech", "spend", "sport", "spring", "staff", "stage", "stand", "standard", "star", "start", "state", "statement", "station", "stay", "step", "still", "stock", "stop", "store", "story", "strategy", "street", "strong", "structure", "student", "study", "stuff", "style", "subject", "success", "successful", "suddenly", "suffer", "suggest", "summer", "support", "sure", "surface", "system", "table", "take", "talk", "task", "tax", "teacher", "technology", "television", "tell", "term", "test", "than", "thank", "that", "the", "their", "them", "themselves", "then", "theory", "there", "these", "they", "think", "third", "this", "those", "though", "thought", "thousand", "threat", "through", "throughout", "thus", "time", "today", "together", "tonight", "top", "total", "tough", "toward", "town", "trade", "traditional", "training", "travel", "treatment", "tree", "trial", "trip", "trouble", "true", "truth", "try", "turn", "tv", "type", "under", "understand", "unit", "until", "up", "us", "use", "usually", "value", "various", "very", "victim", "view", "violence", "visit", "voice", "vote", "wait", "walk", "wall", "want", "war", "watch", "water", "way", "we", "weapon", "week", "well", "west", "western", "what", "whatever", "when", "where", "which", "while", "white", "who", "whole", "whose", "why", "wife", "will", "win", "wind", "window", "wish", "with", "within", "without", "woman", "wonder", "word", "work", "worker", "world", "would", "write", "wrong", "yard", "yeah", "year", "yes", "yet", "you", "young", "your", "yourself"];
  
  const [ word , setWord ] = useState(randomWord());
  const [ spoken , setSpoken ] = useState("");
  const [ message , setMessage ] = useState("");
  const [ disabled , setDisabled ] = useState(false);
  
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function randomWord(){
    return words[randomIntFromInterval(0 , words.length - 1)];        
  }

  function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  function wordShow(){
    setWord(randomWord());
  }  
  
  function updateWord(){      
    wordShow();
    setSpoken("");
    setMessage("");
    setDisabled(false);
  }

  async function listenWord(){
    const speech = new SpeechSynthesisUtterance();
      speech.text = word;
      speech.lang = "en-US";
      window.speechSynthesis.speak(speech); 
      await sleep(0);     
      setDisabled(true);
      await sleep(1000);
      setDisabled(false);
  }

  function speakWord(){
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setSpoken(transcript);
        check(transcript);
    };
  }

  let nextWord = "";
  async function check(transcript){         
    if(word === transcript || nextWord === transcript){             
      setMessage(<h1 style={{color: "blue"}}>Você acertou!!!</h1>);
      await sleep(2000);
      nextWord = randomWord(); 
      setWord(nextWord);      
      setSpoken("");
      setMessage("");
      speakWord();
      console.log(words.length);
      }else{
        setMessage(<h1 style={{color: "red"}}>Você errou. Tente novamente ou atualize a palavra</h1>);        
      }    
  }

  return (
    <>
      <div id="page" style={{backgroundImage: `url(${backgroundPronunciation})`, width: "100%"}}> 
        < Header />
        <div className="image" >
          <div className="card bg-base-100 shadow-xl card-practice">
            <div className="display-words">
              <button className="btn btn-outline btn-primary" onClick={updateWord}>Atualizar</button>
              <button className="btn btn-outline btn-primary" onClick={listenWord} disabled={disabled} style={{ color: disabled ? 'red' : '' }}>Ouvir</button>
              <button className="btn btn-outline btn-primary" onClick={speakWord}>PRONUNCIAR</button>            
              <h1 className="word-english">{word}</h1>
              <h1 className="word-portuguese">{spoken}</h1>
              <p className="message">{message}</p>
            </div>           
            <br></br>          
            <br></br>  
          </div>            
        </div>
        <div id="h3-button">                  
          <h3 className="font-bold">Monte sua lista de palavras</h3>                                    
          <button className="btn btn-success btn-start" onClick={() => navigate("/Study-list")}>MINHA LISTA</button>
        </div>          
      </div>
      < Footer />
    </>
  )
}


 