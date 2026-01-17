---
title: "La tua prima Console App: un convertitore di valuta"
description: "Mettiamo in pratica ciò che abbiamo imparato creando un'applicazione interattiva da riga di comando."
pubDate: "Mar 09 2024"
heroImage: "/blog-placeholder-nodejs.jpg"
series: "primi-passi-con-nodejs"
order: 9
---

È il momento di smettere di leggere e iniziare a costruire! In questo articolo creeremo un piccolo script che interagisce con l'utente direttamente dal terminale.

### Il modulo `readline`

Node.js include un modulo integrato chiamato `readline` che ci permette di leggere dati dallo standard input (`process.stdin`) e scrivere sullo standard output (`process.stdout`).

### Codice del progetto

Crea un file chiamato `converter.js` e incolla questo codice:

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("--- Benvenuto nel Convertitore EUR -> USD ---");

rl.question("Inserisci l'importo in Euro (€): ", (amount) => {
  const eur = parseFloat(amount);

  if (isNaN(eur)) {
    console.error("⚠️ Per favore, inserisci un numero valido.");
  } else {
    const rate = 1.08; // Rapporto fittizio
    const usd = (eur * rate).toFixed(2);
    console.log(`✅ ${eur}€ equivalgono a circa $${usd} USD.`);
  }

  rl.close();
});
```

### Come eseguirlo

1. Assicurati di essere nella cartella corretta.
2. Lancia il comando: `node converter.js`.
3. Rispondi alla domanda e guarda il risultato!

### Cosa abbiamo imparato?

- **Interattività**: Node.js può ascoltare i tasti premuti dall'utente.
- **Conversioni**: Come gestire i tipi di dato in uno script reale.
- **Ciclo di vita**: Lo script termina solo quando chiamiamo `rl.close()`.

---

Pronto per il gran finale? Nel prossimo articolo trasformeremo il tuo computer in un vero Server Web!
