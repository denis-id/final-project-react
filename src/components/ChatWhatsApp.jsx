import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSend, FiX } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

export default function ChatWhatsApp() {
  const phoneNumber = "6282340987518";
  const [isVisible, setIsVisible] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
    const { language, translations } = useLanguage();

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  const handleSend = () => {
    const message = encodeURIComponent(customMessage || "Hello, I would like to order coffee");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    setShowInput(false);
    setCustomMessage("");
  };

  const handleClose = () => {
    setShowInput(false);
    setCustomMessage("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed left-0 top-1/2 -translate-y-1/2 flex items-center backdrop-blur-lg p-1 rounded-r-md shadow-md bg-white/30 hover:bg-green-950"
      style={{ zIndex: "9999" }}
    >
      <div
        onClick={() => setShowInput(!showInput)}
        className="text-green-500 flex items-center gap-1 p-1 group cursor-pointer"
      >
        <motion.img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp Logo"
          className="w-5 h-5 md:w-6 md:h-6"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="hidden group-hover:inline text-white text-xs transition-opacity duration-300 opacity-0 group-hover:opacity-100">Chat with us</span>
      </div>
      {showInput && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "auto", opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex items-center gap-2 bg-white rounded-md ml-2 p-1"
        >
          <input
            type="text"
            placeholder={translations[language]?.chatType}
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="p-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSend}
            className="bg-green-500 text-white p-1 rounded-md hover:bg-green-600"
          >
            <FiSend size={20} />
          </button>
          <button
            onClick={handleClose}
            className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600"
          >
            <FiX size={20} />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
