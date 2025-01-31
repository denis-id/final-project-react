import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "react-use-cart";
import { formatPrice } from "../utils/helper";
import Hero from "../components/Hero";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, items, updateItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button
          onClick={() => navigate("/products")}
          className="text-black hover:underline inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Implement logic to add the product to the cart
  };

  return (
    <div>
      {/** Complete props hero */}
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <button
          onClick={() => navigate("/products")}
          className="mb-8 text-gray-600 hover:text-black inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl text-gray-800 mb-6">
              {formatPrice(product.price)}
            </p>

            <div className="mb-6">
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
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
                <span className="text-xl font-medium w-12 text-center">
                  {quantity}
                </span>
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
