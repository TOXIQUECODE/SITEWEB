const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Créer une application Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir les fichiers statiques (front-end)
app.use(express.static('public'));

// Connexion WebSocket
io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');

  // Recevoir les commandes du robot depuis le client
  socket.on('command', (data) => {
    console.log('Commande reçue :', data);
    // Ici vous pouvez envoyer des commandes à l'Arduino ou gérer l'état du robot
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur est déconnecté');
  });
});

// Lancer le serveur sur le port 3000
server.listen(3000, () => {
  console.log('Le serveur est en cours d\'exécution sur http://localhost:3000');
});
