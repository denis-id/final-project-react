import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MapPin, CreditCard, ArrowLeft } from "lucide-react";
import { useCart } from "react-use-cart";
import Hero from "../components/Hero";
import { div } from "framer-motion/client";
import { formatPrice } from "../utils/helper";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, cartTotal } = useCart();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    country: "",
    postalCode: "",
    saveInfo: false,
  });

  const shipping = 10; // Fixed shipping cost
  const grandTotal = cartTotal + shipping;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle checkout logic here
    console.log("Checkout data:", formData);
  };

  if (items.length === 0) {
    return (
      <div>
        <div>
          {/** Complete props hero */}
          <Hero />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate("/products")}
            className="text-black hover:underline inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Hero
          title={"Checkout"}
          description={"Check out your cart"}
          image={
            "https://img.freepik.com/free-vector/self-checkout-concept-illustration_114360-2138.jpg?t=st=1738203576~exp=1738207176~hmac=1904ed8c92f08b1427140c971d16311dde8a7d33900e65e78058550a71ab2e14&w=1800"
          }
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <button
          onClick={() => navigate("/cart")}
          className="mb-8 text-gray-600 hover:text-black inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </button>

        {/** Checkout Form */}
      </div>
    </div>
  );
}
