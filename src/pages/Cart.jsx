import { Link, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";

import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "react-use-cart";
import { formatPrice } from "../utils/helper";

export default function Cart() {
  const { cartTotal, items, updateItemQuantity, removeItem, emptyCart } =
    useCart();
  const navigate = useNavigate();
  if (items.length === 0) {
    return (
      <div>
        <Hero
          title={"Shopping Cart"}
          description={"Check out your cart"}
          image={"/cart.png"}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="flex items-center justify-center">
            <img src="/empty_cart.png" alt="" width={400} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-black text-white py-3 rounded-md mt-6 hover:bg-gray-800"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Hero
        title={"Shopping Cart"}
        description={"Check out your cart"}
        image={"/cart.png"}
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b py-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{formatPrice(item.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateItemQuantity(
                        item.id,
                        Math.max(0, item.quantity - 1)
                      )
                    }
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity + 1)
                    }
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-black text-white py-3 rounded-md mt-6 hover:bg-gray-800"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
