const mysql = require('mysql2');
require('dotenv').config(); // Charger les variables d'environnement

// Créer un pool de connexions pour éviter les fermetures de connexions
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Utiliser la variable d'environnement pour l'hôte
  user: process.env.DB_USER, // Utiliser la variable d'environnement pour l'utilisateur
  password: process.env.DB_PASSWORD, // Utiliser la variable d'environnement pour le mot de passe
  database: process.env.DB_NAME, // Utiliser la variable d'environnement pour la base de données
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
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