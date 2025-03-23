import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { useLanguage } from "../context/LanguageContext";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "react-use-cart";
import { formatPrice } from "../utils/helper";
import BackToTop from "../components/BackToTop";
import ChatWhatsApp from "../components/ChatWhatsApp";

export default function Cart() {
  const { language, translations } = useLanguage();
  const { cartTotal, items, updateItemQuantity, removeItem, emptyCart } = useCart();
  const navigate = useNavigate();

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = items.reduce((acc, item) => {
    const itemSubtotal = item.variant_id
      ? (item.variants?.find((v) => v.id === item.variant_id)?.price || item.price) * item.quantity
      : item.price * item.quantity;

    return acc + itemSubtotal;
  }, 0);

  if (items.length === 0) {
    return (
      <div>
        <ChatWhatsApp />
        <BackToTop />
        <Hero
          title={translations[language]?.shopCart}
          description={translations[language]?.checkCart}
          image={"/cart.png"}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="flex items-center justify-center">
            <img src="/empty_cart.png" alt="Empty Cart" width={400} />
          </div>
          <h2 className="text-2xl font-bold mb-4">
            {translations[language]?.emptyCart}
          </h2>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-black text-white py-3 rounded-md mt-6 hover:bg-gray-800"
          >
            {translations[language]?.proceedCart}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ChatWhatsApp />
      <BackToTop />
      <Hero
        title={translations[language]?.shopCart}
        description={translations[language]?.checkCart}
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {translations[language]?.goCart}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
          <div className="md:col-span-2 bg-white shadow-md rounded-lg p-4 md:p-6">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row items-center gap-4 md:gap-6 border-b py-4">
                {/* Gambar Produk */}
                <img
                  src={item.images}
                  alt={item.name}
                  className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-lg shadow"
                />
                {/* Info Produk */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-semibold text-lg">{item.name}</h3>

                  {/* Tampilkan Hanya Varian yang Dipesan */}
                  {item.variant_id && (
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <div className="bg-gray-100 p-2 rounded-md flex flex-col">
                        <span className="block font-medium">
                          {translations[language]?.selectSize}: {item.variant_name}
                        </span>
                        <span className="text-xs text-gray-500">
                          Price: {formatPrice(item.price)}
                        </span>
                        {/* Tombol Update Quantity */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateItemQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-5 h-5" />
                          </button>
                          <span className="w-10 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateItemQuantity(item.id, item.quantity + 1)
                            }
                            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* Tombol Hapus */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-red-500 hover:bg-red-100 rounded-full transition"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h3 className="text-xl font-semibold mb-4">
              {translations[language]?.orderSummary || "Order Summary"}
            </h3>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} {item.variant_name ? `(${item.variant_name})` : ""} x {item.quantity}
                  </span>
                  <span>
                    {formatPrice(
                      (item.variants?.find((v) => v.id === item.variant_id)?.price || item.price) *
                        item.quantity
                    )}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>{translations[language]?.totalItems || "Total Items"}:</span>
                <span>{totalQuantity}</span>
              </div>
              <div className="flex justify-between font-semibold mt-2">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-black text-white py-3 rounded-md mt-6 hover:bg-gray-800"
            >
              {translations[language]?.proceedCart || "Proceed to Checkout"}
            </button>

            {/* Empty Cart Button */}
            <button
              onClick={emptyCart}
              className="w-full bg-red-500 text-white py-3 rounded-md mt-4 hover:bg-red-600 flex items-center justify-center"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              {translations[language]?.emptyCartOrder || "Empty Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}