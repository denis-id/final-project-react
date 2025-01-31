import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  Truck,
  Shield,
  Clock,
  Heart,
  Instagram,
  Sparkles,
  Gift,
  Zap,
} from "lucide-react";
import HeroIndex from "../components/home/HeroIndex";
import Features from "../components/home/Features";
import FeaturedCategory from "../components/home/FeaturedCategory";
import Collection from "../components/home/Collection";
import Benefits from "../components/home/Benefits";
import NewArrivals from "../components/home/NewArrivals";

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
      <FeaturedCategory />
      {/* Collection Showcase */}
      <Collection fadeIn={fadeIn} staggerContainer={staggerContainer} />
      {/* Benefits Section */}
      <Benefits fadeIn={fadeIn} staggerContainer={staggerContainer} />
      {/* New Arrivals */}
      <NewArrivals fadeIn={fadeIn} staggerContainer={staggerContainer} />
      {/* Instagram Feed */}
      {/* <div className="py-16 bg-gray-50">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4"
        >
          <motion.div
            variants={fadeIn}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <Instagram className="w-6 h-6" />
            <h2 className="text-3xl font-bold">Follow Us @apparel</h2>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-6 gap-4"
          >
            {[
              "photo-1515886657613-9f3515b0c78f",
              "photo-1496747611176-843222e1e57c",
              "photo-1589310243389-96a5483213a8",
              "photo-1542272604-787c3835535d",
              "photo-1548036328-c9fa89d128fa",
              "photo-1551537482-f2075a1d41f2",
            ].map((image, index) => (
              <motion.a
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                href="#"
                className="block aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={`https://images.unsplash.com/${image}?w=300`}
                  alt="Instagram post"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div> */}

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
