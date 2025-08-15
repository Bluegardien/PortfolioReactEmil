import React from "react";

function GalleryCard({ title, background }) {
  return (
    <div
      className="p-4 bg-cover bg-center text-[#EBE4DF] h-[100%]"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h2 className="font-league-spartan text-2xl">{title}</h2>
      <p></p>
    </div>
  );
}

export default GalleryCard;
