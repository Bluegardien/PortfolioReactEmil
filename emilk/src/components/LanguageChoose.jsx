import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang); // change instantanément la langue
  };

  return (
    <select
      id="language"
      name="language"
      className="bg-[#815F47] border-2 border-[#EBE4DF] rounded text-[#EBE4DF] font-bold text-2xl px-2 py-1"
      value={i18n.language} // garde la langue sélectionnée
      onChange={handleChange}
    >
      <option value="fr">Français</option>
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="de">Deutsch</option>
    </select>
  );
}
