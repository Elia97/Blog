---
title: "Il cuore di Node.js: L'Event Loop"
description: "Scopri come l'Event Loop permette a Node.js di gestire migliaia di operazioni contemporaneamente pur essendo single-threaded."
pubDate: "Jan 14 2026"
tags: ["event-loop", "asincronia", "performance"]
series: "primi-passi-con-nodejs"
order: 5
---

Abbiamo visto che Node.js usa un modello I/O non bloccante. Ma come fa, concretamente, a tenere traccia di tutte le operazioni che "stanno finendo" mentre lui va avanti a fare altro? La risposta è l'**Event Loop**.

## Single Threaded ma instancabile

A differenza di altri server che creano un nuovo "canale" (thread) per ogni utente che si connette, Node.js ne usa **uno solo**.

Immagina un cameriere in un ristorante:

1. Prende l'ordine al Tavolo A.
2. Invece di fissare lo chef finché il piatto non è pronto (modello bloccante), porta l'ordine in cucina e corre subito al Tavolo B a prendere un altro ordine.
3. Quando il piatto del Tavolo A è pronto, lo chef suona un campanello (**evento**).
4. Il cameriere, appena finisce quello che sta facendo, sente il campanello e serve il Tavolo A.

Questo cameriere è l'**Event Loop**.

## Le fasi del loop

L'Event Loop non gira a caso; segue un ordine preciso di priorità in ogni suo "giro" (chiamato _tick_):

1. **Timer**: Controlla se ci sono `setTimeout` o `setInterval` scaduti.
2. **I/O Callbacks**: Gestisce i risultati di operazioni di rete o lettura file appena completate.
3. **Poll**: Aspetta nuove connessioni o dati in entrata.
4. **Check**: Esegue codice specifico subito dopo il polling (come `setImmediate`).

## Perché è importante saperlo?

Se scrivi un codice molto pesante che impiega 10 secondi per finire (ad esempio un calcolo matematico infinito), il cameriere rimarrà bloccato in cucina e non potrà rispondere a nessun altro cliente. Questo si chiama **"Blocking the Event Loop"** ed è l'errore n. 1 da evitare in Node.js.

---

Ora che sappiamo come Node gestisce il traffico, vediamo come noi sviluppatori possiamo scrivere codice che "parli" correttamente con l'Event Loop usando le **Callback** e le **Promise**.
