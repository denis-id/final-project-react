import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Minus, ArrowLeft } from "lucide-react";
import { useCart } from "react-use-cart";
import { formatPrice } from "../utils/helper";
import Hero from "../components/Hero";
import ChatWhatsApp from "../components/ChatWhatsApp";
import BackToTop from "../components/BackToTop";
import { notification } from "antd";
import { useLanguage } from "../context/LanguageContext"; 
import { useMenuContext } from "../context/MenuContext";

export default function MenuDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, items, updateItemQuantity } = useCart();
  const { language, translations } = useLanguage(); 
const { menu, getMenuById } = useMenuContext();
  const [quantity, setQuantity] = useState(1);
  const t = translations[language]; // Extract translations for cleaner code

  // Memoized check for existing item in the cart
  const existingItem = useMemo(() => items.find((item) => item.id === menu?.id), [items, menu]);
  useEffect (() => {
    if (id) {
      getMenuById (id);
      }
    }, [id]);
  if (!menu) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">{t?.menuNotFound}</h2>
        <button
          onClick={() => navigate("/menu")}
          className="text-black hover:underline inline-flex items-center gap-2"
        >
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
      addItem({ ...menu, price: menu.price }, quantityNumber);
      notification.success({
        message: `Added ${menu.name} to cart`,
        description: `${menu.name} added to your cart.`,
        placement: "top",
        style: { zIndex: 999 },
      });
    }

    setQuantity(1);
  };


  return (
    <div className="bg-white">
      <ChatWhatsApp />
      <BackToTop />

      {menu.image && <Hero title={t?.coverMenuDetailTitle}description={t?.menuDetailDesc} image={menu.image} />}

      <div className="max-w-7xl mx-auto px-4 py-16">
        <button
          onClick={() => navigate("/menu")}
          className="mb-8 text-gray-600 hover:text-black inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4 text-black" />
          {t?.backToMenu}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Menu Image */}
          <div className="aspect-square overflow-hidden rounded-lg">
            <img src={menu.image} alt={menu.name} className="w-full h-full object-cover" />
          </div>

          {/* Menu Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{menu.name}</h1>
            <p className="text-2xl text-gray-800 mb-6">{formatPrice(menu.price)}</p>

            <div className="mb-6">
              <h2 className="font-semibold mb-2">{t?.menuDetailTitle}:</h2>
              <p className="text-gray-600">
                {menu.description || "No description available"}
              </p>
            </div>

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

            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-4 rounded-md hover:bg-gray-800 flex items-center justify-center gap-2"
            >
              🛒 {t?.addToCart}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
