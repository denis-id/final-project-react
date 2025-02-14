import { motion } from "framer-motion";
import coffeeImage from "../assets/images/heroImage.jpg";
import { useLanguage } from "../context/LanguageContext";
import { useState } from "react";

const Entertain = () => {
  const { language, translations } = useLanguage();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (district) => {
    setOpenDropdown(openDropdown === district ? null : district);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-8 bg-gray-100">
      {/* Left Section */}
      <motion.div
        className="md:w-1/2 text-center md:text-left p-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >

        {/* Image */}
        <img
          src={coffeeImage}
          alt="EJJI Coffee Corner"
          className="w-full h-auto mt-4 rounded-md shadow-lg"
        />

        {/* Dropdown Sections */}
        <div className="mt-6 space-y-2">
          {["Surabaya", "Bali", "Temanggung"].map((district) => (
            <div key={district} className="border rounded-md">
              <button
                className="w-full p-3 text-left flex justify-between items-center bg-white"
                onClick={() => toggleDropdown(district)}
              >
                {district}
                <span>{openDropdown === district ? "−" : "+"}</span>
              </button>
              {openDropdown === district && (
                <div className="p-4 bg-gray-50">
                  {district === "Temanggung" && (
                    <div>
                      <span className="text-lg font-bold">
                        District 22 - TEMANGGUNG
                      </span>
                      <p>Jalan Brigjend Katamso 30, Temanggung, Jawa Tengah</p>
                      <a href="#" className="text-blue-600">
                        Lihat lokasi
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right Section (Image) */}
      <motion.div
        className="md:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src={coffeeImage}
          alt="Coffee Culture"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </motion.div>
    </div>
  );
};

export default Entertain;
