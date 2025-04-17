const WebSocket = require('ws');
const express = require('express');
const app = express();

// Créer un serveur WebSocket avec ws://
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('Message reçu :', message);
    ws.send('Réponse du serveur');
  });
});

// Gérer les connexions WebSocket dans le serveur HTTP
app.server = app.listen(80, () => {
  console.log('Serveur démarré sur le port 80');
});

app.server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

app.use(express.static('public')); // Sert les fichiers statiques
