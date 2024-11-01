const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Récupère le token du header

  if (!token) return res.status(401).json({ message: 'Accès non autorisé' });

  // Vérifie et décode le token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token invalide' });
    req.user = decoded;
    next();
  });
}

module.exports = authenticate;
