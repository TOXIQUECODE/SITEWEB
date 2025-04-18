// server.js

const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Servir les fichiers statiques (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Rediriger toute autre route vers index.html (utile pour un SPA si nécessaire)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🔥 Serveur lancé sur http://localhost:${PORT}`);
});
