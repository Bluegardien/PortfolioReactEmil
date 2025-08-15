import LanguageChoose from './LanguageChoose';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    // Génère le lien vers la section sur la page principale
    const getSectionLink = (hash) => location.pathname === '/' ? hash : `/${hash}`;
    return (
    <nav className="fixed w-full top-0 bg-[#815F47] shadow z-[1000] h-[10vh] flex justify-center items-center snap-start">
        <div className="w-1/2 flex justify-between items-center">
          <LanguageChoose />
          <Link
            to={getSectionLink('#sec2')}
            className="no-underline !text-[#EBE4DF] font-bold text-2xl px-2"
          >
            Gallerie
          </Link>
          <div className="text-center">
            <a href="">
              <img
                id="cafetiere"
                src="./cafetiere.png"
                alt="Cafetiere"
                className="w-[50px] h-auto"
              />
            </a>
          </div>
          <Link
            to={getSectionLink('#sec3')}
            className="no-underline !text-[#EBE4DF] font-bold text-2xl px-2"
          >
            Parcours
          </Link>
          <Link
            to={getSectionLink('#sec4')}
            className="no-underline !text-[#EBE4DF] font-bold text-2xl px-2"
          >
            Contact
          </Link>
        </div>
      </nav>
    );
}
export default Navbar;