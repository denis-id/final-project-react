import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "react-use-cart";
import kohiMenu from "../assets/images/kohiMenu.png";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { items } = useCart();
  const { language, translations, toggleLanguage } = useLanguage();

  const totalItems = items?.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "backdrop-blur-xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <img
              src={kohiMenu}
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex items-center">
              <Link to="/">
                <span
                  className={`h-8 transition-colors ml-2 text-xl font-bold ${
                    isScrolled ? "text-black" : "text-white"
                  }`}
                >
                  𝕂𝕠𝕙𝕚 ℂ𝕠𝕗𝕗𝕖é 幸
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`hover:opacity-75 transition-colors ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              >
                {translations[language]?.home}
              </Link>
              <Link
                to="/menu"
                className={`hover:opacity-75 transition-colors ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              >
                {translations[language]?.navbarMenu}
              </Link>
              <Link
                to="/contact"
                className={`hover:opacity-75 transition-colors ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              >
                {translations[language]?.contact}
              </Link>
              <Link
                to="/articles"
                className={`hover:opacity-75 transition-colors ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              >
                {translations[language]?.navbarArticles}
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
                {translations[language]?.login}
              </Link>
            </div>

            {/* Desktop Language Toggle Button */}
            <div className="hidden md:block">
              <button onClick={toggleLanguage} className="button">
                {translations[language]?.toggleLanguage}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={isScrolled ? "text-black" : "text-white"}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-4">
                {["home", "navbarMenu", "contact", "navbarArticles", "login"].map((label) => (
                  <Link key={label} to={`/${label}`} className="text-black hover:opacity-75">
                    {translations[language]?.[label] || label}
                  </Link>
                ))}
                <Link to="/cart" className="flex items-center text-black hover:opacity-75">
                  <ShoppingCart className="w-6 h-6 mr-2" />
                  <span>
                    {translations[language]?.cart || "Cart"} ({totalItems})
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Sticky Language Button in Center */}
      <div className="md:hidden fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={toggleLanguage}
          className="button"
        >
          {translations[language]?.toggleLanguage || "Change Language"}
        </button>
      </div>
    </>
  )}
