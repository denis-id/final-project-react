import React from "react";
import { motion } from "framer-motion";
import { Coffee, Wifi, Shield, Clock } from "lucide-react";
import { RiEBike2Line } from "react-icons/ri";
import { GiCoffeeBeans } from "react-icons/gi";
import { MdCoffeeMaker } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";
import { useLanguage } from "../../context/LanguageContext";

const Features = ({ staggerContainer, fadeIn }) => {
  const { language, translations } = useLanguage();

  const featureList = [
    { 
      icon: RiEBike2Line, 
      title: translations[language]?.freeShipping, 
      desc: translations[language]?.freeShippingDesc 
    },
    { icon: Shield, 
      title: translations[language]?.securePayment, 
      desc: translations[language]?.securePaymentDesc 
    },
    { 
      icon: ImPriceTag, 
      title: translations[language]?.price, 
      desc: translations[language]?.priceDesc 
    },
    { icon: Clock, 
      title: translations[language]?.support24, 
      desc: translations[language]?.support24Desc 
    },
    { 
      icon: GiCoffeeBeans, 
      title: translations[language]?.qualityProducts, 
      desc: translations[language]?.qualityProductsDesc 
    },
    { icon: MdCoffeeMaker, 
      title: translations[language]?.qualityTools, 
      desc: translations[language]?.qualityToolsDesc 
    },
    { icon: Coffee, 
      title: translations[language]?.comfortPlace, 
      desc: translations[language]?.comfortPlaceDesc },
    { 
      icon: Wifi, 
      title: translations[language]?.wifi, 
      desc: translations[language]?.wifiDesc 
    },
  ];

  return (
    <div className="py-16 bg-[#EFE8D9]">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 sm:px-10"
      >
        <h1 className="text-3xl sm:text-4xl text-center font-bold mb-8">
          {translations[language]?.fitTitle}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featureList.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="text-center p-5 sm:p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300"
            >
              {React.createElement(feature.icon, { className: "w-12 h-12 mx-auto mb-3 text-black" })}
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Features;
