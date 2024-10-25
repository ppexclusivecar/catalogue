const mysql = require('mysql2');
require('dotenv').config(); // Charger les variables d'environnement

// Créer un pool de connexions pour éviter les fermetures de connexions
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 10, // Valeur par défaut 10
  queueLimit: 0,
});

pool.on('connection', (connection) => {
  console.log('Nouvelle connexion au pool créée');
  
  // Envoyer un ping pour garder la connexion active
  setInterval(() => {
    connection.ping((err) => {
      if (err) {
        console.error('Erreur lors de l\'envoi du ping:', err);
      }
    });
  }, 4500); // Envoi un ping toutes les 4.5 secondes
});

module.exports = pool;
