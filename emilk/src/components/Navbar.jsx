import LanguageChoose from './LanguageChoose';

function Navbar() {
    return (
    <nav className="fixed w-full top-0 bg-[#815F47] shadow z-[1000] h-[10vh] flex justify-center items-center snap-start">
        <div className="w-1/2 flex justify-between items-center">
          <LanguageChoose />
          <a
            href="#sec2"
            className="no-underline !text-[#EBE4DF] font-bold text-2xl px-2"
          >
            Gallerie
          </a>
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
          <a
            href="#sec3"
            className="no-underline !text-[#EBE4DF] font-bold text-2xl px-2"
          >
            Parcours
          </a>
          <a
            href="#sec4"
            className="no-underline !text-[#EBE4DF] font-bold text-2xl px-2"
          >
            Contact
          </a>
        </div>
      </nav>
    );
}
export default Navbar;