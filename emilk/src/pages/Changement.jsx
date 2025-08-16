import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Galleries() {
    const [cafeImg, setCafeImg] = useState([]);
    const [matchaImg, setMatchaImg] = useState([]);
    const [latteImg, setLatteImg] = useState([]);

    // Ajout de l'état pour l'upload
    const [uploadType, setUploadType] = useState('cafe');
    const [uploadFile, setUploadFile] = useState(null);
    const [uploadMsg, setUploadMsg] = useState("");
    const [uploadName, setUploadName] = useState(""); // État pour le nom du fichier

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const resCafe = await fetch("https://emilk-seven.vercel.app/api/cafe-images");
                const resMatcha = await fetch("https://emilk-seven.vercel.app/api/matcha-images");
                const resLatte = await fetch("https://emilk-seven.vercel.app/api/latte-images");

                const dataCafe = await resCafe.json();
                const dataMatcha = await resMatcha.json();
                const dataLatte = await resLatte.json();

                setCafeImg(dataCafe);
                setMatchaImg(dataMatcha);
                setLatteImg(dataLatte);
            } catch (err) {
                console.error("Erreur API images:", err);
            }
        }
        fetchImages();
    },[]);

    const handleDelete = async (type, filename) => {
        try {
            const res = await fetch(`https://emilk-seven.vercel.app/api/${type}-images/delete/${filename}`, { method: 'DELETE' });
            const result = await res.json();
            if (result.success) {
                if (type === 'cafe') setCafeImg(imgs => imgs.filter(img => img.src.split('/').pop() !== filename));
                if (type === 'matcha') setMatchaImg(imgs => imgs.filter(img => img.src.split('/').pop() !== filename));
                if (type === 'latte') setLatteImg(imgs => imgs.filter(img => img.src.split('/').pop() !== filename));
            }
        } catch (err) {
            console.error('Erreur suppression image:', err);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!uploadFile) {
            setUploadMsg("Veuillez sélectionner une image.");
            return;
        }
        const formData = new FormData();
        formData.append('image', uploadFile);
        if (uploadName) formData.append('name', uploadName); // Ajout du nom du fichier si présent
        try {
            const res = await fetch(`https://emilk-seven.vercel.app/api/${uploadType}-images/upload`, {
                method: 'POST',
                body: formData
            });
            const result = await res.json();
            if (result.success) {
                setUploadMsg("Image ajoutée !");
                // Rafraîchir la liste
                const filename = result.filename;
                if (uploadType === 'cafe') setCafeImg(imgs => [...imgs, {
                    id: `cafe-img-${imgs.length}`,
                    alt: `Café ${imgs.length + 1}`,
                    caption: `Café ${imgs.length + 1}`,
                    src: `/Gallery/cafe/${filename}`
                }]);
                if (uploadType === 'matcha') setMatchaImg(imgs => [...imgs, {
                    id: `matcha-img-${imgs.length}`,
                    alt: `Matcha ${imgs.length + 1}`,
                    caption: `Matcha ${imgs.length + 1}`,
                    src: `/Gallery/matcha/${filename}`
                }]);
                if (uploadType === 'latte') setLatteImg(imgs => [...imgs, {
                    id: `latte-img-${imgs.length}`,
                    alt: `Latte ${imgs.length + 1}`,
                    caption: `Latte ${imgs.length + 1}`,
                    src: `/Gallery/latte/${filename}`
                }]);
                setUploadFile(null);
                setUploadName(""); // Réinitialiser le nom du fichier
            } else {
                setUploadMsg(result.error || "Erreur lors de l'ajout.");
            }
        } catch (err) {
            setUploadMsg("Erreur lors de l'ajout.");
        }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#EBE4DF] p-8">
        <h1 className="text-4xl font-league-spartan mb-8 text-[#815F47]">Gestion des images</h1>
        {/* Champ d'ajout d'image */}
        <form onSubmit={handleUpload} className="flex flex-col md:flex-row items-center gap-4 mb-8 bg-white rounded-xl shadow p-4 w-full max-w-2xl">
          <select value={uploadType} onChange={e => setUploadType(e.target.value)} className="border rounded px-3 py-2 text-[#815F47] focus:outline-none focus:ring-2 focus:ring-[#D5B16C]">
            <option value="cafe">Café</option>
            <option value="matcha">Matcha</option>
            <option value="latte">Latte</option>
          </select>
          <input type="file" accept="image/*" onChange={e => setUploadFile(e.target.files[0])} className="border rounded px-3 py-2 text-[#815F47] focus:outline-none focus:ring-2 focus:ring-[#D5B16C]" />
          <input type="text" placeholder="Nom du fichier (optionnel)" value={uploadName} onChange={e => setUploadName(e.target.value)} className="border rounded px-3 py-2 text-[#815F47] focus:outline-none focus:ring-2 focus:ring-[#D5B16C]" />
          <button type="submit" className="bg-[#815F47] text-[#111111] px-4 py-2 rounded hover:bg-[#a07a5a] transition">Ajouter</button>
          {uploadMsg && <span className="text-sm text-[#815F47] ml-2">{uploadMsg}</span>}
        </form>
        {/* Grilles d'images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Café */}
          <div className="bg-[#D5B16C] rounded-xl shadow p-4 flex flex-col items-center">
            <h2 className="text-2xl font-league-spartan mb-4 text-[#815F47]">Café</h2>
            <div className="flex flex-col gap-4 w-full">
              {cafeImg.map((img) => (
                <div className="flex flex-col items-center bg-white rounded-lg shadow p-2" key={img.id}>
                  <img src={img.src} alt={img.alt} className="w-full h-48 object-cover rounded mb-2 border-2 border-[#D5B16C]" />
                  <p className="text-[#815F47] font-semibold">{img.caption}</p>
                  <button onClick={() => handleDelete('cafe', img.src.split('/').pop())} className="mt-2 px-4 py-1 bg-[#815F47] text-[#EBE4DF] rounded hover:bg-[#a07a5a] transition">Supprimer</button>
                </div>
              ))}
            </div>
          </div>
          {/* Matcha */}
          <div className="bg-[#B7D7A8] rounded-xl shadow p-4 flex flex-col items-center">
            <h2 className="text-2xl font-league-spartan mb-4 text-[#4B6F44]">Matcha</h2>
            <div className="flex flex-col gap-4 w-full">
              {matchaImg.map((img) => (
                <div className="flex flex-col items-center bg-white rounded-lg shadow p-2" key={img.id}>
                  <img src={img.src} alt={img.alt} className="w-full h-48 object-cover rounded mb-2 border-2 border-[#B7D7A8]" />
                  <p className="text-[#4B6F44] font-semibold">{img.caption}</p>
                  <button onClick={() => handleDelete('matcha', img.src.split('/').pop())} className="mt-2 px-4 py-1 bg-[#4B6F44] text-[#EBE4DF] rounded hover:bg-[#7fa97b] transition">Supprimer</button>
                </div>
              ))}
            </div>
          </div>
          {/* Latte */}
          <div className="bg-[#F7E7CE] rounded-xl shadow p-4 flex flex-col items-center">
            <h2 className="text-2xl font-league-spartan mb-4 text-[#C2A477]">Latte</h2>
            <div className="flex flex-col gap-4 w-full">
              {latteImg.map((img) => (
                <div className="flex flex-col items-center bg-white rounded-lg shadow p-2" key={img.id}>
                  <img src={img.src} alt={img.alt} className="w-full h-48 object-cover rounded mb-2 border-2 border-[#F7E7CE]" />
                  <p className="text-[#C2A477] font-semibold">{img.caption}</p>
                  <button onClick={() => handleDelete('latte', img.src.split('/').pop())} className="mt-2 px-4 py-1 bg-[#C2A477] text-[#EBE4DF] rounded hover:bg-[#e2cfa2] transition">Supprimer</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}
export default Galleries;
// This code defines a React component for a "Galleries" section of a webpage.