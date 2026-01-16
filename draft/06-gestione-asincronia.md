---
title: "Gestire l'Asincronia: da Callback a Async/Await"
description: "L'evoluzione del codice asincrono in JavaScript: come evitare il Callback Hell e scrivere codice pulito."
pubDate: "Jan 14 2026"
tags: ["javascript", "asincronia", "promises", "async-await"]
series: "primi-passi-con-nodejs"
order: 6
---

In Node.js, l'asincronia è ovunque. Negli anni, il modo in cui gestiamo le risposte del sistema è cambiato radicalmente, rendendo il codice sempre più leggibile.

## 1. Le Callback

Il metodo originale. Una funzione viene passata come argomento a un'altra e viene eseguita solo quando l'operazione è finita.

```javascript
fs.readFile("file.txt", (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
```

### Il problema: Callback Hell

Quando devi fare molte operazioni in sequenza, le callback si annidano l'una dentro l'altra, creando il famoso "Piramide della morte" o **Callback Hell**, rendendo il codice impossibile da mantenere.

## 2. Le Promise

Introdotte per risolvere il disordine delle callback, le Promise rappresentano un'operazione che "promette" di restituire un valore in futuro.

```javascript
readFilePromise("file.txt")
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

Il codice diventa lineare e più facile da leggere.

## 3. Async / Await (Lo Standard Moderno)

È solo "zucchero sintattico" sopra le Promise, ma cambia tutto. Ci permette di scrivere codice asincrono come se fosse sincrono.

```javascript
async function leggiDati() {
  try {
    const data = await readFilePromise("file.txt");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

## Quale scegliere?

Oggi, **Async/Await** è la scelta predefinita per il 99% dei casi. È pulito, gestisce bene gli errori con `try/catch` e rende il debug molto più semplice. Le callback sono ancora presenti in molte API core di Node.js, ma spesso vengono "trasformate" in Promise per essere usate in modo moderno.

---

Con questo abbiamo coperto le fondamenta di Node.js. Sei pronto per passare dalla teoria alla pratica e iniziare a costruire il tuo primo server!
