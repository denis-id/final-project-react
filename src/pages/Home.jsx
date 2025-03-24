import { motion } from "framer-motion";
import '../styles/Button.css';
import HeroIndex from "../components/home/HeroIndex";
import BackToTop from "../components/BackToTop";
import Services from "../components/Services";
import ChatWhatsApp from "../components/ChatWhatsApp";
import CoffeeSection from "../components/CoffeeSection";
import SideImage from '../assets/images/coffee5.gif';
import Layouts from "../components/Layouts";
import Features from "../components/home/Features";
import SignatureMenu from "../components/SignatureMenu";
import Carousel from "./Carousel";
import Testimonial from "./Testimonial";

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
    <motion.div initial="initial" animate="animate" variants={staggerContainer}>

      <ChatWhatsApp />
      <BackToTop />

      <motion.div variants={fadeIn}>

        <HeroIndex />
        
      </motion.div>
      
      <motion.div className="relative w-full max-w-3xl mx-auto overflow-hidden" variants={fadeIn}>
        <motion.div className="flex" transition={{ type: "spring", stiffness: 200, damping: 30 }}>
          <div className="min-w-full">
            <img src={SideImage} alt="" className="w-full rounded-xl shadow-lg" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={fadeIn}>
        <SignatureMenu />
      </motion.div>

      <motion.div variants={fadeIn}>
        <Carousel />
      </motion.div>

      <motion.div className="flex justify-center my-10" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
        <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-800 drop-shadow-lg text-center">
          𝑲𝑶𝑯𝑰 𝑪𝒐𝒇𝒇𝒆é 幸
        </h2>
      </motion.div>
      
      <motion.div variants={fadeIn}>
        <CoffeeSection />
      </motion.div>
      
      <motion.div variants={fadeIn}>
        <Layouts />
      </motion.div>
      
      <motion.div variants={fadeIn}>
        <Services />
      </motion.div>
      
      <motion.div variants={fadeIn}>
        <Features />
      </motion.div>
      
      <motion.div variants={fadeIn}>
        <Testimonial />
      </motion.div>
    </motion.div>
  );
}