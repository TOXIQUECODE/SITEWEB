const WebSocket = require('ws');
const http = require('http');

// Créer un serveur HTTP (optionnel, pour l'usage avec WebSocket)
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Serveur WebSocket en cours d\'exécution\n');
});

// Créer le serveur WebSocket
const wss = new WebSocket.Server({ server });

// Écouter les connexions WebSocket
wss.on('connection', (ws) => {
  console.log('Un client est connecté');

  // Lorsqu'un message est reçu du client
  ws.on('message', (message) => {
    console.log('Message reçu :', message);
    
    // Exemple de traitement du message (ajuste selon ton besoin)
    if (message === 'home') {
      console.log('Commande "home" reçue');
    }

    // Répondre au client
    ws.send('Message reçu : ' + message);
  });

  // Lorsqu'un client se déconnecte
  ws.on('close', () => {
    console.log('Client déconnecté');
  });

  // Envoie un message au client lorsque la connexion est établie
  ws.send('Connexion WebSocket réussie');
});

// Démarrer le serveur sur le port 10000 (ou celui que tu as choisi)
const port = process.env.PORT || 10000;
server.listen(port, () => {
  console.log(`Serveur WebSocket en écoute sur le port ${port}`);
});
