import { motion } from 'framer-motion';
import { useEffect } from 'react';
import kohiMenu from "../assets/images/kohiMenu-bg.png";

const WelcomeAnnouncer = ({ onContinue }) => {
    useEffect(() => {
      const handleKeyPress = (event) => {
        onContinue();
      };
  
      window.addEventListener('keydown', handleKeyPress);
      window.addEventListener('click', onContinue);
  
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
        window.removeEventListener('click', onContinue);
      };
    }, [onContinue]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[#3E2723]">
      {/* Coffee steam animation */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-16 bg-white rounded-full opacity-20"
          style={{ top: `${50 + i * 5}%`, left: `${20 + i * 10}%` }}
          animate={{
            y: [-10, -100],
            opacity: [0.5, 0],
            scale: [1, 1.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut'
          }}
        />
      ))}
      
      {/* Announcement box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center bg-white bg-opacity-10 p-8 rounded-2xl backdrop-blur-lg shadow-lg relative"
      >
        <img 
          src={kohiMenu}
          alt="Logo" 
          className="w-20 h-20 mx-auto mb-4 animate-bounce"
        />
        <h1 className="text-2xl font-bold mb-4 text-white">Welcome to Kohi Coffeé 幸</h1>
        <button
          onClick={onContinue}
          className="bg-brown-500 font-bold text-white px-6 py-2 rounded-2xl shadow-lg transition transform hover:bg-orange-900 hover:scale-105 hover:shadow-2xl"
        >
          Press any key to continue
        </button>
      </motion.div>
    </div>
  );
};

export default WelcomeAnnouncer;
