import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration pour __dirname avec ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sert les fichiers statiques (ton interface HTML + CSS + JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route fallback pour toujours envoyer le HTML principal
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Crée un serveur HTTP partagé
const server = http.createServer(app);

// WebSocket Server sur la même instance
const wss = new WebSocketServer({ server, path: "/socket" });

wss.on('connection', (ws) => {
  console.log('✅ Nouvelle connexion WebSocket !');

  ws.on('message', (msg) => {
    const message = msg.toString();
    console.log('📨 Reçu :', message);

    if (message === 'PING') {
      ws.send('PONG');
    } else if (message === 'HELLO_ARDUINO') {
      ws.send('👋 Hello Arduino!');
    } else {
      // Tu peux gérer ici les JSON envoyés par les sliders
      try {
        const data = JSON.parse(message);
        if (data.mode === 'slider') {
          console.log(`🔧 Commande sliders - Base: ${data.base}, Bras: ${data.bras}, Main: ${data.main}`);
          ws.send(`🎛️ Commande reçue : base=${data.base}, bras=${data.bras}, main=${data.main}`);
        } else {
          console.log(`🔁 Commande spéciale : ${data.mode}`);
          ws.send(`🔁 Action ${data.mode} en cours...`);
        }
      } catch (e) {
        console.warn('⚠️ Message non compris :', message);
      }
    }
  });

  ws.on('close', () => {
    console.log('❌ Client déconnecté');
  });
});

// Lance le serveur
server.listen(PORT, () => {
  console.log(`🚀 Serveur prêt sur le port ${PORT}`);
});
