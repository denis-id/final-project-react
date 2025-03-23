import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const testimonials = [
  {
    text: "Kohi Coffee serves an incredible coffee experience! The distinctive aroma and balanced taste truly make each coffee break special.",
    author: "Dhita Utami / PT Pertamina Patra Niaga",
  },
  {
    text: "A cozy place with a warm atmosphere. The coffee is of high quality, and the baristas are friendly and knowledgeable about their craft.",
    author: "Budi Santoso / ABC Corporation",
  },
  {
    text: "Kohi Coffee is my favorite spot for a special coffee. Each sip offers a rich and deep experience.",
    author: "Sarah Johnson / XYZ Ltd.",
  },
  {
    text: "Not only is the coffee delicious, but the presentation is also very appealing! Kohi Coffee truly understands the art of serving coffee.",
    author: "Michael Tan / DEF Enterprises",
  },
  {
    text: "Highly recommended! Kohi Coffee offers an authentic coffee experience with top-notch quality.",
    author: "Lisa Wong / GHI Agency",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { translations, language } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://humblerbrother.com/wp-content/uploads/2024/02/Minuman-Kopi-yang-harus-kamu-coba-saat-Liburan-ke-Melbourne.jpg')" }}>
      {/* Left Section */}
      <div className="flex-1 bg-[#685c42] bg-opacity-80 text-white p-8 md:p-16 flex flex-col justify-center relative transition-all duration-500">
        <div className="text-3xl md:text-4xl font-bold mb-4">&#8220;</div>
        <p className="text-base md:text-lg mb-4 leading-relaxed">{testimonials[currentIndex].text}</p>
        <p className="font-bold">{testimonials[currentIndex].author}</p>

        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex space-x-2 md:space-x-3">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 md:w-6 md:h-6 flex items-center justify-center border border-white rounded-full text-white text-sm font-semibold cursor-pointer transition-all duration-300 ${
                index === currentIndex ? "bg-white text-[#0F4B46]" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-black bg-opacity-80 text-white flex items-center justify-center p-8 md:p-16 text-center md:text-right">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">{translations[language]?.discoverDesc}</h2>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">{translations[language]?.discoversDescs}</h2>
          <h3 className="text-3xl md:text-5xl italic text-gray-400 mt-2">{translations[language]?.disco} 𝕂𝕠𝕙𝕚 ℂ𝕠𝕗𝕗𝕖é 幸</h3>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;