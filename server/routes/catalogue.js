
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Importer fs pour la gestion des fichiers
const router = express.Router();
const db = require('../db');

// Configuration de multer pour l'upload des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/')); // Dossier de destination
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renommer le fichier pour éviter les doublons
  },
});

const upload = multer({ storage });

// Route pour obtenir tous les éléments du catalogue
router.get('/', (req, res) => {
  const query = 'SELECT * FROM catalogue';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération du catalogue:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(results);
  });
});

// Route pour ajouter un élément (avec image)
router.post('/', upload.single('image'), (req, res) => {
  const {
    nom,
    description,
    ctaLink,
    brand,
    model,
    price,
    kilometers,
    color,
    fuel,
    gearbox,
    engine,
    doors,
    year
  } = req.body; // Récupérer les champs supplémentaires depuis le corps de la requête

  const imagePath = req.file ? req.file.filename : null; // Vérifier si un fichier a été uploadé

  const query = `
    INSERT INTO catalogue (
      Nom, Description, CtaLink, Brand, Model, Price, Kilometers, Color, Fuel, Gearbox, Engine, Doors, Year, Image
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    nom,
    description,
    ctaLink,
    brand,
    model,
    price,
    kilometers,
    color,
    fuel,
    gearbox,
    engine,
    doors,
    year,
    imagePath,
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'ajout de l\'élément:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    res.status(201).json({
      message: 'Élément ajouté avec succès',
      insertedId: results.insertId,
      Nom: nom,
      Description: description,
      CtaLink: ctaLink,
      Brand: brand,
      Model: model,
      Price: price,
      Kilometers: kilometers,
      Color: color,
      Fuel: fuel,
      Gearbox: gearbox,
      Engine: engine,
      Doors: doors,
      Year: year,
      Image: imagePath
    });
  });
});

// Route pour supprimer un élément du catalogue
router.delete('/:num', (req, res) => {
  const { num } = req.params;

  // Récupérer l'image à supprimer
  const query = 'SELECT Image FROM catalogue WHERE Num = ?';
  db.query(query, [num], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'élément:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (results.length > 0) {
      const imagePath = path.join(__dirname, '../public/uploads/', results[0].Image);

      // Supprimer l'élément de la base de données
      const deleteQuery = 'DELETE FROM catalogue WHERE Num = ?';
      db.query(deleteQuery, [num], (deleteErr) => {
        if (deleteErr) {
          console.error('Erreur lors de la suppression de l\'élément:', deleteErr);
          return res.status(500).json({ error: 'Erreur serveur' });
        }

        // Supprimer le fichier image
        fs.unlink(imagePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error('Erreur lors de la suppression de l\'image:', unlinkErr);
          }
        });

        res.status(200).json({ message: 'Élément supprimé avec succès' });
      });
    } else {
      res.status(404).json({ error: 'Élément non trouvé' });
    }
  });
});

module.exports = router;
