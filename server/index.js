// backend/index.js
const express = require('express');
const cors = require('cors');
const catalogueRoutes = require('./routes/catalogue');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques du dossier 'public'
app.use('/public', express.static('public'));

// Route racine
app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend Express!');
});

// Exemple de route API
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Bonjour depuis le backend Express!' });
});

app.post('/api/data', (req, res) => {
  const data = req.body;
  res.json({ message: 'Données reçues', data });
});

app.use('/api/catalogue', catalogueRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Backend Express en cours d'exécution sur http://localhost:${PORT}`);
});
