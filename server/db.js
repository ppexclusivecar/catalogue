const mysql = require('mysql2');

// Créer un pool de connexions pour éviter les fermetures de connexions
const pool = mysql.createPool({
  host: '193.203.168.33',
  user: 'u834646827_eliott_moores',
  password: 'Arturia808*',
  database: 'u834646827_PPexclusive',
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