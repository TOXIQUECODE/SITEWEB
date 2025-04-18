const https = require('https');
const WebSocket = require('ws');
const express = require('express');
const app = express();

// Créer un serveur HTTPS avec Express (Render gère les certificats SSL automatiquement)
const server = https.createServer(app);

// Créer un serveur WebSocket sécurisé (WSS) en associant avec le serveur HTTPS
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Nouvelle connexion WebSocket');
  
  // Recevoir les messages
  ws.on('message', (message) => {
    console.log('Message reçu:', message);
    ws.send('Réponse du serveur WebSocket');
  });
});

// Lancer le serveur HTTPS sur le port 443 (port HTTPS par défaut)
server.listen(443, () => {
  console.log('Serveur HTTPS démarré sur le port 443');
});

// Servir les fichiers statiques dans le dossier 'public'
app.use(express.static('public'));

// Exemple de route, tu peux personnaliser en fonction de tes besoins
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur sécurisé !');
});
