const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Utiliser le stockage en mémoire avec Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware
app.use(cors());
app.use(express.json());

// Route d'upload d'image vers Cloudinary
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    // Uploader l'image vers Cloudinary à partir du buffer
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: 'Erreur lors de l\'upload de l\'image' });
        }
        // Renvoyer l'URL sécurisée de l'image
        res.json({ imageUrl: result.secure_url });
      }
    ).end(req.file.buffer); // Utiliser le buffer pour uploader l'image
  } catch (error) {
    console.error('Erreur lors de l\'upload vers Cloudinary:', error);
    res.status(500).json({ error: 'Erreur lors de l\'upload de l\'image' });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Backend Express en cours d'exécution sur http://localhost:${PORT}`);
});
