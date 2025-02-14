import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { menu } from "../data/menu";
import { Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "react-use-cart";
import { formatPrice } from "../utils/helper";
import Hero from "../components/Hero";
import ChatWhatsApp from "../components/ChatWhatsApp";
import BackToTop from "../components/BackToTop";
import { notification } from "antd";

export default function MenuDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, items, updateItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Find the menu item based on the id from the URL params
  const menuItem = menu.find((p) => p.id === parseInt(id));

  // If the menu item is not found, display a 404 page
  if (!menuItem) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Menu not found</h2>
        <button
          onClick={() => navigate("/menu")}
          className="text-black hover:underline inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to menu
        </button>
      </div>
    );
  }

  // Handle adding or updating the item in the cart
  const handleAddToCart = () => {
    const quantityNumber = Number(quantity);
    const existingItem = items.find((item) => item.id === menuItem.id);

    if (existingItem) {
      // Update the quantity of the existing item in the cart
      updateItemQuantity(menuItem.id, existingItem.quantity + quantityNumber);
      notification.success({
        message: `Updated ${menuItem.name} in cart`,
        description: `${menuItem.name} quantity updated in your cart.`,
        placement: "top",
      });
      
    } else {
      // Add a new item to the cart
      addItem({ ...menuItem, price: menuItem.price }, quantityNumber);
      notification.success({
        message: `Added ${menuItem.name} to cart`,
        description: `${menuItem.name} added to your cart.`,
        placement: "top",
        style: {
          zIndex:999,
        }
      });
    }

    // Reset the quantity after adding to cart
    setQuantity(1);
  };

  return (
    <div>
      {/* Back to WhatsApp chat */}
      <ChatWhatsApp />
      {/* Back to Top Button */}
      <BackToTop />

      <Hero
        title="Menu Detail"
        description="Check out our latest menu"
        image={menuItem.image}
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <button
          onClick={() => navigate("/menu")}
          className="mb-8 text-gray-600 hover:text-black inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to menu
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Menu Image */}
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={menuItem.image}
              alt={menuItem.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Menu Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{menuItem.name}</h1>
            <p className="text-2xl text-gray-800 mb-6">{formatPrice(menuItem.price)}</p>

            <div className="mb-6">
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{menuItem.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="font-semibold mb-4">Quantity</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-xl font-medium w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-4 rounded-md hover:bg-gray-800 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
