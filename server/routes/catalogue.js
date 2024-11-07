const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const router = express.Router();
const db = require('../db');
require('dotenv').config();

// Configuration de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configuration de multer avec stockage Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'catalogue', // Nom du dossier dans Cloudinary
    format: async (req, file) => 'png', // Format des images (optionnel)
    public_id: (req, file) => Date.now().toString(), // Nom unique pour chaque fichier
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
  } = req.body;

  // Obtenir l'URL de l'image depuis Cloudinary
  const imagePath = req.file ? req.file.path : null;

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

  const query = 'SELECT Image FROM catalogue WHERE Num = ?';
  db.query(query, [num], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'élément:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (results.length > 0) {
      const imageUrl = results[0].Image;

      // Extraire le public_id de l'image dans Cloudinary pour la suppression
      const publicId = imageUrl.split('/').pop().split('.')[0];

      // Supprimer l'élément de la base de données
      const deleteQuery = 'DELETE FROM catalogue WHERE Num = ?';
      db.query(deleteQuery, [num], async (deleteErr) => {
        if (deleteErr) {
          console.error('Erreur lors de la suppression de l\'élément:', deleteErr);
          return res.status(500).json({ error: 'Erreur serveur' });
        }

        try {
          await cloudinary.uploader.destroy(`catalogue/${publicId}`);
          res.status(200).json({ message: 'Élément supprimé avec succès' });
        } catch (cloudErr) {
          console.error('Erreur lors de la suppression de l\'image dans Cloudinary:', cloudErr);
          res.status(500).json({ error: 'Erreur lors de la suppression de l\'image' });
        }
      });
    } else {
      res.status(404).json({ error: 'Élément non trouvé' });
    }
  });
});

// Route pour obtenir tous les éléments de la table "archive"
router.get('/archive', (req, res) => {
  const query = 'SELECT * FROM archive';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des éléments de la table archive:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(results);
  });
});

// Route pour archiver un élément
router.post('/archive/:num', (req, res) => {
  const { num } = req.params;

  // Obtenir l'élément à archiver depuis la table "catalogue"
  const selectQuery = 'SELECT * FROM catalogue WHERE Num = ?';
  db.query(selectQuery, [num], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'élément:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (results.length > 0) {
      const element = results[0];

      // Insérer l'élément dans la table "archive"
      const insertQuery = `
        INSERT INTO archive (
          Nom, Description, CtaLink, Brand, Model, Price, Kilometers, Color, Fuel, Gearbox, Engine, Doors, Year, Image
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        element.Nom,
        element.Description,
        element.CtaLink,
        element.Brand,
        element.Model,
        element.Price,
        element.Kilometers,
        element.Color,
        element.Fuel,
        element.Gearbox,
        element.Engine,
        element.Doors,
        element.Year,
        element.Image,
      ];

      db.query(insertQuery, values, (insertErr) => {
        if (insertErr) {
          console.error('Erreur lors de l\'insertion de l\'élément dans la table archive:', insertErr);
          return res.status(500).json({ error: 'Erreur serveur' });
        }

        // Supprimer l'élément de la table "catalogue"
        const deleteQuery = 'DELETE FROM catalogue WHERE Num = ?';
        db.query(deleteQuery, [num], (deleteErr) => {
          if (deleteErr) {
            console.error('Erreur lors de la suppression de l\'élément de la table catalogue:', deleteErr);
            return res.status(500).json({ error: 'Erreur serveur' });
          }

          res.status(200).json({ message: 'Élément archivé avec succès' });
        });
      });
    } else {
      res.status(404).json({ error: 'Élément non trouvé' });
    }
  });
});

// Route pour supprimer un élément de la table "archive"
router.delete('/archive/:num', (req, res) => {
  const { num } = req.params;

  const query = 'DELETE FROM archive WHERE Num = ?';
  db.query(query, [num], (err, results) => {
    if (err) {
      console.error('Erreur lors de la suppression de l\'élément de la table archive:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (results.affectedRows > 0) {
      res.status(200).json({ message: 'Élément supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'Élément non trouvé' });
    }
  });
});

module.exports = router;
