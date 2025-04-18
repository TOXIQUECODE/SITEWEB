const https = require('https');
const http = require('http');
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

// Créer un serveur HTTP pour rediriger les requêtes HTTP vers HTTPS
const httpServer = http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
});

// Lancer le serveur HTTP sur le port 80 (port HTTP par défaut) pour la redirection
httpServer.listen(80, () => {
  console.log('Serveur HTTP pour redirection vers HTTPS démarré sur le port 80');
});

// Servir les fichiers statiques dans le dossier 'public'
app.use(express.static('public'));

// Exemple de route, tu peux personnaliser en fonction de tes besoins
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur sécurisé !');
});
