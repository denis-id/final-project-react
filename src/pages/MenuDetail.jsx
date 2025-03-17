import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Minus, ArrowLeft } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { useCart } from "react-use-cart";
import { motion } from "framer-motion";
import { formatPrice } from "../utils/helper";
import Hero from "../components/Hero";
import ChatWhatsApp from "../components/ChatWhatsApp";
import BackToTop from "../components/BackToTop";
import { notification } from "antd"; // Importing notification from antd
import { useLanguage } from "../context/LanguageContext"; 
import { useMenuContext } from "../context/MenuContext";
import loader from "../assets/images/loader.gif";

export default function MenuDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, items, updateItemQuantity } = useCart();
  const { language, translations } = useLanguage(); 
  const { menu, getMenuById } = useMenuContext();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  console.log("selectedVariant", selectedVariant);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const t = translations[language]; 

  const existingItem = useMemo(() => items.find((item) => item.id === menu?.id), [items, menu]);

  // Simulate checking if user is authenticated (you can replace this with your actual auth check)
  useEffect(() => {
    const checkAuth = () => {
      // Replace this logic with your actual authentication check
      const user = localStorage.getItem("user"); // For example, checking localStorage for user data
      setIsAuthenticated(user !== null);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getMenuById(id).finally(() => setIsLoading(false));
    }
  }, [id]);

  useEffect(() => {
    if (menu?.variants?.length > 0) {
      setSelectedVariant(menu.variants[0]);
    }
  }, [menu?.variants]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen overflow-hidden bg-[#F9F1C9]">
        <img src={loader} alt="Loading..." className="w-full h-full object-cover" />
      </div>
    );
  }

  if (!menu) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">{t?.menuNotFound}</h2>
        <button onClick={() => navigate("/menu")} className="text-black hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          {t?.backToMenu}
        </button>
      </div>
    );
  }

  // Handle adding or updating the item in the cart
  const handleAddToCart = () => {
    const quantityNumber = Number(quantity);

    if (existingItem) {
      updateItemQuantity(menu.id, existingItem.quantity + quantityNumber);
      notification.success({
        message: `Updated ${menu.name} in cart`,
        description: `${menu.name} quantity updated.`,
        placement: "top",
      });
    } else {
      addItem({ ...menu, price: menu.price, variant_id: selectedVariant.id }, quantityNumber);
      notification.success({
        message: `Added ${menu.name} to cart`,
        description: `${menu.name} added to your cart.`,
        placement: "top",
        style: { zIndex: 999 },
      });
    }

    setQuantity(1);
  };

  const handleAddToCartWithAuthCheck = () => {
    if (!isAuthenticated) {
      notification.warning({
        message: "You need to login first before order",
        description: (
          <>
            Please login to add items to your cart. <br />
            <a
              href="/login" // Link to the login page
              style={{
                color: "#1890ff",
                fontWeight: "bold",
                textDecoration: "underline", // Add underline
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} // Add hover effect
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'} // Remove hover effect
            >
              Login Here
            </a>
          </>
        ),
        placement: "top",
        style: { zIndex: 999 },
      });
      return;
    }

    handleAddToCart();
  };

  return (
    <div className="bg-white">
      <ChatWhatsApp />
      <BackToTop />

      {menu.images && <Hero title={t?.coverMenuDetailTitle} description={t?.menuDetailDesc} images={menu.images} />}

      <div className="max-w-7xl mx-auto px-4 py-16">
        <button onClick={() => navigate("/menu")} className="mb-8 text-gray-600 hover:text-black inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4 text-black" />
          {t?.backToMenu}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img src={menu.images} alt={menu.name} className="w-full h-full object-cover" />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{menu.name}</h1>
            <p className="text-2xl text-gray-800 mb-6">{formatPrice(selectedVariant?.price || menu.price)}</p>

            {/* Menu Description */}
            <div className="mb-6">
              <h2 className="font-semibold mb-2">{t?.menuDetailTitle}:</h2>
              <p className="text-gray-600">
                {menu.description || "No description available"}
              </p>
            </div>

            {/* Variant Selection */}
            {menu.variants?.length > 0 && (
              <div className="mb-6">
                <h2 className="font-semibold mb-2"> {translations[language].selectVariant}:</h2>
                <select className="w-full p-2 border rounded-md" value={selectedVariant?.id || ""} onChange={(e) => setSelectedVariant(menu.variants.find(v => v.id == e.target.value))}>
                  {menu.variants.map((variant) => (
                    <option key={variant.id} 
                value={variant.id} 
                style={{ color: "black" }}
                >
               {translations[language].selectSize}:{" "}
               <span 
               style={{ color: "blue" }}
               >
                {variant.size}
                </span> -{" "}
               {translations[language].selectStock}:{" "}
               <span style={{ color: "blue" }}
               >
                {variant.stock}
                </span>
             </option>                  
            ))}
                </select>
              </div>
            )}

            {/* Quantity Selection */}
            <div className="mb-8">
              <h2 className="font-semibold mb-4">{t?.menuDetailQuantity}:</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-xl font-medium w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex flex-col items-center">
              <motion.button
                onClick={handleAddToCartWithAuthCheck} // Use the new function to check authentication
                className={`w-full bg-black text-white py-4 rounded-md flex items-center justify-center gap-2 transition-all ${
                  selectedVariant && quantity > selectedVariant.stock
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-800"
                }`}
                disabled={selectedVariant && quantity > selectedVariant.stock}
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: selectedVariant && quantity > selectedVariant.stock ? 0.5 : 1,
                  scale: selectedVariant && quantity > selectedVariant.stock ? 0.95 : 1,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                whileTap={{ scale: 0.9 }}
              >
                <PlusCircle className="w-5 h-5" />
                <span>
                  {translations[language].addToCart}
                </span>
              </motion.button>
            </div>

            {/* Animasi pesan error jika stok habis */}
            {errorMessage && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-red-500 text-sm mt-2"
              >
                {errorMessage}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
