import { useState, useEffect } from "react";
import { ImageGallery } from "react-image-grid-gallery";
import AnimatedText from '../components/TextAnimation';

function Photogrid({ folder = "cafe" }) {
    const [imagesArray, setImagesArray] = useState([{
        id: "image0",
        alt: "Image1's alt text",
        caption: "Image1's description",
        src: `/Gallery/cafe/mon_materiel.jpeg`,
    }]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/view/${folder}`);
                const data = await res.json();
                setImagesArray(Array.isArray(data) ? data : []);
            } catch (err) {
                setImagesArray([]);
                console.error("Erreur API images:", err);
            }
        };
        fetchImages();
    }, [folder]);
    return <div className="p-10 pt-[12vh] text-center">
        <h1 className="font-league-spartan mb-5" style={{ fontSize: "clamp(2rem, 4vw, 5rem)", fontWeight: "900" }}>
            <AnimatedText text={`Galerie ${folder.charAt(0).toUpperCase() + folder.slice(1)}`} />
        </h1>
        
        <ImageGallery imagesInfoArray={Array.isArray(imagesArray) ? imagesArray : []} className=""/>
    </div> 
    
}
export default Photogrid;