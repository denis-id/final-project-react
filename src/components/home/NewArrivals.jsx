import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

function NewArrivals({ fadeIn, staggerContainer }) {
  return (
    <div className="bg-white py-16">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4"
      >
        <motion.h2
          variants={fadeIn}
          className="text-3xl font-bold text-center mb-12"
        >
          New Arrivals
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {[
            {
              name: "Summer Dress",
              price: "$89.99",
              image: "photo-1515886657613-9f3515b0c78f",
            },
            {
              name: "Casual Shirt",
              price: "$49.99",
              image: "photo-1589310243389-96a5483213a8",
            },
            {
              name: "Denim Jacket",
              price: "$129.99",
              image: "photo-1542272604-787c3835535d",
            },
            {
              name: "Leather Bag",
              price: "$199.99",
              image: "photo-1548036328-c9fa89d128fa",
            },
          ].map((product, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link to="/products" className="block">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={`https://images.unsplash.com/${product.image}?w=400`}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-gray-600">{product.price}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NewArrivals;
