import { useTranslation } from "react-i18next";
import AnimatedText from '../components/TextAnimation';

function Contact() {
  const { t } = useTranslation();
  return (
    <section
          className="flex flex-col justify-around m-0 h-[100vh] pt-[10vh] w-full items-center snap-start"
          id="sec4"
        >
          <h1 className="text-[50px] font-league-spartan mt-4 mb-0 p-0" style={{ fontSize: "clamp(2rem, 4vw, 5rem)", fontWeight: "900" }}>
            <AnimatedText text={t("contact.title")} />
          </h1>
          <div className="w-full h-[90%] flex flex-col flex-wrap justify-around">
            <div className="p-4 w-2/5 bg-[#D5B16C] rounded-[15px] h-1/2 m-8">
              <div>
                <h2 className="text-[35px] w-[70%] font-league-spartan" style={{ fontSize: "clamp(1.5rem, 2vw, 3rem)", fontWeight: "900" }}>
                  {t("contact.mail")}
                </h2>
                <h3 className="text-xl">emil.duchemin@gmail.com</h3>
              </div>
              <div>
                <h2 className="text-[35px] w-[70%] font-league-spartan" style={{ fontSize: "clamp(1.5rem, 2vw, 3rem)", fontWeight: "900" }}>
                  {t("contact.telephone")}
                </h2>
                <h3 className="text-xl">+33 6 95 13 92 55</h3>
              </div>
            </div>
            <div className="pl-6 p-4 w-2/5 bg-[#D5B16C] rounded-[15px] h-1/4 m-8 flex">
              <h2 className="text-[35px] w-[70%] font-league-spartan" style={{ fontSize: "clamp(1.5rem, 2vw, 3rem)", fontWeight: "900" }}>
                {t("contact.cv")}
              </h2>
              <div className="flex flex-col justify-around w-1/12">
                <a href="https://www.instagram.com/_heidikitchen_/">
                  <img
                    className="w-[30px] h-auto m-2"
                    src="./downloadicon.png"
                    alt="Download CV"
                  />
                </a>
              </div>
            </div>
            <div className="pl-6 p-4 w-2/5 bg-[#D5B16C] rounded-[15px] h-1/4 m-8 flex">
              <h2 className="text-[35px] w-[70%] font-league-spartan" style={{ fontSize: "clamp(1.5rem, 2vw, 3rem)", fontWeight: "900" }}>
                {t("contact.social")}
              </h2>
              <div className="flex flex-col justify-around w-1/12">
                <a href="https://www.instagram.com/cafemilk_barista/">
                  <img
                    className="w-[30px] h-auto m-2"
                    src="./instagramicon.png"
                    alt="Instagram"
                  />
                </a>
                <a href="https://www.linkedin.com/in/emil-duchemin-287a79332/">
                  <img
                    className="w-[30px] h-auto m-2"
                    src="./linkedinicon.png"
                    alt="LinkedIn"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
  );
}
export default Contact;