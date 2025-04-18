const WebSocket = require('ws');
const express = require('express');
const app = express();

// Créer un serveur HTTPS avec Express (Render gère les certificats SSL automatiquement)
const server = app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur le port ${process.env.PORT}`);
});

// Créer un serveur WebSocket sécurisé (WSS) en associant avec le serveur HTTPS
const wss = new WebSocket.Server({ server });

// Lorsqu'un client se connecte
wss.on('connection', (ws) => {
  console.log('✅ Nouvelle connexion WebSocket');

  // Buffer pour accumuler les données partiellement reçues
  let messageBuffer = '';

  // Lorsqu’un message arrive (peut être un fragment)
  ws.on('message', (data) => {
    messageBuffer += data.toString(); // Convertit Buffer en string et ajoute au buffer

    // Traite tous les messages complets (terminés par \n)
    let index;
    while ((index = messageBuffer.indexOf('\n')) !== -1) {
      const raw = messageBuffer.slice(0, index);
      messageBuffer = messageBuffer.slice(index + 1);

      try {
        const json = JSON.parse(raw);
        console.log("📨 JSON reçu :", json);

        // 🔁 Exemple de traitement : on renvoie une confirmation
        ws.send(JSON.stringify({ status: "ok", mode: json.mode || "inconnu" }));
      } catch (err) {
        console.warn("⚠️ JSON invalide reçu :", raw);
      }
    }
  });

  // Gérer la fermeture
  ws.on('close', () => {
    console.log('🔴 Connexion WebSocket fermée');
  });

  ws.on('error', (err) => {
    console.error('❌ Erreur WebSocket :', err);
  });
});

// Servir les fichiers statiques dans le dossier 'public'
app.use(express.static('public'));

// Exemple de route
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur sécurisé !');
});
