import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';
import { WebSocketServer } from 'ws';

// Création de l'application Express
const app = express();
const port = process.env.PORT || 10000;

// Utilisation des fichiers statiques (si besoin)
app.use(express.static('public'));

// Chemin vers le certificat SSL et la clé privée
const privateKey = fs.readFileSync('path/to/private-key.pem', 'utf8');
const certificate = fs.readFileSync('path/to/certificate.pem', 'utf8');
const ca = fs.readFileSync('path/to/ca.pem', 'utf8');

// Créer le serveur HTTPS
const credentials = { key: privateKey, cert: certificate, ca: ca };
const server = https.createServer(credentials, app);

// Créer le serveur WebSocket sécurisé
const wss = new WebSocketServer({ server, path: '/socket' });

wss.on('connection', (ws) => {
  console.log('🔌 Nouveau client WebSocket connecté');

  // Quand un message est reçu du client
  ws.on('message', (message) => {
    console.log('📨 Message reçu :', message.toString());

    // Répondre si besoin
    if (message.toString() === 'HELLO_ARDUINO') {
      ws.send('HELLO_CLIENT');
    }
  });

  // Quand le client se déconnecte
  ws.on('close', () => {
    console.log('❌ Client WebSocket déconnecté');
  });
});

// Lancer le serveur HTTPS
server.listen(port, () => {
  console.log(`🚀 Serveur HTTPS prêt sur le port ${port}`);
});
