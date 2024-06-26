# Photo Gallery WebApp

## Descrizione del Progetto
Questa applicazione web è stata commissionata da un fotografo per mostrare agli utenti le sue foto più belle. Include un'area di amministrazione per gestire le foto e un'interfaccia pubblica per visualizzarle. Il progetto supporta anche più utenti, inclusa la figura di un superadmin che può gestire la visibilità delle foto.

## Funzionalità

### Pubbliche
- **Homepage**: Visualizza le foto visibili, filtrabili per titolo.
- **Form di Contatto**: Un semplice form con campi email e messaggio. Il clic sul tasto invia farà partire una richiesta a un'API che salverà il messaggio nel database.

### Amministrazione
- **Visualizzazione delle Foto**: Possibilità di vedere tutte le foto inserite con opzioni di filtro.
- **Dettagli della Foto**: Visualizzare i dettagli di una singola foto.
- **Aggiunta di Nuove Foto**: Possibilità di aggiungere nuove foto con validazione.
- **Modifica delle Foto**: Possibilità di modificare le foto esistenti con validazione.
- **Cancellazione delle Foto**: Possibilità di cancellare le foto.
- **Gestione delle Categorie**: Creazione e cancellazione delle categorie.

### Multiutente
- **Amministratori**: Gli utenti possono gestire solo le proprie foto.
- **Superadmin**: Può nascondere qualsiasi foto presente sulla piattaforma, gestendo la visibilità pubblica delle foto.

## Tecnologie Utilizzate

### Frontend
- **React**
- **React Router**
- **Axios**: Per le richieste HTTP.

### Backend
- **Node.js**
- **Express**
- **MySQL con Prisma**
- **Multer**: Per l'upload delle immagini.
- **JWT**: Per l'autenticazione.

## Installazione

### Prerequisiti
- Node.js
- npm o yarn
- MySQL

### Istruzioni
1. Clonare il repository:
    ```sh
    git clone https://github.com/tuo-username/photo-gallery-app.git
    ```

2. Installare le dipendenze per il backend:
    ```sh
    cd backend
    npm install
    ```

3. Configurare Prisma:
    - Creare un file `.env` nella cartella `backend` con le seguenti variabili:
      ```env
      DATABASE_URL="mysql://user:password@localhost:3306/database_name"
      JWT_SECRET=your_jwt_secret
      ```
    - Introspezionare il database:
      ```sh
      npx prisma db pull
      ```
    - Generare il client Prisma:
      ```sh
      npx prisma generate
      ```

4. Eseguire le migrazioni per configurare il database:
    ```sh
    npx prisma migrate dev --name init
    ```

5. Avviare il server backend:
    ```sh
    npm run dev
    ```

## Struttura delle API

### Foto
- **GET /api/photos**: Ottiene tutte le foto (filtrabili).
- **GET /api/photos/:id**: Ottiene i dettagli di una singola foto.
- **POST /api/photos**: Aggiunge una nuova foto.
- **PUT /api/photos/:id**: Modifica una foto esistente.
- **DELETE /api/photos/:id**: Cancella una foto.

### Categorie
- **GET /api/categories**: Ottiene tutte le categorie.
- **POST /api/categories**: Aggiunge una nuova categoria.
- **DELETE /api/categories/:id**: Cancella una categoria.

### Contatti
- **POST /api/contact**: Salva un messaggio di contatto nel database.

## Autenticazione
L'autenticazione viene gestita tramite JSON Web Tokens (JWT). Gli utenti devono autenticarsi per accedere alle funzionalità amministrative.

## Note Finali
Questo progetto è stato progettato per essere facilmente estendibile e mantenibile. Sentitevi liberi di contribuire o di segnalare eventuali problemi.