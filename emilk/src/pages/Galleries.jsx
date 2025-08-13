import GalleryCard from "../components/GalleryCard";
import { useTranslation } from "react-i18next";
import AnimatedText from '../components/TextAnimation';

function Galleries() {
  const { t } = useTranslation();
    return (
    <section
          className="flex flex-col justify-between m-0 h-[100vh] w-full items-center snap-start pt-[10vh]"
          id="sec2"
        >
          <div className="w-full h-[30%] flex items-end justify-center">
            <h1 className="text-[50px] font-league-spartan">
              <AnimatedText text={t("galleries.title")} />
            </h1>
          </div>
          <div className="w-full h-[60%] flex">
            <GalleryCard
              title={t("galleries.specialty")}
              background={"./cafespe.jpeg"}
            />
            <GalleryCard
              title={t("galleries.matcha")}
              background={"./matcha.jpeg"}
            />
            <GalleryCard
              title={t("galleries.latte")}
              background={"./latte.jpeg"}
            />
          </div>
        </section>
    )
}
export default Galleries;
// This code defines a React component for a "Galleries" section of a webpage.