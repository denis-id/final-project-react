import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Gift, Zap } from "lucide-react";
function Benefits({ fadeIn, staggerContainer }) {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeIn} className="text-3xl font-bold mb-4">
            Why Choose APPAREL
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            We're committed to providing the best shopping experience with
            premium quality products and exceptional service.
          </motion.p>
        </motion.div>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Sparkles,
              title: "Premium Quality",
              description:
                "Carefully selected materials and expert craftsmanship ensure lasting quality.",
            },
            {
              icon: Gift,
              title: "Exclusive Offers",
              description:
                "Enjoy member-only discounts and early access to new collections.",
            },
            {
              icon: Zap,
              title: "Fast Delivery",
              description:
                "Quick and reliable shipping to get your items to you as soon as possible.",
            },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <benefit.icon className="w-12 h-12 mx-auto mb-6 text-black" />
              <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Benefits;
