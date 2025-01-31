import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Collection({ fadeIn, staggerContainer }) {
  return (
    <div className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={fadeIn}>
            <h2 className="text-4xl font-bold mb-6">Summer Collection 2024</h2>
            <p className="text-gray-400 mb-8">
              Experience the perfect blend of style and comfort with our latest
              summer collection. Designed for the modern lifestyle, each piece
              is crafted with premium materials and attention to detail.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-white text-black px-8 py-3 rounded-md hover:bg-gray-100"
            >
              Explore Collection
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 gap-4"
          >
            <motion.img
              variants={fadeIn}
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800"
              alt="Summer Collection"
              className="rounded-lg"
            />
            <motion.img
              variants={fadeIn}
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800"
              alt="Summer Collection"
              className="rounded-lg mt-8"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Collection;
