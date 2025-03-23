import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import heroVideo from "../../assets/videos/heroVideo.mp4";
import { Typewriter } from "react-simple-typewriter";

const HeroIndex = () => {
  const { language, translations } = useLanguage();

  const animationProps = (delay = 0, duration = 0.8) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration },
  });

  return (
    <div className="relative h-[75vh] sm:h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
        onError={(e) => {
        e.target.style.display = "none";
        document.getElementById("fallback-image").style.display = "block";
        }}
        >{translations[language]?.videoTag}
        <source src={heroVideo} type="video/mp4" />
      </video>
      <img
        id="fallback-image"
        src="/path-to-image/heroImage.jpg"
        alt="Fallback background"
        className="absolute inset-0 w-full h-full object-cover hidden"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Animated Content */}
      <motion.div
        {...animationProps(0, 1)}
        className="relative z-10 text-center text-white px-6 sm:px-10 max-w-4xl"
      >
        {/* Title with Typewriter Effect */}
        <motion.h1
          {...animationProps(0.3, 0.8)}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
        >
          <Typewriter
            words={["KOHI Coffeé 幸"]}
            loop={false}
            cursor
            cursorStyle="_"
            typeSpeed={100}
            deleteSpeed={50}
          />
        </motion.h1>

        {/* Description */}
        <motion.p
          {...animationProps(0.4, 0.8)}
          className="text-lg sm:text-xl mb-6 opacity-90"
        >
          {translations[language]?.discover}
        </motion.p>

        {/* Buttons */}
        <motion.div
          {...animationProps(0.6, 0.8)}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <Link
            to="/menu"
            className="bg-white text-black px-6 py-2 sm:px-8 sm:py-3 rounded-md hover:bg-red-700 inline-flex items-center justify-center transition-all"
            aria-label=""
          >
            {translations[language]?.order}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroIndex;
