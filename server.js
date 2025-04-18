// server.js en module ES

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Résolution __dirname en ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route fallback pour Single Page Apps
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🔥 Serveur lancé sur http://localhost:${PORT}`);
});
