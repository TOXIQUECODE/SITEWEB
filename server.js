const WebSocket = require('ws');
const express = require('express');
const app = express();

// Créer un serveur HTTPS avec Express (Render gère les certificats SSL automatiquement)
const server = app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur le port ${process.env.PORT}`);
});

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

// Servir les fichiers statiques dans le dossier 'public'
app.use(express.static('public'));

// Exemple de route
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur sécurisé !');
});
