import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import process from 'process';
import cors from 'cors';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

const GALLERY_DIR = path.join(__dirname, '..', 'public', 'Gallery');

// Nouvelle route paramétrée
app.get('/api/:type-images', (req, res) => {
  const { type } = req.params;
  if (!['cafe', 'matcha', 'latte'].includes(type)) {
    return res.status(400).json({ error: 'Invalid gallery type' });
  }
  const IMAGES_DIR = path.join(GALLERY_DIR, type);
  fs.readdir(IMAGES_DIR, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read images directory' });
    }
    // Filtre les fichiers images
    const images = files.filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
      .map((name, i) => {
        const baseName = name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '); // enlève l'extension et remplace les _ par des espaces
        return {
          id: `${type}-img-${i}`,
          alt: `${type.charAt(0).toUpperCase() + type.slice(1)} ${i + 1}`,
          caption: baseName,
          src: `/Gallery/${type}/${name}`
        };
      });
    res.json(images);
  });
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
