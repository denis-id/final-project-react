import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import Hero from "../components/Hero";
import { useLanguage } from "../context/LanguageContext"; 
import BackToTop from "../components/BackToTop";
import ChatWhatsApp from "../components/ChatWhatsApp";
import { motion } from "framer-motion";

export default function Contact() {
  const { language, translations } = useLanguage(); 
  const t = translations[language];

  // Animation configuration
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen">
      {/* Back to Top Button */}
      <BackToTop /> 

      {/* Back to WhatsApp */}
      <ChatWhatsApp />

      <Hero title={t.ContactTitle} description={t.ContactDesc} />

      {/* Animated container with white background */}
      <motion.div 
        className="max-w-7xl mx-auto px-6 py-16 bg-white rounded-xl shadow-lg"
        initial="hidden" 
        animate="visible"
        variants={containerVariants}
      >
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 drop-shadow-lg">{t.ContactTitle}</h1> 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">{t.ContactInfo}</h2> 
            <div className="space-y-6">
              <motion.div className="flex items-start space-x-4 p-4 rounded-lg bg-blue-100 shadow-md" variants={itemVariants}>
                <MapPin className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-medium text-gray-700">{t.ContactAddress}</h3> 
                  <p className="text-gray-600">Sanur, Denpasar Bali</p>
                </div>
              </motion.div>
              <motion.div className="flex items-start space-x-4 p-4 rounded-lg bg-blue-100 shadow-md" variants={itemVariants}>
                <Phone className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-medium text-gray-700">{t.ContactPhone}</h3> 
                  <p className="text-gray-600">+62 82340987518</p>
                </div>
              </motion.div>
              <motion.div className="flex items-start space-x-4 p-4 rounded-lg bg-blue-100 shadow-md" variants={itemVariants}>
                <Mail className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-medium text-gray-700">{t.ContactEmailLabel}</h3> 
                  <p className="text-gray-600">denisryana2012@gmail.com</p>
                </div>
              </motion.div>
              <motion.div className="flex items-start space-x-4 p-4 rounded-lg bg-blue-100 shadow-md" variants={itemVariants}>
                <Instagram className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-medium text-gray-700">Instagram</h3> 
                  <a href="https://www.instagram.com/denisryna/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">@denisryna</a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{t.ContactBusinessHours}</h3>
            <div className="space-y-2 bg-blue-100 p-6 rounded-lg shadow-md">
              {t.ContactBusinessTimes.map((hours, index) => (
                <motion.div className="flex justify-between text-gray-700" key={index} variants={itemVariants}>
                  <span>{hours.day}</span>
                  <span>{hours.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}