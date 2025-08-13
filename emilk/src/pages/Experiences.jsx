import { useTranslation } from "react-i18next";

function Experiences() {
  const { t } = useTranslation();
  return (
    <section
      className="flex justify-around m-0 h-[100vh] w-full items-center pt-[10vh] snap-start"
      id="sec3"
    >
      <div className="w-2/5 h-[90%] flex flex-col">
        <h1 className="text-[50px] font-league-spartan">
          {t("experiences.formations")}
        </h1>
        <div className="flex flex-col justify-around">
          <div className="flex items-center">
            <img src="" alt="" />
            <h2 className="font-league-spartan text-2xl">
              {t("experiences.barista_course")}
            </h2>
          </div>
        </div>
      </div>
      <div className="w-2/5 h-[90%] flex flex-col">
        <h1 className="text-[50px] font-league-spartan">
          {t("experiences.title")}
        </h1>
        <div className="flex flex-col justify-around">
          <div className="flex items-center">
            <img src="" alt="" />
            <div className="flex items-center ml-2">
              <h2 className="font-league-spartan text-2xl">
                {t("experiences.local_cafe")}
              </h2>
              <a href="https://www.instagram.com/local.cafe.briancon/">
                <img
                  id="iconig"
                  src="./instagramicon.png"
                  alt="Instagram"
                  className="w-5 h-auto ml-2"
                />
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <img src="" alt="" />
            <div className="flex items-center ml-2">
              <h2 className="font-league-spartan text-2xl">
                {t("experiences.heidi_kitchen")}
              </h2>
              <a href="https://www.instagram.com/_heidikitchen_/">
                <img
                  id="iconig"
                  src="./instagramicon.png"
                  alt="Instagram"
                  className="w-5 h-auto ml-2"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Experiences;