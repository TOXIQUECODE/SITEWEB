import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Pour pouvoir utiliser __dirname avec ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fichiers statiques (HTML, CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Fallback vers index.html si jamais
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Site dressagedesdemons en ligne sur le port ${PORT}`);
});
