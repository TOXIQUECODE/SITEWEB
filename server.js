const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

// WebSocket sur le même serveur HTTP (port 80)
const wss = new WebSocket.Server({ noServer: true });

// Gère les connexions WebSocket
wss.on('connection', (ws) => {
  console.log('🟢 Nouveau client WebSocket connecté');

  ws.on('message', (message) => {
    console.log('📨 Message reçu :', message.toString());
    ws.send('✅ Réponse du serveur : ' + message);
  });

  ws.on('close', () => {
    console.log('🔴 Client déconnecté');
  });
});

// Redirige les connexions WebSocket à ws://<ip>/ (par exemple depuis l’Arduino)
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Sert les fichiers statiques depuis le dossier public (HTML, JS, CSS…)
app.use(express.static('public'));

// Démarre le serveur HTTP sur le port 80
server.listen(80, () => {
  console.log('🚀 Serveur HTTP & WebSocket en écoute sur le port 80');
});
