# Progetto candidatura UserBot

## Introduzione

Questa applicazione legge un file da un percorso specificato dall'utente e fornisce un'analisi del contenuto, includendo il conteggio delle parole, delle lettere, degli spazi e delle parole che si ripetono più di 10 volte. L'applicazione espone un'API REST utilizzando Fastify per interagire con queste funzionalità.

## Design Pattern Scelto
Come Design Pattern è stato utilizzato lo Strategy Pattern per la lettura dei file. Grazie a questo pattern è possibile intercambiare facilmente la classe responsabile della lettura di un file di testo. <br>
In questo caso abbiamo due classi: una per i file locali chiamata `LocalFileReader` e una per i file disponibili via Web chiamata `RemoteFileReader`.

## Installazione
```sh

# Installare le dipendenze
npm install

# Avviare server in locale (la porta di default è 9000)
npm run dev

# Per eseguire gli unit test
npm test
```

## Endpoint dell'API

`POST /analyze` \
Analizza un file specificato tramite un percorso locale o un URL.

#### Body
path (string): Il percorso del file locale o l'URL del file da analizzare.
```json
{
    "path": "local/file/path.txt" || "http://server.com/text.txt"
}
```
#### Response

200 OK: Restituisce l'analisi del file.<br>
400 Bad Request: Se il parametro path non è fornito o viene inserito un file non valido.<br>
404 Not Found: Se il file inserito non viene trovato.<br>
500 Internal Server Error: Se c'è un errore durante la lettura o l'analisi del file.

## Testing

Sono stati creati 10 unit test sulla parte di Business Logic dell'applicazione che è concentrata nel file `analyzer.ts` in modo da garantire il funzionamento corretto dell'app. <br> I test sono contenuti nella cartella `test`

## Rilascio
Per il rilascio dell'app è stato creato un Dockerfile. Per provare un rilascio eseguire i seguenti comandi.
```sh

# Build dell'immagine
docker build -t node-file-analyzer .   

# Avvio del container
docker run -p 9000:9000 node-file-analyzer
```

