// import { ArrowRight } from "lucide-react";
import React from "react";
// import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import { useLanguage } from "../context/LanguageContext";
import heroVideo from "../assets/videos/heroVideo.mp4";
import Typewriter from "typewriter-effect";

function Hero({ title, description }) {
  // const { language, translations } = useLanguage();

  return (
    <div className="relative h-[80vh] sm:h-[60vh] overflow-hidden">
      {/* Background Video */}
     <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Animated Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center text-white max-w-4xl px-6">
          {/* Typewriter Title */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
          >
            <Typewriter
              options={{
                strings: title,
                autoStart: true,
                loop: true,
                delay: 75,
              }}
            />
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg sm:text-xl mb-6 opacity-90"
          >
            {description}
          </motion.p>

          {/* Buttons */}
          {/* <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/menu"
              className="bg-white text-black px-6 py-2 sm:px-8 sm:py-3 rounded-md hover:bg-red-700 inline-flex items-center justify-center transition-all"
              aria-label="Shop Now"
            >
              {translations[language].order}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div> */}
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;
