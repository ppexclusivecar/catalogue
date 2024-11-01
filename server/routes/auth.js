const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

// Endpoint de connexion pour obtenir un token JWT
router.post('/login', (req, res) => {
    const { password } = req.body;
    console.log('Mot de passe reçu:', password);  // Vérifiez ici le mot de passe reçu
    console.log('Mot de passe attendu:', ADMIN_PASSWORD);  // Vérifiez le mot de passe attendu
  
    if (password === ADMIN_PASSWORD) {
      const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token });
    } else {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }
  });

module.exports = router;
