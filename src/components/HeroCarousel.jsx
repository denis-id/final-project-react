import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Barista from '../assets/images/coffee-brewing.webp';
import Beans from '../assets/images/premiumBeans.webp';
import Cafes from '../assets/images/cozypl.jpg';
import { useLanguage } from "../context/LanguageContext";
// import { useNavigate } from "react-router-dom";

export default function HeroCarousel() {
  const { language, translations } = useLanguage();
  // const navigate = useNavigate();
  const [current, setCurrent] = useState(1); // mulai dari ID 1

  const slides = useMemo(() => [
    { 
      id: 1, 
      image: Barista, 
      title: translations[language]?.brewTitle, 
      description: translations[language]?.brewDesc 
    },
    { 
      id: 2, 
      image: Beans, 
      title: translations[language]?.beanTitle, 
      description: translations[language]?.beanDesc
    },
    { 
      id: 3, 
      image: Cafes, 
      title: translations[language]?.cozyTitle, 
      description: translations[language]?.cozyDesc 
    }
  ], [language, translations]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => {
        const currentIndex = slides.findIndex(slide => slide.id === prev);
        const nextSlide = slides[(currentIndex + 1) % slides.length];
        return nextSlide.id;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]); // Depend on slides.length to avoid unnecessary re-renders

  const goToSlide = useCallback((id) => setCurrent(id), []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden shadow-lg">
      <AnimatePresence>
        {slides.map(slide =>
          slide.id === current && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-6">
                <h1 className="text-4xl font-bold text-white mb-4">{slide.title}</h1>
                <p className="text-lg text-white mb-6">{slide.description}</p>
                {/* <button  onClick={() => navigate("/about")} className="px-6 py-2 bg-orange-700 hover:bg-blue-600 transition duration-300 text-white rounded-lg shadow-lg">
                  {translations[language]?.explore}
                </button> */}
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map(slide => (
          <button
            key={slide.id}
            onClick={() => goToSlide(slide.id)}
            className={`w-3 h-3 rounded-full ${slide.id === current ? "bg-white" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
}
