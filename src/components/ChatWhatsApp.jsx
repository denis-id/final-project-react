import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ChatWhatsApp() {
  const phoneNumber = "6282340987518";
  const message = encodeURIComponent("Hello, I would like to order coffee");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed left-0 top-1/2 -translate-y-1/2 backdrop-blur-lg p-1 rounded-r-md shadow-md bg-white/30 hover:bg-green-950"
      style={{ zIndex: "9999" }}
    >
      <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 flex items-center gap-1 p-1 group"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M20.52 3.48A11.95 11.95 0 0 0 12 0C5.37 0 0 5.37 0 12a11.94 11.94 0 0 0 2.16 6.85L.3 24l5.32-1.85A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.18-3.48-8.52zM12 22a9.94 9.94 0 0 1-5.09-1.39l-.36-.21-3.16 1.1 1.1-3.16-.21-.36A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.49-7.41c-.3-.15-1.77-.88-2.04-.98-.27-.1-.47-.15-.67.15s-.77.98-.95 1.18c-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.41-1.48a9.03 9.03 0 0 1-1.67-2.08c-.17-.3 0-.47.12-.64.12-.13.27-.35.4-.52s.17-.3.27-.5c.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.91-2.2-.24-.59-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37s-1.05 1-1.05 2.43 1.08 2.81 1.23 3.01c.15.2 2.13 3.25 5.18 4.56 1.8.78 2.5.85 3.39.72.52-.08 1.77-.72 2.02-1.41.25-.69.25-1.28.17-1.41-.08-.13-.27-.2-.57-.35z"
          />
        </motion.svg>
        <span className="hidden group-hover:inline text-white text-xs transition-opacity duration-300 opacity-0 group-hover:opacity-100">Chat with us</span>
      </a>
    </motion.div>
  );
}
