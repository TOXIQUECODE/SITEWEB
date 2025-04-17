const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// Crée une application Express
const app = express();

// Crée un serveur HTTP en utilisant Express
const server = http.createServer(app);

// Crée un serveur WebSocket
const wss = new WebSocket.Server({ server });

// Lorsque quelqu'un se connecte à notre WebSocket
wss.on('connection', (ws) => {
  console.log('Un client est connecté');

  // Envoie un message à l'Arduino lors de la connexion
  ws.send('home');  // Par exemple, envoie "home" comme test

  // Quand on reçoit un message de l'Arduino
  ws.on('message', (message) => {
    console.log('Message reçu depuis Arduino:', message);
  });

  // Quand la connexion se termine
  ws.on('close', () => {
    console.log('Client déconnecté');
  });
});

// Servez les fichiers statiques dans le dossier 'public' (si besoin)
app.use(express.static('public'));

// Démarre le serveur HTTP sur le port 10000
const port = process.env.PORT || 5995;
server.listen(port, () => {
  console.log(`Serveur WebSocket en écoute sur le port ${port}`);
});
