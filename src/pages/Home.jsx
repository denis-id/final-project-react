
import { motion } from "framer-motion";

import HeroIndex from "../components/home/HeroIndex";
import Features from "../components/home/Features";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1 },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export default function Home() {
  return (
    <div>
      {/* Hero Section with Video Background */}
      <HeroIndex />
      {/* Features Section */}
      <Features staggerContainer={staggerContainer} fadeIn={fadeIn} />
      {/* Featured Categories */}

      {/* Collection Showcase */}

      {/* Benefits Section */}

      {/* New Arrivals */}

      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="bg-black text-white rounded-2xl p-12 text-center relative overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="mb-8 opacity-90">
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md text-black"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-white text-black px-8 py-3 rounded-md hover:bg-gray-100"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
