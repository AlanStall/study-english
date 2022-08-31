import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(2).stores({
  wordsAndPhrases: '++id, inEnglish, inPortuguese, toShow', // Primary key and indexed props  
});
db.open().catch(function (err) {
  console.error (err.stack || err);
})
