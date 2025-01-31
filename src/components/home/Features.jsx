import React from "react";
import { motion } from "framer-motion";
import { Star, Truck, Shield, Clock } from "lucide-react";
const Features = ({ staggerContainer, fadeIn }) => {
  return (
    <div className="bg-gray-50 py-16">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              icon: Truck,
              title: "Free Shipping",
              desc: "On orders over $100",
            },
            {
              icon: Shield,
              title: "Secure Payment",
              desc: "100% secure payment",
            },
            { icon: Clock, title: "24/7 Support", desc: "Dedicated support" },
            {
              icon: Star,
              title: "Quality Products",
              desc: "Handpicked items",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="w-10 h-10 mx-auto mb-4 text-black" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Features;
