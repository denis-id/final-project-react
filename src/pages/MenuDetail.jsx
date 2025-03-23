import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Minus, ArrowLeft, PlusCircle } from "lucide-react";
import { useCart } from "react-use-cart";
import { motion } from "framer-motion";
import { formatPrice } from "../utils/helper";
import Hero from "../components/Hero";
import ChatWhatsApp from "../components/ChatWhatsApp";
import BackToTop from "../components/BackToTop";
import { notification } from "antd"; 
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
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const t = translations[language]; 

  const subtotal = (selectedVariant?.price || menu?.price) * quantity;

  const existingItem = useMemo(() => items.find((item) => item.id === menu?.id), [items, menu]);

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user"); 
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
        <motion.img 
          src="https://i.pinimg.com/originals/86/3b/8c/863b8c5d34a34a718db8333507b49ee5.gif"
          alt="Loading..."        
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-full h-full object-cover" 
        />
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
    if (!selectedVariant) {
      notification.warning({
        message: "Please select a variant",
        placement: "top",
      });
      return;
    }

    const quantityNumber = Number(quantity);
    const existingItem = items.find((item) => item.id === menu.id && item.variant_id === selectedVariant.id);

    if (existingItem) {
      updateItemQuantity(existingItem.id, existingItem.quantity + quantityNumber);
      notification.success({
        message: `Updated ${menu.name} (${selectedVariant.size}) in cart`,
        description: `Quantity updated to ${existingItem.quantity + quantityNumber}.`,
        placement: "top",
      });
    } else {
      addItem({ 
        ...menu, 
        id: `${menu.id}-${selectedVariant.id}`,
        variant_id: selectedVariant.id,
        price: selectedVariant.price,
        variant_name: selectedVariant.size,
        variants: menu.variants,
      }, 
      quantityNumber
    );
     notification.success({
                    message: `Added ${menu.name} (${selectedVariant.size}) to cart`,
                    description: (
                      <span>
                        {menu.name} ({selectedVariant?.size}) added to your cart.{" "}
                        <a
                          href="/cart"
                          style={{
                            color: "#1890ff",
                            fontWeight: "bold",
                            textDecoration: "underline",
                          }}
                          onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                          onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                        >
                          Proceed your order here
                        </a>
                      </span>
                    ),
                    placement: "top",
                    duration: 4,
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
              href="/login"
              style={{
                color: "#1890ff",
                fontWeight: "bold",
                textDecoration: "underline", 
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} 
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'} 
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
    <div className="bg-#FBF3CB backdrop-blur-md shadow-xl">
      <ChatWhatsApp />
      <BackToTop />

      {menu.images && <Hero title={t?.coverMenuDetailTitle} description={t?.menuDetailDesc} images={menu.images} />}

      <div className="max-w-7xl mx-auto px-4 py-16">
        <button 
          onClick={() => navigate("/menu")} 
          className="mb-8 text-gray-600 hover:text-black inline-flex items-center gap-2 transition-all duration-300 hover:translate-x-1"
        >
          <ArrowLeft className="w-5 h-5 text-black" />
          {t?.backToMenu}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            className="aspect-square overflow-hidden rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            >
            <img src={menu.images} alt={menu.name} className="w-full h-full object-cover" />
          </motion.div>

          <div>
            <motion.h1 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            >
              {menu.name}
            </motion.h1>
            
            <div className="mb-6">
              <h2 className="font-semibold mb-2">Subtotal:</h2>
              <p className="text-gray-800 text-xl">{formatPrice(subtotal)}</p>
            </div>

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
                          selectedVariant?.id === variant.id ? "bg-orange-900 text-white" : "bg-gradient-to-r from-orange-900 text-black hover:scale-110"
                        }`}
                      >
                        Select
                      </button>
                    </div>
                  ))}
                </div>
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
                onClick={handleAddToCartWithAuthCheck}
                  className={`w-full bg-gradient-to-r from-orange-900 to-gray-800 text-white py-4 rounded-md hover:opacity-80 mt-4 flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-lg shadow-lg hover:scale-110 ${
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
                <span>{translations[language].addToCart}</span>
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