import React, { useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

const SignatureMenu = () => {
  const navigate = useNavigate();
  const { language, translations } = useLanguage();

  // Memoized menu items to prevent re-renders
  const menuItems = useMemo(
    () => [
      {
        name: "𝐂𝐨𝐟𝐟𝐞𝐞 𝐋𝐚𝐭𝐭𝐞",
        image:
          "https://img-global.cpcdn.com/recipes/669c4901bf42db17/400x400cq70/photo.jpg",
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
        name: "𝐓𝐢𝐫𝐚𝐦𝐢𝐬𝐮 𝐂𝐚𝐤𝐞",
        image:
          "https://outerbloom.com/cdn/shop/files/CLRKUE1001_Outerbloom-Tiramisu-Cake_280x280.jpg?v=1737450476",
      },
      {
        name: "𝐉𝐚𝐩𝐚𝐧𝐞𝐬𝐞 𝐃𝐞𝐬𝐬𝐞𝐫𝐭",
        image: "https://zhangcatherine.com/wp-content/uploads/2020/06/12001200.jpg",
      },
      {
        name: "𝐑𝐚𝐦𝐞𝐧",
        image: "https://www.nusadaily.com/uploads/images/202210/image_750x_6348f5d4bf522.jpg",
      },
    ],
    []
  );

  return (
    <div className="text-center py-10 px-4 bg-transparent">
      {/* Typewriter Effect */}
      <motion.h2 
        className="text-4xl md:text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typewriter
          words={[translations[language]?.seeMenuTitle]}
          loop={false}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </motion.h2>
      <br />
      {/* Marquee effect */}
      <Marquee gradient={true} speed={90} pauseOnHover={true}>
        {menuItems.map((item, index) => (
          <motion.div 
            key={index} 
            className="flex flex-col items-center mx-6 cursor-pointer transform hover:scale-105 transition duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-[160px] md:w-[200px] lg:w-[250px] rounded-full shadow-lg border-4 border-white"
            />
            <p className="mt-2 text-lg md:text-xl font-semibold text-gray-800">{item.name}</p>
          </motion.div>
        ))}
      </Marquee>
      <br />
      {/* Animated Button */}
      <motion.button
        onClick={() => navigate("/menu")}
        className="mt-6 px-6 py-3 bg-black text-white text-lg font-semibold rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 transition duration-300 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {translations[language]?.seeMenuButton} ➚
      </motion.button>
    </div>
  );
};

export default SignatureMenu;
