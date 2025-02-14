import React from 'react'
import process from '../assets/images/home-process.jpg';
import { useLanguage } from "../context/LanguageContext";

export default function Discover() {
    const { translations, language } = useLanguage();

  return (
    <div>  
        <div className="relative w-full h-[400px]">
            <img src={process} alt="Discover the process" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h1 className="text-white text-4xl md:text-5xl font-bold">{translations[language]?.discoverDesc}</h1>
            </div>
        </div>
      </div>
  )
}
