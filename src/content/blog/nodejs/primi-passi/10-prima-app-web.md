---
title: "Il tuo primo Web Server: Hello World dal Browser"
description: "Chiudiamo la guida pratica creando un server HTTP nativo. Scopri come Node.js gestisce il web."
pubDate: "Mar 10 2024"
heroImage: "/blog-placeholder-nodejs.jpg"
series: "primi-passi-con-nodejs"
order: 10
---

Siamo arrivati alla fine di questa prima introduzione. Abbiamo visto la storia, l'architettura, l'asincronia e il terminale. Ma Node.js brilla davvero quando si parla di **Web**.

Invece di usare un server già pronto (come Apache o Nginx), con Node.js **scriviamo noi il server**.

### Il modulo `http`

Node.js ha un modulo integrato chiamato `http` che può gestire richieste e risposte web senza bisogno di librerie esterne (come Express, che impareremo più avanti).

### Crea il tuo server

Crea un file chiamato `server.js`:

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  // Impostiamo l'header della risposta
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

  // Scriviamo il contenuto
  res.write("<h1>Benvenuto sul mio server Node.js! 🚀</h1>");
  res.write("<p>Hai richiesto il percorso: " + req.url + "</p>");

  // Chiudiamo la connessione
  res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});
```

### Provalo subito!

1. Esegui `node server.js`.
2. Apri il tuo browser e vai su `http://localhost:3000`.
3. Prova a cambiare l'URL (es: `http://localhost:3000/contatti`) e guarda come cambia il messaggio nella pagina.

### Cosa succede qui?

Grazie all'**Event Loop**, questo server può gestire migliaia di visitatori contemporaneamente su un singolo thread. Ogni volta che qualcuno visita l'indirizzo, Node esegue la funzione "callback" che abbiamo definito in `createServer`.

---

### 🎉 Congratulazioni!

Hai completato il modulo **"Primi Passi"**. Ora hai le basi solide per esplorare framework come Express, database come MongoDB e il fantastico mondo dello sviluppo full-stack.

**Qual è il prossimo passo?** Continua a sperimentare nel nostro **Playground** integrato!
