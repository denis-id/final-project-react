import { Mail, Phone, MapPin } from "lucide-react";
import Hero from "../components/Hero";
import { useLanguage } from "../context/LanguageContext"; 
import BackToTop from "../components/BackToTop";
import ChatWhatsApp from "../components/ChatWhatsApp";
import { motion } from "framer-motion";

export default function Contact() {
  const { language, translations } = useLanguage(); 
  const t = translations[language];

  // Animation configuration for container
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div style={{backgroundColor:'white'}}>
      {/* Back to Top Button */}
      <BackToTop /> 

      {/* Back to WhatsApp */}
      <ChatWhatsApp />

      <Hero
        title={t.ContactTitle} 
        description={t.ContactDesc} 
      />
      
      {/* Animated container with white background */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 py-16 bg-white"
        initial="hidden" 
        animate="visible"
        variants={containerVariants}
      >
        <h1 className="text-4xl font-bold text-center mb-12">{t.ContactTitle}</h1> 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">{t.ContactInfo}</h2> 
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.ContactName}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder={t.ContactNameLabel} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.ContactEmail} 
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder={t.EmailLabel}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.ContactMessage} 
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder={t.ContactMessageLabel} 
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
              >
                {t.ContactSendMessage} 
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">{t.ContactInfo}</h2> 
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-medium">{t.ContactAddress}</h3> 
                  <p className="text-gray-600">
                    Sanur, Denpasar Bali
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-medium">{t.ContactPhone}</h3> 
                  <p className="text-gray-600">+62 82340987518</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-medium">{t.ContactEmailLabel}</h3> 
                  <p className="text-gray-600">denisryana2012@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">{t.ContactBusinessHours}</h3>
              <div className="space-y-2">
                {t.ContactBusinessTimes.map((hours, index) => (
                  <div className="flex justify-between" key={index}>
                    <span>{hours.day}</span>
                    <span>{hours.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
