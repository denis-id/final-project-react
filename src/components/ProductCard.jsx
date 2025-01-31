import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { formatPrice } from "../utils/helper";

export default function ProductCard({ product, viewMode = "grid" }) {
  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex">
          <div className="w-48 h-48 relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{formatPrice(product.price)}</p>
              <p className="text-gray-500">{product.description}</p>
            </div>
            <Link
              to={`/products/${product.id}`}
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors w-fit"
            >
              <Eye className="w-4 h-4" />
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <Link
            to={`/products/${product.id}`}
            className="bg-white text-black px-6 py-2 rounded-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Details
          </Link>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 mt-1">{formatPrice(product.price)}</p>
        <p className="text-sm text-gray-500 mt-2">{product.description}</p>
      </div>
    </div>
  );
}
