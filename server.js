const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

// Middleware pour servir les fichiers statiques
app.use(express.static('public'));

// Route pour le test
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Socket.io
io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');

  socket.on('commande', (data) => {
    console.log('Commande reçue:', data);
    // Ici tu peux relier à Arduino via Serial si tu veux
  });

  socket.on('disconnect', () => {
    console.log('Utilisateur déconnecté');
  });
});

http.listen(PORT, () => {
  console.log(`Serveur en ligne sur le port ${PORT}`);
});
