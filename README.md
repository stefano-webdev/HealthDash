# HealthDash 🏥

**HealthDash** simula una dashboard ospedaliera sviluppata in **React** e **TypeScript**, con supporto alla navigazione tramite **React Router**. Questo progetto riproduce il comportamento di una dashboard ospedaliera reale, includendo la gestione di personale, pazienti, finanze, report e impostazioni. I dati provengono da un file JSON locale, con persistenza temporanea tramite localStorage il quale viene resettato in automatico ogni 24 ore, oppure ogni 6 ore per i turni del personale.

## 🔧 Tecnologie utilizzate

- **React** con Hooks come `useState`, `useEffect`, `useRef` e `useLocation`.
- **React Router** e <NavLink /> per la navigazione tra le pagine.
- **TypeScript** per la tipizzazione, sicurezza e robustezza del codice.
- **Vite** come build tool.
- **Recharts** per la visualizzazione dei dati tramite grafici.

## Funzionalità principali

- **Home** con panoramica generale: numero di pazienti attivi, personale in servizio e incassi mensili con grafici.
- **Personale** con lista dipendenti, dettagli anagrafici, professionali e operazioni CRUD, ovvero aggiungere, modificare o eliminare dipendenti. Reset automatico dei turni ogni 6 ore (ricaricare la pagina per vedere le modifiche).
- **Pazienti** con dati anagrafici e clinici simulati, operazioni CRUD per manipolare i dati.
- **Finanze** con saldo attuale, transazioni simulate, incassi mensili e simulazione creazione fattura.
- **Report** basati sui dati con statistiche e grafici interattivi.
- **Impostazioni** con alcune opzioni simulate.

## Principi seguiti

Durante lo sviluppo sono stati seguiti i principi fondamentali di React:

- Creazione di **componenti puri, modulari e riutilizzabili**.
- **Aggiornamento dello stato** tramite Hook `useState` come unico mezzo per riflettere i cambiamenti nel DOM.
- Navigazione SPA con **React Router**.
- Persistenza con **LocalStorage**, resettando i dati in determinati momenti per simulare dinamicità tra un giorno e l'altro.

## 📁 Struttura del progetto

La struttura segue uno stile modulare suddividendo componenti, pagine, logica e dati in cartelle dedicate come `src`, `components`, `assets`, `public` ecc...

## Bundler / Build tool
Il progetto è gestito tramite Vite.

---

> ⚠️ Questo progetto è stato sviluppato solo a scopo dimostrativo per dimostrare le competenze tecniche. Non utilizza un backend reale e non è destinato all’uso in contesti sanitari reali, pertanto alcuni bottoni o funzionalità non sono volutamente funzionanti.

> 🖼️ Icone
Alcune icone utilizzate in **HealthDash** provengono da [OpenMoji](https://openmoji.org/)  
© OpenMoji contributors — licenza [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.it)
