import React, { useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const SignatureMenu = () => {
  const navigate = useNavigate();
  const { language, translations } = useLanguage();

  // Memoized menu items to prevent re-renders
  const menuItems = useMemo(
    () => [
      {
        name: "𝐂𝐨𝐟𝐟𝐞𝐞 𝐋𝐚𝐭𝐭𝐞",
        image:
          "https://www.mcsangatta.com/images/virtuemart/product/resized/HOT%20COFFEE%20LATTE%20HAZELNUT%20-%2021_500x500.jpg",
      },
      {
        name: "𝐂𝐚𝐩𝐩𝐮𝐜𝐜𝐢𝐧𝐨 𝐄𝐬𝐩𝐫𝐞𝐬𝐬𝐨",
        image:
          "https://delightfulplate.com/wp-content/uploads/2019/02/Homemade-Caff%C3%A8-Mocha-with-Vietnamese-Coffee-2-500x500.jpg",
      },
      {
        name: "𝐑𝐞𝐝 𝐕𝐞𝐥𝐯𝐞𝐭 𝐂𝐡𝐨𝐜𝐨𝐥𝐚𝐭𝐞",
        image:
          "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/12/29/26fb71c7-6ffd-4b5b-9aba-2e60c964f3f2.png",
      },
      {
        name: "𝐉𝐚𝐩𝐚𝐧𝐞𝐬𝐞 𝐃𝐞𝐬𝐬𝐞𝐫𝐭",
        image: "https://zhangcatherine.com/wp-content/uploads/2020/06/12001200.jpg",
      },
    ],
    []
  );

  return (
    <div className="text-center py-10 px-4">
      {/* Typewriter Effect */}
      <h2 className="text-4xl md:text-3xl font-bold mb-6">
        <Typewriter
          words={[translations[language]?.seeMenuTitle]}
          loop={false}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h2>
      <br />
      {/* Responsive grid layout */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
        {menuItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-full max-w-[160px] md:max-w-[200px] lg:max-w-[250px] rounded-lg shadow-md"
              style={{ borderRadius: "50%" }}
            />
            <p className="mt-2 text-base md:text-lg font-medium">{item.name}</p>
          </div>
        ))}
      </div>
      <br />
      {/* Button with better UX */}
      <button
        onClick={() => navigate("/menu")}
        className="mt-6 px-6 py-2 bg-black text-white text-lg font-semibold rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 transition duration-300"
      >
        {translations[language]?.seeMenuButton} ➚
      </button>
    </div>
  );
};

export default SignatureMenu;
