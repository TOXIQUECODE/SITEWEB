const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Crée une application Express
const app = express();

// Crée un serveur HTTP en utilisant Express
const server = http.createServer(app);

// Attache Socket.io au serveur HTTP
const io = socketIo(server);

// Récupère le port à partir de l'environnement ou utilise un port par défaut (10000)
const port = process.env.PORT || 10000;

// Sert les fichiers statiques depuis le dossier 'public'
app.use(express.static('public'));

// Route principale
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Serveur WebSocket avec Socket.io
io.on('connection', (socket) => {
  console.log('Un client est connecté');

  // Pour tester, envoie un message vers l'Arduino ou navigateur après connexion
  socket.send("home");

  // Événement de réception de message
  socket.on('message', (data) => {
    console.log('Message reçu :', data);

    // Répond au client pour test
    socket.emit('response', 'Message reçu par le serveur');
  });

  socket.on('disconnect', () => {
    console.log('Client déconnecté');
  });
});

// Démarre le serveur sur le port choisi
server.listen(port, () => {
  console.log(`Serveur WebSocket en écoute sur le port ${port}`);
});
