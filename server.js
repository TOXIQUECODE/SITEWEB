const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Crée une application Express
const app = express();

// Crée un serveur HTTP en utilisant Express
const server = http.createServer(app);

// Attache Socket.io au serveur HTTP
const io = socketIo(server);

// Récupère le port à partir de l'environnement ou utilise un port par défaut (par exemple 10000)
const port = process.env.PORT || 10000;

// Serveur WebSocket avec Socket.io
io.on('connection', (socket) => {
  console.log('Un client est connecté');

  // Écoute un événement 'message' du client
  socket.on('message', (data) => {
    console.log('Message reçu :', data);
    socket.emit('response', 'Message reçu par le serveur');
  });

  // Lorsqu'un client se déconnecte
  socket.on('disconnect', () => {
    console.log('Client déconnecté');
  });
});

// Démarre le serveur sur le port dynamique
server.listen(port, () => {
  console.log(`Serveur WebSocket en écoute sur le port ${port}`);
});
