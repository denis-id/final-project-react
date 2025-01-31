import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "react-use-cart";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className={`text-xl font-bold transition-colors ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              LOGO
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`hover:opacity-75 transition-colors ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`hover:opacity-75 transition-colors ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              Products
            </Link>
            <Link
              to="/about"
              className={`hover:opacity-75 transition-colors ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`hover:opacity-75 transition-colors ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              Contact
            </Link>
            <Link
              to="/articles"
              className={`hover:opacity-75 transition-colors ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              Articles
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart
                className={`w-6 h-6 transition-colors ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              to="/login"
              className={`hover:opacity-75 transition-colors ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
             <>Login</>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={isScrolled ? "text-black" : "text-white"}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-black hover:opacity-75">
                Home
              </Link>
              <Link to="/products" className="text-black hover:opacity-75">
                Products
              </Link>
              <Link to="/about" className="text-black hover:opacity-75">
                About
              </Link>
              <Link to="/contact" className="text-black hover:opacity-75">
                Contact
              </Link>
              <Link to="/articles" className="text-black hover:opacity-75">
                Articles
              </Link>
              <Link
                to="/cart"
                className="flex items-center text-black hover:opacity-75"
              >
                <ShoppingCart className="w-6 h-6 mr-2" />
                <span>Cart ({totalItems})</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
