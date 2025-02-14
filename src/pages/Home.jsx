import { motion } from "framer-motion";
import '../styles/Button.css';
import HeroIndex from "../components/home/HeroIndex";
// import Catalog from "./Catalog"; 
import BackToTop from "../components/BackToTop";
import Services from "../components/Services";
import HeroCarousel from "../components/HeroCarousel";
import ChatWhatsApp from "../components/ChatWhatsApp";
import CoffeeSection from "../components/CoffeeSection";
import SideImage from '../assets/images/coffee5.gif';
import Discover from "./Discover";
import Layouts from "../components/Layouts";
import Features from "../components/home/Features";
import SignatureMenu from "../components/SignatureMenu";

// Animation Variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1 },
};

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.3 } },
};


export default function Home() {
  
  return (
    <div>
      <ChatWhatsApp />
      <BackToTop />
      <HeroIndex />
      <div className="relative w-full max-w-3xl mx-auto overflow-hidden" 
    >
      <motion.div
        className="flex"
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >      
          <div className="min-w-full">
            <img src={SideImage} alt="" className="w-full rounded-xl shadow-lg" />
          </div>          
        </motion.div>
      </div>

      {/* signatureMenu */}
      <SignatureMenu />

      {/* carousel */}
      <HeroCarousel />

      {/* coffeeSection */}
      <motion.div
        className="flex justify-center my-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
      <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-800 drop-shadow-lg text-center">
      𝑲𝑶𝑯𝑰 𝑪𝒐𝒇𝒇𝒆é 幸</h2>
      </motion.div>   

      <CoffeeSection />
      
      {/* woman cover */}
      <Layouts />

      {/* Catalog Section */}
      {/* <Catalog /> */}

      {/* services */}
      <Services />

       {/* Features Section */}
       <Features staggerContainer={staggerContainer} fadeIn={fadeIn} />

      {/* Newsletter Section */}
      {/* <NewsletterSection /> */}

       {/* discoverImage */}
       <Discover />
      
    </div>
  );
}

// Newsletter Component
// function NewsletterSection() {
//   const { translations, language } = useLanguage();
  
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-16">
//       <motion.div
//         variants={fadeIn}
//         initial="initial"
//         whileInView="animate"
//         viewport={{ once: true }}
//         className="bg-black text-white rounded-2xl p-12 text-center relative overflow-hidden"
//       >
//         <motion.div
//           initial={{ scale: 0.8, opacity: 0 }}
//           whileInView={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-3xl font-bold mb-4 sm:text-2xl">
//             {translations[language]?.newsletterTitle}
//           </h2>
//           <p className="mb-8 opacity-90 sm:text-sm">
//             {translations[language]?.newsletterText}
//           </p>
//           <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
//             <input
//               type="email"
//               placeholder={translations[language]?.emailPlaceholder}
//               className="flex-1 px-4 py-3 rounded-md text-black mb-4 sm:mb-0"
//             />
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               className="button"
//             >
//               {translations[language]?.subscribe}
//             </motion.button>
//           </form>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }
