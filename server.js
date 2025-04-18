import express from 'express';
 import http from 'http';
 import https from 'https';
 import fs from 'fs';
 import { WebSocketServer } from 'ws';
 import path from 'path';
 import { fileURLToPath } from 'url';
 
 // Création de l'application Express
 const app = express();
 const port = process.env.PORT || 10000;
 const PORT = process.env.PORT || 3000;
 
 // Utilisation des fichiers statiques (si besoin)
 app.use(express.static('public'));
 // Pour pouvoir utiliser __dirname avec ES modules
 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);
 
 // Chemin vers le certificat SSL et la clé privée
 const privateKey = fs.readFileSync('path/to/private-key.pem', 'utf8');
 const certificate = fs.readFileSync('path/to/certificate.pem', 'utf8');
 const ca = fs.readFileSync('path/to/ca.pem', 'utf8');
 // Fichiers statiques (HTML, CSS, images)
 app.use(express.static(path.join(__dirname, 'public')));
 
 // Créer le serveur HTTPS
 const credentials = { key: privateKey, cert: certificate, ca: ca };
 const server = https.createServer(credentials, app);
 
 // Créer le serveur WebSocket sécurisé
 const wss = new WebSocketServer({ server, path: '/socket' });
 
 wss.on('connection', (ws) => {
   console.log('🔌 Nouveau client WebSocket connecté');
 
   // Quand un message est reçu du client
   ws.on('message', (message) => {
     console.log('📨 Message reçu :', message.toString());
 
     // Répondre si besoin
     if (message.toString() === 'HELLO_ARDUINO') {
       ws.send('HELLO_CLIENT');
     }
   });
 
   // Quand le client se déconnecte
   ws.on('close', () => {
     console.log('❌ Client WebSocket déconnecté');
   });
 // Fallback vers index.html si jamais
 app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
 });
 
 // Lancer le serveur HTTPS
 server.listen(port, () => {
   console.log(`🚀 Serveur HTTPS prêt sur le port ${port}`);
 app.listen(PORT, () => {
   console.log(`🚀 Site dressagedesdemons en ligne sur le port ${PORT}`);
 });
