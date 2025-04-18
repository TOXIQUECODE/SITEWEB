import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';

const app = express();
const PORT = process.env.PORT || 443;

// Express route de test (optionnel)
app.get('/', (req, res) => {
  res.send('Serveur WebSocket OK');
});

// Crée un serveur HTTP (Render s’occupe du SSL)
const server = http.createServer(app);

// Crée le WebSocket Server
const wss = new WebSocketServer({ server, path: "/socket" });

wss.on('connection', (ws) => {
  console.log('✅ Nouvelle connexion WebSocket !');

  ws.on('message', (msg) => {
    console.log('📨 Reçu :', msg.toString());

    if (msg.toString() === 'PING') {
      ws.send('PONG');
    }
    if (msg.toString() === 'HELLO_ARDUINO') {
      ws.send('👋 Hello Arduino!');
    }
  });

  ws.on('close', () => {
    console.log('❌ Client déconnecté');
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Serveur prêt sur le port ${PORT}`);
});
