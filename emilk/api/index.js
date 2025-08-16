import express from 'express';
import cors from 'cors';
import multer from 'multer';
import heicConvert from 'heic-convert';
import process from 'process';
import { list } from '@vercel/blob';


const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() }); // fichiers en mémoire

const GALLERY_TYPES = ['cafe', 'matcha', 'latte'];

const TOKEN = process.env.VERCEL_BLOB_TOKEN;
const PROJECT_ID = process.env.VERCEL_BLOB_PROJECT_ID;
const CONTAINER = process.env.VERCEL_BLOB_CONTAINER;

// Helper pour construire les headers auth
const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

// GET /api/view/:type
app.get('/api/view/:type', async (req, res) => {
  const { type } = req.params;
  if (!GALLERY_TYPES.includes(type)) {
    return res.status(400).json({ error: 'Invalid gallery type' });
  }

  try {

    const { blobs } = await list();
    res.json(blobs)

    
    const images = blobs
      .map((file, i) => {
        const baseName = file.name.split('/').pop().replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
        return {
          id: `${type}-img-${i}`,
          alt: `${type.charAt(0).toUpperCase() + type.slice(1)} ${i + 1}`,
          caption: baseName,
          src: file.url, // URL publique
        };
      });

    if (images.length === 0) return res.status(404).json({blobs});

    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Unable to list images', details: err.message });
  }
});

// DELETE /api/:type/delete/:filename
app.delete('/api/:type/delete/:filename', async (req, res) => {
  const { type, filename } = req.params;
  if (!GALLERY_TYPES.includes(type)) return res.status(400).json({ error: 'Invalid gallery type' });

  try {
    const deleteRes = await fetch(
      `https://api.vercel.com/v1/projects/${PROJECT_ID}/containers/${CONTAINER}/blobs/${type}/${filename}`,
      {
        method: 'DELETE',
        headers,
      }
    );
    const data = await deleteRes.json();
    if (data.error) throw new Error(data.error.message);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Unable to delete image', details: err.message });
  }
});

// POST /api/:type/upload
app.post('/api/:type/upload', upload.single('image'), async (req, res) => {
  const { type } = req.params;
  if (!GALLERY_TYPES.includes(type)) return res.status(400).json({ error: 'Invalid gallery type' });
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    // Nom du fichier
    let filename = req.body.name
      ? req.body.name.replace(/[^a-zA-Z0-9-_]/g, '_')
      : req.file.originalname.split('.')[0];

    let ext = '.' + req.file.originalname.split('.').pop().toLowerCase();
    let fileBuffer = req.file.buffer;

    // Conversion HEIC
    if (ext === '.heic') {
      fileBuffer = await heicConvert({ buffer: fileBuffer, format: 'JPEG', quality: 1 });
      ext = '.jpg';
    }

    const destFilename = filename + ext;

    // Upload via API REST
    const form = new FormData();
    form.append('file', fileBuffer, { filename: destFilename, contentType: req.file.mimetype });

    const uploadRes = await fetch(
      `https://api.vercel.com/v1/projects/${PROJECT_ID}/containers/${CONTAINER}/blobs?name=${type}/${destFilename}`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${TOKEN}` },
        body: form,
      }
    );

    const data = await uploadRes.json();
    if (data.error) throw new Error(data.error.message);

    res.json({ success: true, filename: destFilename, url: data.blob.url });
  } catch (err) {
    res.status(500).json({ error: 'Unable to upload image', details: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API Vercel Blob Gallery running on http://localhost:${PORT}`);
});
