import { motion } from "framer-motion";
import { useState } from "react";
import { FaStar, FaCoffee, FaLeaf, FaShoppingCart } from "react-icons/fa";
import { MdOutlineEmojiPeople } from "react-icons/md";
import { Beer } from 'lucide-react';
import kohi1 from "../assets/images/kohii1.jpg"; 
import { useLanguage } from "../context/LanguageContext";

// Feature data with unique IDs
const features = [
  { id: "service", icon: <MdOutlineEmojiPeople /> },
  { id: "prices", icon: <FaShoppingCart /> },
  { id: "quality", icon: <FaStar /> },
  { id: "fresh", icon: <FaCoffee /> },
  { id: "healthy", icon: <FaLeaf /> },
  { id: "flavors", icon: <Beer /> },
];

export default function About() {
  const { language, translations } = useLanguage();
  const [readMoreStates, setReadMoreStates] = useState({});

  const toggleReadMore = (id) => {
    setReadMoreStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-5">
      <section className="text-center py-16 bg-gradient-to-r rounded-lg shadow-lg">
        <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-800 drop-shadow-lg">
          𝑲𝑶𝑯𝑰 𝑪𝒐𝒇𝒇𝒆é 幸
        </h2>
        <br />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-10">
          {/* Feature List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const title = translations[language]?.[`${feature.id}Title`];
              const description = translations[language]?.[`${feature.id}Desc`];

              return (
                <motion.div
                  key={feature.id}
                  className="flex flex-col items-center text-center transform hover:scale-105 transition duration-300 ease-in-out"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-yellow-500 text-4xl border-2 border-yellow-500 rounded-full p-6 transform hover:scale-110 transition duration-300 ease-in-out">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mt-4 text-yellow-600 tracking-wide">{title}</h3>
                  <p className="text-gray-600 mt-2 text-sm">
                    {readMoreStates[feature.id] ? description : `${description.slice(0, 100)}...`}
                  </p>
                  {description.length > 100 && (
                    <button
                      onClick={() => toggleReadMore(feature.id)}
                      className="text-yellow-600 font-semibold mt-2 hover:text-yellow-800 transition duration-200 ease-in-out"
                    >
                      {readMoreStates[feature.id] ? translations[language]?.readLess || "Read Less" : translations[language]?.readMore || "Read More"}
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Image Section */}
          <motion.div
            className="flex justify-center w-full h-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={kohi1} 
              alt="About Us" 
              className="w-full max-w-md h-auto rounded-2xl shadow-2xl object-cover transform hover:scale-105 transition duration-300 ease-in-out"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
