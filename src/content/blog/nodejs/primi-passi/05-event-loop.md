---
title: "Il cuore di Node.js: L'Event Loop"
description: "Scopri come l'Event Loop permette a Node.js di gestire migliaia di operazioni contemporaneamente pur essendo single-threaded."
pubDate: "Jan 14 2026"
tags: ["event-loop", "asincronia", "performance"]
series: "primi-passi-con-nodejs"
order: 5
---

Node.js è un framework event-driven e single-threaded che esegue codice asincrono non bloccante. E' molto efficiente per quanto riguarda la memoria grazie a queste funzionalità. Oltre al fatto di essere single-threaded, Node.js può eseguire operazioni non bloccanti grazie all'event loop.

L'Event Loop ha un solo compito: monitorare lo stack delle callback, la code delle callback e la code dei microtask. Se lo stack è vuoto, l'Event loop prenderà il primo evento presente nella coda dei microtask, poi dalla coda delle callback, e pusherà nello stack il quale eseguira le funzioni. Un iteratore di questo tipo è chiamato tick nell'Event Loop.
