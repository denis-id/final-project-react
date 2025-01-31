import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
function HeroIndex() {
  return (
    <div className="relative h-[60vh] overflow-hidden">
      <img
        src="https://img.freepik.com/free-photo/view-hawaiian-shirt-with-floral-print-hanger-belt_23-2149366089.jpg?t=st=1738212195~exp=1738215795~hmac=74cb62fe35e7ee08fe4aa7c2b9276d98bd7d15ac8c0ec9bc7501941077b589e2&w=1800"
        alt=""
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center text-white max-w-3xl px-4">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl font-bold mb-6"
          >
            Elevate Your Style
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl mb-8 opacity-90"
          >
            Discover our curated collection of premium apparel that combines
            comfort, style, and sustainability.
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex gap-4 justify-center"
          >
            <Link
              to="/products"
              className="bg-white text-black px-8 py-3 rounded-md hover:bg-gray-100 inline-flex items-center"
            >
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-black transition-colors"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default HeroIndex;
