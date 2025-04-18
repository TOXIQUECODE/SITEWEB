import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';

const app = express();
const port = process.env.PORT || 10000;

// Serve les fichiers statiques (facultatif)
app.use(express.static('public'));

// Crée le serveur HTTP
const server = http.createServer(app);

// Crée le serveur WebSocket
const wss = new WebSocketServer({ server, path: '/socket' });

// Événement lorsqu'un client se connecte
wss.on('connection', (ws) => {
  console.log('🔌 Nouveau client WebSocket connecté');

  // Quand un message est reçu
  ws.on('message', (message) => {
    console.log('📨 Message reçu :', message.toString());

    // Répondre si on reçoit "HELLO_ARDUINO"
    if (message.toString() === 'HELLO_ARDUINO') {
      ws.send('HELLO_CLIENT');
    }
  });

  // Quand le client se déconnecte
  ws.on('close', () => {
    console.log('❌ Client WebSocket déconnecté');
  });
});

// Lancer le serveur HTTP
server.listen(port, () => {
  console.log(`🚀 Serveur prêt sur le port ${port}`);
});
