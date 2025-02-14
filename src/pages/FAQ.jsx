// src/components/FAQ.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FAQ = () => {
  // State to track which question is open
  const [openIndex, setOpenIndex] = useState(null);

  // Data for FAQ
  const faqData = [
    {
      question: "What is Kohi Coffee?",
      answer: "description."
    },
    {
      question: "How to order?",
      answer: "description."
    },
    {
      question: "How much the price?",
      answer: "description."
    },
    {
      question: "Where is the location exactly?",
      answer: "description."
    },
    {
      question: "What is the difference between other coffeeshop?",
      answer: "description."
    },
  ];

  // Toggle function to open/close a question
  const toggleQuestion = (index) => {
    if (index === openIndex) {
      setOpenIndex(null); // Close the question if it's already open
    } else {
      setOpenIndex(index); // Open the clicked question
    }
  };

  return (
    <div className="faq-container max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
      <div className="faq-list space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">
            <motion.div
              className="faq-question bg-gradient-to-r from-purple-500 to-indigo-600 p-4 rounded-lg cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
              onClick={() => toggleQuestion(index)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
            </motion.div>

            {/* Animated answer section */}
            <motion.div
              className="faq-answer bg-white p-4 mt-2 rounded-lg shadow-md transition-all duration-300 ease-in-out"
              initial={{ opacity: 0, y: 20 }}
              animate={openIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {openIndex === index && (
                <p className="text-gray-700">{faq.answer}</p>
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
