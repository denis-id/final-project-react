import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, Heart, Star, X, ShoppingBag } from "lucide-react";
import { formatPrice } from "../utils/helper";
import { useLanguage } from "../context/LanguageContext";

export default function MenuCard({ menu, viewMode = "grid" }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
    document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    setIsFavorite(savedFavorites[menu?.id] || false);

    const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    setRating(savedRatings[menu?.id] || 0);
  }, [menu?.id]);

  useEffect(() => {
    if (menu?.id) {
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
      savedFavorites[menu.id] = isFavorite;
      localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    }
  }, [isFavorite, menu?.id]);

  useEffect(() => {
    if (menu?.id) {
      const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
      savedRatings[menu.id] = rating;
      localStorage.setItem("ratings", JSON.stringify(savedRatings));
    }
  }, [rating, menu?.id]);

  useEffect(() => {
    if (menu?.variants?.length > 0) {
      setSelectedVariant(menu.variants[0]);
    }
  }, [menu?.variants]);

  const toggleFavorite = () => setIsFavorite((prev) => !prev);
  const handleRating = (newRating) => setRating(newRating);

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button 
      key={star} 
      onClick={() => handleRating(star)}
      className={`transition-transform duration-200 hover:scale-125 ${
        star <= rating ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        <Star className={`w-5 h-5 ${star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
      </button>
    ));
  };

  const { language, translations } = useLanguage();
  if (!menu) return null;
  
return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group relative p-4 transition-all duration-300 hover:shadow-xl">
      <div className="relative overflow-hidden cursor-pointer group" 
        onClick={() => setIsModalOpen(true)}
        >
        <img
          src={menu.images}
          alt={menu.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 rounded-md"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Eye className="w-8 h-8 text-white animate-pulse" />
          <span className="text-white text-lg font-semibold">{translations[language].clickMenu}</span>
        </div>
      </div>

      <button onClick={toggleFavorite} className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
        <Heart className={`w-6 h-6 ${isFavorite ? "text-red-500 fill-red-500" : "text-red-500"}`} />
      </button>
      
      <div className="p-4">
        <h3 className="text-gray-600 font-semibold">{menu.name}</h3>
        <div className="flex items-center mt-2">{renderStars()}</div>
        <p className="text-gray-600 mt-1">Rating: {rating} / 5</p>
        <Link 
        to={`/menu/${menu.id}`} 
        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-900 to-gray-800 text-white px-6 py-2 rounded-md hover:opacity-80 transition-opacity mt-4">
          <ShoppingBag className="w-5 h-5" />
          {translations[language].viewDetails}
        </Link>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 transition-all duration-300" 
          onClick={() => setIsModalOpen(false)}
          >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative max-h-[80vh] overflow-y-auto transform scale-95 animate-scale-in" 
          onClick={(e) => e.stopPropagation()}
          >
          <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors" 
                  onClick={() => setIsModalOpen(false)}
                  >
              <X className="text-red-600 font-bold w-6 h-6 z-50" />
            </button>
            <img 
              src={menu.images} 
              alt={menu.name} 
              className="w-full h-48 object-cover rounded-md mb-4" 
            />
            <h3 className="text-lg font-bold text-gray-800">{menu.name}</h3>
            <div className="flex items-center mt-2">{renderStars()}</div>
            <p className="text-gray-600 mt-1">Rating: {rating} / 5</p>
            <p className="text-gray-600 mt-2">{menu.description}</p>
        
            {menu.variants?.length > 0 && (
              <div className="mt-4">
                <h4 className="text-gray-700 font-medium">{translations[language].selectVariant}:</h4>
                <div className="space-y-4">
                  {menu.variants.map((variant) => (
                    <div key={variant.id} className="flex items-center justify-between border p-4 rounded-md">
                      <div>
                        <p className="font-medium text-black">
                          {variant.size} - {formatPrice(variant.price)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {translations[language].selectStock}: {variant.stock}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedVariant(variant)}
                        className={`p-2 rounded-md ${
                          selectedVariant?.id === variant.id ? "bg-orange-900 text-white" : "bg-gradient-to-r from-orange-900 text-white"
                        }`}
                      >
                        Select
                      </button>
                    </div>
                  ))}
                </div>
                </div>
                )}
                <center>
                  <Link 
                    to={`/menu/${menu.id}`} 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-900 to-gray-800 text-white px-6 py-2 rounded-md hover:opacity-80 transition-opacity mt-4"
                  >
                  <ShoppingBag className="w-5 h-5" />
                  {translations[language].viewDetails}
                  </Link>
              </center>
          </div>
        </div>    
      )}
    </div>
  );
}