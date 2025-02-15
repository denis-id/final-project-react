import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, Heart, Star, X, ShoppingBag } from "lucide-react";
import { formatPrice } from "../utils/helper";
import { useLanguage } from "../context/LanguageContext";

export default function MenuCard({ menu, viewMode = "grid" }) {
  const [isFavorite, setIsFavorite] = useState(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    return savedFavorites[menu.id] || false;
  });

  const [rating, setRating] = useState(() => {
    const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    return savedRatings[menu.id] || 0;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    savedFavorites[menu.id] = isFavorite;
    localStorage.setItem("favorites", JSON.stringify(savedFavorites));
  }, [isFavorite, menu.id]);

  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    savedRatings[menu.id] = rating;
    localStorage.setItem("ratings", JSON.stringify(savedRatings));
  }, [rating, menu.id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button key={star} onClick={() => handleRating(star)}>
        <Star className={`w-5 h-5 ${star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
      </button>
    ));
  };

  const { language, translations } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group relative p-4">
      <div className="relative overflow-hidden cursor-pointer group" onClick={() => setIsModalOpen(true)}>
        <img
          src={menu.image}
          alt={menu.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0      group-hover:opacity-100 transition-opacity duration-300">
          <Eye className="w-8 h-8 text-white" 
          /> <span className="text-white text-lg font-semibold">             
            {translations[language].clickMenu}
          </span>
        </div>
      </div>
      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
      >
        <Heart className={`w-6 h-6 text-red-500 ${isFavorite ? "fill-red-500" : ""}`} />
      </button>
      <div className="p-4">
        <h3 className="text-gray-600 font-semibold">{menu.name}</h3>
        <p className="text-gray-600 mt-1">{formatPrice(menu.price)}</p>
        <div className="flex items-center mt-2">{renderStars()}</div>
        <p className="text-gray-600 mt-1">Rating: {rating} / 5</p>
        {/* <p className="text-gray-500 mt-2"> {translations[language]?.menu?.find((item) => item.id === menu.id)?.description || "No description available"}</p> */}
        <Link
          to={`/menu/${menu.id}`}
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors w-fit mt-4"
        >
         <ShoppingBag className="w-5 h-5" 
         /> 
         {translations[language].viewDetails}
        </Link>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg">
            <button
              className="absolute top-3 right-3 bg-gray-200 p-2 rounded-full"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-5 h-5 text-red-500 font-bold" />
            </button>
            <img 
              src={menu.image} 
              alt={menu.name} 
              className="w-full h-64 object-cover rounded-md" 
            />
            <h2 className="text-gray-700 text-lg font-semibold mt-4">{menu.name}</h2>
            <p className="text-gray-600">{formatPrice(menu.price)}</p>
            <div className="flex items-center mt-2">{renderStars()}</div>
            <p className="text-gray-600 mt-1">Rating: {rating} / 5</p>
            <p className="text-gray-500 mt-2"> {translations[language]?.menu?.find((item) => item.id === menu.id)?.description || "No description available"}</p>
            <Link
              to={`/menu/${menu.id}`}
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors w-fit mt-4"
            >
              <ShoppingBag className="w-5 h-5" 
              /> 
              {translations[language].viewDetails}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
