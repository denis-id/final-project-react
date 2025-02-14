import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { MapPin, CreditCard, ArrowLeft } from "lucide-react";
import { useCart } from "react-use-cart";
import Hero from "../components/Hero";
// import { div } from "framer-motion/client";
import { formatPrice } from "../utils/helper";
import BackToTop from "../components/BackToTop";
import ChatWhatsApp from "../components/ChatWhatsApp";

export default function Checkout() {
  const { language, translations } = useLanguage();
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
      {/* Back to whatsApp */}
      <ChatWhatsApp />
       {/* Back to Top Button */}
       <BackToTop/>
        <div>
          <Hero
            title=""
            description=""
            image={
              "https://img.freepik.com/free-vector/self-checkout-concept-illustration_114360-2138.jpg?t=st=1738203576~exp=1738207176~hmac=1904ed8c92f08b1427140c971d16311dde8a7d33900e65e78058550a71ab2e14&w=1800"
            }
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-700">{translations[language]?.emptyCart}</h2>
          <p className="text-xl mb-4">{translations[language]?.emptyCartDesc}</p>
          <br />
          <button
            onClick={() => navigate("/menu")}
            className="text-black hover:underline inline-flex items-center gap-2 font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            {translations[language]?.continueShop}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        {/* Back to whatsApp */}
        <ChatWhatsApp />
       {/* Back to Top Button */}
       <BackToTop />
        <Hero
          title={translations[language]?.cekCart}
          description={translations[language]?.cekCartDesc}
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
          {translations[language]?.backToCart}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {translations[language]?.shippingInfo}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    {translations[language]?.firstName}:
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    {translations[language]?.lastName}:
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    {translations[language]?.checkoutEmail}:
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    {translations[language]?.checkoutPhone}:
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                  {translations[language]?.checkoutAddress}:
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                  {translations[language]?.checkoutAddressDetail}:
                  </label>
                  {translations[language]?.addressDetails}
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    {translations[language]?.checkoutAddressCity}:
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    {translations[language]?.checkoutAddressPostalCode}:
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                  {translations[language]?.checkoutAddressCountry}:
                  </label>
                  <select
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  >
                    <option value="">{translations[language]?.checkoutSelectCountry}:</option>
                    <option value="US">Japan</option>
                    <option value="CA">Indonesia</option>
                    <option value="GB">Singapore</option>
                    <option value="AU">Malaysia</option>
                    {/* Add more countries as needed */}
                  </select>
                </div>

                <div className="mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleChange}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                    {translations[language]?.saveInfo}
                    </span>
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:pl-12">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">{translations[language]?.orderSummary}</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">{formatPrice(item.price)}</p>
                    </div>
                    <div className="text-right">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-6 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{translations[language]?.subTotal}</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{translations[language]?.shipping}</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="w-full bg-black text-white py-4 rounded-lg mt-6 hover:bg-gray-800 flex items-center justify-center gap-2"
              >
                {translations[language]?.placeOrder}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}