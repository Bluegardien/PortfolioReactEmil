import React from "react";
import TiltedCard from '../components/TiltedCard/TiltedCard';
import { useTranslation } from "react-i18next";
import AnimatedText from '../components/TextAnimation';
function Presentation() {
  const { t } = useTranslation();
  return (
    <>
      
        {/* Section 1 */}
        <section className="flex m-0 h-[100vh] w-full justify-around items-center pt-[10vh] align-center snap-start" id="sec1">
          <div className="relative h-[80%] w-[30%] flex flex-col justify-center" id="aroundimg">
            <h1 className="absolute top-0 left-full font-league-spartan w-[200%]" style={{ fontSize: "clamp(2rem, 4vw, 5rem)", fontWeight: "900" }}>
              <AnimatedText text={t("hero")} />
            </h1>
            <img
              id="imgemil"
              src="./emil.jpeg"
              alt="Emil"
              className="h-full w-fit object-cover m-1.5 border-4 border-[#D5B16C] rounded-[15px]"
            />
          </div>
          <div className="p-4 mt-[10%] text-xl w-[50%] h-[30%] bg-[#D5B16C] rounded-[15px] flex flex-col justify-around">
            <h1 className="font-league-spartan" style={{ fontSize: "clamp(1.5rem, 3vw, 4rem)", fontWeight: "900" }}>{t("presentation.name")}</h1>
            <p>
              {t("presentation.description")}
            </p>
          </div>
        </section>
    </>
  );
}

export default Presentation;