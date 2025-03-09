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

      {/* services */}
      <Services />

       {/* Features Section */}
       <Features staggerContainer={staggerContainer} fadeIn={fadeIn} />

       {/* discoverImage */}
       <Discover />
      
    </div>
  );
}