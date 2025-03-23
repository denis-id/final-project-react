import React from "react";
import { motion } from "framer-motion";
import { Coffee, Wifi, Shield, Clock } from "lucide-react";
import { RiEBike2Line } from "react-icons/ri";
import { GiCoffeeBeans } from "react-icons/gi";
import { MdCoffeeMaker } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";
import { useLanguage } from "../../context/LanguageContext";

const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)" },
};

const fadeInOut = {
  initial: { opacity: 0 },
  animate: {
    opacity: [0, 1, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

const gradientText = {
  background: "linear-gradient(90deg, #ff8c00, black, #D6C7B2)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "inline-block",
  textAlign: "center",
  width: "100%"
};

const Features = ({ staggerContainer, fadeIn }) => {
  const { language, translations } = useLanguage();

  const featureList = [
    { icon: RiEBike2Line, title: translations[language]?.freeShipping, desc: translations[language]?.freeShippingDesc },
    { icon: Shield, title: translations[language]?.securePayment, desc: translations[language]?.securePaymentDesc },
    { icon: ImPriceTag, title: translations[language]?.price, desc: translations[language]?.priceDesc },
    { icon: Clock, title: translations[language]?.support24, desc: translations[language]?.support24Desc },
    { icon: GiCoffeeBeans, title: translations[language]?.qualityProducts, desc: translations[language]?.qualityProductsDesc },
    { icon: MdCoffeeMaker, title: translations[language]?.qualityTools, desc: translations[language]?.qualityToolsDesc },
    { icon: Coffee, title: translations[language]?.comfortPlace, desc: translations[language]?.comfortPlaceDesc },
    { icon: Wifi, title: translations[language]?.wifi, desc: translations[language]?.wifiDesc },
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-[#EFE8D9] to-[#D6C7B2]">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 sm:px-10"
      >
        <motion.h1
          className="text-4xl sm:text-5xl text-center font-extrabold mb-10"
          variants={fadeInOut}
          initial="initial"
          animate="animate"
          style={gradientText}
        >
          {translations[language]?.fitTitle}
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featureList.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{ once: true }}
              className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg transition-transform duration-300 hover:shadow-xl border border-gray-200"
            >
              {React.createElement(feature.icon, { className: "w-14 h-14 mx-auto mb-4 text-[#7A4D25]" })}
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Features;
