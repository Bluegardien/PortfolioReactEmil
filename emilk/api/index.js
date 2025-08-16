import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import process from 'process';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import cors from 'cors';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(cors());
app.use(express.json());

const GALLERY_DIR = path.join(__dirname, '..', 'public', 'Gallery');
const upload = multer({ dest: path.join(__dirname, '..', 'public', 'Gallery', 'tmp') });

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


// DELETE /api/:type-images/:filename
app.delete('/api/:type-images/delete/:filename', (req, res) => {
  const { type, filename } = req.params;
  const folder = ['cafe', 'matcha', 'latte'].includes(type) ? type : null;
  if (!folder) return res.status(400).json({ error: 'Invalid gallery type' });
  const filePath = path.join(__dirname, '..', 'public', 'Gallery', folder, filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to delete image', details: err.message });
    }
    res.json({ success: true });
  });
});

// POST /api/:type-images/upload
app.post('/api/:type-images/upload', upload.single('image'), async (req, res) => {
  const { type } = req.params;
  const folder = ['cafe', 'matcha', 'latte'].includes(type) ? type : null;
  if (!folder) return res.status(400).json({ error: 'Invalid gallery type' });
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  // Utiliser le nom fourni ou le nom original
  let filename = req.file.originalname;
  if (req.body.name) {
    // Nettoyage du nom fourni (pas d'extension, pas de caractères spéciaux)
    const base = path.parse(req.body.name).name.replace(/[^a-zA-Z0-9-_]/g, '_');
    filename = base;
  } else {
    filename = path.parse(filename).name;
  }

  let destExt = path.extname(req.file.originalname).toLowerCase();
  let destFilename = filename + destExt;
  let destPath = path.join(__dirname, '..', 'public', 'Gallery', folder, destFilename);

  // Si HEIC, convertir en JPG
  if (destExt === '.heic') {
    try {
      const inputBuffer = fs.readFileSync(req.file.path);
      const outputBuffer = await heicConvert({
        buffer: inputBuffer,
        format: 'JPEG',
        quality: 1
      });
      destFilename = filename + '.jpg';
      destPath = path.join(__dirname, '..', 'public', 'Gallery', folder, destFilename);
      fs.writeFileSync(destPath, outputBuffer);
      fs.unlinkSync(req.file.path);
      return res.json({ success: true, filename: destFilename });
    } catch (err) {
      return res.status(500).json({ error: 'Unable to convert HEIC', details: err.message });
    }
  } else {
    // Sinon, déplacer le fichier normalement
    fs.rename(req.file.path, destPath, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Unable to save image', details: err.message });
      }
      res.json({ success: true, filename: destFilename });
    });
  }
});

// const PORT = process.env.PORT || 3002;
// app.listen(PORT, () => {
//   console.log(`Delete API server running on http://localhost:${PORT}`);
// });


export default serverless(app);