import React from "react";

function GalleryCard({ title, background }) {
  return (
    <div
      className="flex-1 p-4 transition-[flex-grow] duration-400 ease-in-out bg-cover bg-center text-[#EBE4DF] hover:flex-[2]"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h2 className="font-league-spartan text-2xl">{title}</h2>
      <p></p>
    </div>
  );
}

export default GalleryCard;
