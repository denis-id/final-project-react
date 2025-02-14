import { motion } from 'framer-motion';
import coffeeImage from '../assets/images/heroImage.jpg';
import { useLanguage } from "../context/LanguageContext";
import { useState } from "react";

const CoffeeSection = () => {
    const { language, translations } = useLanguage();
    const [openDropdown, setOpenDropdown] = useState(null);
    
    const toggleDropdown = (district) => {
        setOpenDropdown(openDropdown === district ? null : district);
    };
    
    return (
        <div className="flex flex-col md:flex-row items-center justify-center p-6 md:p-12 bg-[#EFE8D9]">
            <motion.div 
                className="md:w-1/2 text-center md:text-left p-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    {translations[language]?.coffeeTalkTitle}
                </h1>
                <p className="text-md md:text-lg text-gray-600 mb-6">
                    {translations[language]?.coffeeTalkDesc}
                </p>
                <h1 className="text-lg md:text-xl font-bold mb-4"> 
                    {translations[language]?.coffeeTalkLoc}:
                </h1>
                <div className="mt-6 space-y-3 w-full md:h-[300px] overflow-y-auto">
                    {["Surabaya", "Bali", "Jakarta"].map((district) => (
                        <div key={district} className="border rounded-md overflow-hidden">
                            <button
                                className="w-full p-3 text-left flex justify-between items-center bg-white focus:outline-none"
                                onClick={() => toggleDropdown(district)}
                            >
                                {district}
                                <span className="text-lg">{openDropdown === district ? "−" : "+"}</span>
                            </button>
                            {openDropdown === district && (
                                <div className="p-4 bg-gray-50">
                                    {district === "Jakarta" && (
                                        <div>
                                            <span className="text-lg font-bold">Kemang District - DKI Jakarta</span>
                                            <p>Jalan Kemayoran, Jakarta Selatan</p>
                                            <a href="#" className="text-blue-600 underline">Lihat lokasi</a>
                                        </div>
                                    )}
                                    {district === "Surabaya" && (
                                        <div>
                                            <span className="text-lg font-bold">Tunjungan District - Surabaya</span>
                                            <p>Jalan Tunjungan, Surabaya</p>
                                            <a href="#" className="text-blue-600 underline">Lihat lokasi</a>
                                        </div>
                                    )}
                                    {district === "Bali" && (
                                        <div>
                                            <span className="text-lg font-bold">Ubud District - Bali</span>
                                            <p>Jalan Raya Ubud, Bali</p>
                                            <a href="#" className="text-blue-600 underline">Lihat lokasi</a>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>
            <motion.div 
                className="md:w-1/2 flex justify-center mt-6 md:mt-0 fixed md:relative right-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            >
                <img 
                    src={coffeeImage} 
                    alt="Coffee Culture" 
                    className="rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl h-auto object-cover"
                />
            </motion.div>
        </div>
    );
};

export default CoffeeSection;
