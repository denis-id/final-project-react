import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSend, FiX } from "react-icons/fi";
import axios from "axios";
import { useLanguage } from "../context/LanguageContext";
import robots from "../assets/images/robotz.png";

export default function ChatBot() {
  const { language, translations } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    console.log("Chatbot muncul setelah 500ms");
    const timeout = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (showInput && chatHistory.length === 0) {
      setChatHistory([{ sender: "bot", text: "Hola this is Live Chatbot.\nWelcome to Kohi Coffeé, how can I assist you today?\n\n-Denis" }]);
    }
  }, [showInput]);

  const handleSend = async () => {
    console.log("Mengirim pesan:", customMessage);
    if (!customMessage.trim()) return;
  
    const userMessage = { sender: "user", text: customMessage };
    setChatHistory([...chatHistory, userMessage]);
    setCustomMessage("");
    setIsLoading(true);
  
    try {
      const response = await axios.post(
        "http://localhost:8000/api/chatbot", 
        { message: customMessage }
      );
  
      const botResponse = response.data.choices?.[0]?.message?.content || "Bot tidak memberikan respon.";
      console.log("Respon dari bot:", response.data);
      setTimeout(() => {
        setChatHistory((prevChat) => [...prevChat, { sender: "bot", text: botResponse }]);
        setIsLoading(false);
      }, 1500); 
    } catch (error) {
      console.error("Error fetching response: ", error);
      setChatHistory((prevChat) => [...prevChat, { sender: "bot", text: "Maaf, terjadi kesalahan." }]);
    }
  };

  const handleClose = () => {
    setShowInput(false);
    setChatHistory([]);
    setCustomMessage("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed left-0 top-1/2 -translate-y-1/2 flex flex-col items-start backdrop-blur-md p-2 rounded-r-md shadow-md bg-white/30 shadow-black"
      style={{ zIndex: "9999" }}
    >
      <div 
      onClick={() => setShowInput(!showInput)} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative text-blue-400 flex items-center gap-1 p-1 group cursor-pointer">
      <motion.img
          src={robots}
          alt="Chatbot Icon"
          className="w-10 h-10 md:w-12 md:h-12 object-contain"
          animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="absolute left-12 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md text-black font-semibold px-2 py-1 rounded-md text-sm shadow-lg shadow-black"
          >
            {translations[language]?.liveChatBot}
          </motion.div>
           )}
      </div>
      {showInput && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "auto", opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-white p-2 rounded-md w-64 shadow-lg"
        >
          <div className="h-40 overflow-y-auto border-b mb-2">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`p-1 ${chat.sender === "user" ? "text-right" : "text-left"}`}>
                <span
                  className={`inline-block p-1 rounded-md 
                    ${chat.sender === "user" 
                    ? "bg-gradient-to-r from-red-500 to-red-700 text-white" 
                    : "bg-gradient-to-r from-gray-200 to-gray-300 text-black"}`}
                  style={{ whiteSpace: "pre-line" }} 
                  >
                  {chat.text}
                </span>
              </div>
            ))}
            {isLoading && ( 
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              className="w-6 h-6 mx-auto fill-gray-500"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="100" strokeDashoffset="0" />
            </motion.svg>
           )}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder={translations[language]?.chatType}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="p-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black w-full"
            />
            <button onClick={handleSend} className="bg-green-500 text-white p-1 rounded-md hover:bg-green-600">
              <FiSend size={20} />
            </button>
            <button onClick={handleClose} className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600">
              <FiX size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
