import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
function FeaturedCategory({ staggerContainer, fadeIn }) {
  return (
    <motion.div className="max-w-7xl mx-auto px-4 py-16">
      <motion.h2
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-12"
      >
        Shop by Category
      </motion.h2>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {[
          { name: "T-Shirts", image: "photo-1521572163474-6864f9cf17ab" },
          { name: "Hoodies", image: "photo-1556821840-3a63f95609a7" },
          { name: "Jackets", image: "photo-1551537482-f2075a1d41f2" },
        ].map((category) => (
          <motion.div
            key={category.name}
            variants={fadeIn}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <Link to="/products" className="block">
              <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
                <img
                  src={`https://images.unsplash.com/${category.image}?w=800`}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default FeaturedCategory;
