// api/index.js
import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import process from "process";
import formidable from "formidable-serverless";
import heicConvert from "heic-convert";
import { createClient } from "@supabase/supabase-js";
import { Buffer } from "buffer";

const SUPABASE_URL = "https://omruuycuvaimtbvklwle.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tcnV1eWN1dmFpbXRidmtsd2xlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzNDg1MTAsImV4cCI6MjA3MDkyNDUxMH0.KUTWZDLMB-0XGfoaRQRx9k2T2wGFgyJagVEFDisTh94"
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const app = express();
app.use(cors());

// Types valides
const validTypes = ["cafe", "matcha", "latte"];

// 📌 GET /api/gallery/:type → liste les images
app.get("/api/gallery/:type", async (req, res) => {
  const { type } = req.params;
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: "Invalid gallery type" });
  }

  const { data, error } = await supabase.storage.from("Gallery").list(type);
  if (error) return res.status(500).json({ error: error.message });

  const images = data.map((f, i) => ({
    id: `${type}-img-${i}`,
    alt: `${type} ${i + 1}`,
    caption: f.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
    src: `${SUPABASE_URL}/storage/v1/object/public/Gallery/${type}/${f.name}`,
  }));

  res.json(images);
});

// 📌 POST /api/gallery/:type/upload → upload une image
app.post("/api/gallery/:type/upload", (req, res) => {
  const { type } = req.params;
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: "Invalid gallery type" });
  }

  const form = formidable({ multiples: false });
  form.parse(req, async (err, fields, files) => {
    if (err || !files.image) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let file = files.image;
    let buffer = file._writeStream ? null : await file.arrayBuffer?.();

    // Récupère le nom original
    let filename = file.originalFilename || file.name;

    // Convert HEIC en JPG si besoin
    if (filename.toLowerCase().endsWith(".heic")) {
      buffer = await heicConvert({
        buffer: Buffer.from(buffer),
        format: "JPEG",
        quality: 1,
      });
      filename = filename.replace(/\.heic$/i, ".jpg");
    }

    // Upload vers Supabase
    const { error: uploadError } = await supabase.storage
      .from("Gallery")
      .upload(`${type}/${filename}`, Buffer.from(buffer), { upsert: true });

    if (uploadError) return res.status(500).json({ error: uploadError.message });
    res.json({ success: true, filename });
  });
});

// 📌 DELETE /api/gallery/:type/delete/:filename → supprime une image
app.delete("/api/gallery/:type/delete/:filename", async (req, res) => {
  const { type, filename } = req.params;
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: "Invalid gallery type" });
  }
  if (!filename) {
    return res.status(400).json({ error: "No filename provided" });
  }

  const { error } = await supabase.storage.from("Gallery").remove([`${type}/${filename}`]);
  if (error) return res.status(500).json({ error: error.message });

  res.json({ success: true });
});

// ⚡ Export en serverless handler
export default serverless(app);
