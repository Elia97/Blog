---
title: "NPM e il cuore del progetto: package.json"
description: "Scopri come gestire le dipendenze, automatizzare task e organizzare i tuoi progetti Node.js con NPM."
pubDate: "Mar 08 2024"
heroImage: "/blog-placeholder-nodejs.jpg"
series: "primi-passi-con-nodejs"
order: 8
---

Dopo aver capito come funziona l'asincronia, è il momento di imparare a dare una struttura professionale ai nostri progetti. Benvenuti nel mondo di **NPM (Node Package Manager)**.

NPM è il repository di software più grande al mondo. Ma oltre a permetterci di scaricare librerie create da altri, è lo strumento fondamentale per gestire il ciclo di vita delle nostre applicazioni.

### 1. Il comando `npm init`

Ogni progetto Node.js "serio" inizia con un file chiamato `package.json`. Per crearlo, apri il terminale nella cartella del tuo progetto e digita:

```bash
npm init
```

Ti verranno fatte alcune domande (nome, versione, descrizione). Se vuoi saltare tutto e usare i valori predefiniti, usa `npm init -y`.

### 2. Anatomia del `package.json`

Questo file è la carta d'identità del tuo progetto. Ecco le sezioni principali:

- **name & version**: Identificano il pacchetto.
- **scripts**: Comandi personalizzati. Ad esempio, `"start": "node index.js"` ti permette di lanciare l'app con `npm start`.
- **dependencies**: Librerie necessarie per far girare l'app (es. Express).
- **devDependencies**: Strumenti necessari solo durante lo sviluppo (es. test runner, linters).

### 3. Installare pacchetti

Esistono tre modi principali per installare pacchetti:

1. **Locale (default)**: `npm install <nome>`
   Scarica il pacchetto nella cartella `node_modules/` del progetto e lo aggiunge alle `dependencies`.
2. **Development**: `npm install <nome> --save-dev`
   Lo aggiunge alle `devDependencies`.
3. **Globale**: `npm install -g <nome>`
   Installa il pacchetto in una cartella di sistema per usarlo come comando CLI ovunque.

### 4. La cartella `node_modules` e il file `lock`

- **node_modules**: È la cartella "pesante" dove risiedono i codici delle librerie. **Mai** includerla in Git (usa un file `.gitignore`).
- **package-lock.json**: Viene generato automaticamente. Garantisce che chiunque scarichi il tuo progetto installi esattamente le stesse versioni delle dipendenze, evitando bug "funzionava solo sul mio PC".

### Esercitazione

Prova a creare una cartella, lancia `npm init -y` e installa una libreria famosa come `lodash`. Osserva come cambia il tuo `package.json`!

---

Nel prossimo articolo metteremo in pratica tutto questo creando la nostra prima vera applicazione Console!
