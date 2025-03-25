import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "react-use-cart";
import kohiMenu from "../assets/images/kohiMenu.png";
import { useLanguage } from "../context/LanguageContext";
import { Modal } from "antd";
import { useAuth } from "../context/AuthContext"; 

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { items } = useCart();
  const { language, translations, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth(); 

  const totalItems = items?.reduce((sum, item) => sum + item.quantity, 0);

  const confirmLogout = () => {
    Modal.confirm({
      title: "Logout Confirmation",
      content: "Are you sure you want to logout?",
      okText: "Yes, Logout",
      cancelText: "Cancel",
      okType: "danger",
      onOk() {
        logout(); 
      },
    });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "home" },
    { path: "/menu", label: "navbarMenu" },
    { path: "/contact", label: "contact" },
    { path: "/articles", label: "navbarArticles" },
    { path: "/orders", label: "orders" },
  ];

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
              alt="Kohi Coffee Logo"
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
              {navLinks.map(({ path, label }) => (
                <Link
                  key={label}
                  to={path}
                  className={`hover:opacity-75 transition-colors ${
                    isScrolled ? "text-black" : "text-white"
                  }`}
                >
                  {translations[language]?.[label] || label}
                </Link>
              ))}

              {/* Tampilkan Login atau Logout */}
              {user ? (
                <button
                  onClick={confirmLogout}
                  className={`hover:opacity-75 transition-colors ${
                    isScrolled ? "text-black hover:text-red-700" : "text-white hover:text-red-300"
                  }`}
                >
                  𝙇𝙤𝙜𝙤𝙪𝙩
                </button>
              ) : (
                <Link
                  to="/login"
                  className={`hover:opacity-75 transition-colors ${
                    isScrolled ? "text-black" : "text-white"
                  }`}
                >
                  𝑳𝒐𝒈𝒊𝒏
                </Link>
              )}

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
            </div>

            {/* Desktop Language Toggle Button */}
             <div className="hidden md:block">
            <button onClick={toggleLanguage} type="button" class="btn">
            <strong>{translations[language]?.toggleLanguage}</strong>
              <div id="container-stars">
                <div id="stars"></div>
              </div>

              <div id="glow">
                <div class="circle"></div>
                <div class="circle"></div>
              </div>
            </button>
            </div>
            
            <div className="flex items-center space-x-4 md:hidden">
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

            {/* Mobile Menu Button */}
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
                {navLinks.map(({ path, label }) => (
                  <Link key={label} to={path} className="text-black hover:opacity-75">
                    {translations[language]?.[label] || label}
                  </Link>
                ))}              

                {/* Tampilkan Login atau Logout di Mobile */}
                {user ? (
                  <button
                  onClick={confirmLogout}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    𝙇𝙤𝙜𝙤𝙪𝙩
                  </button>
                ) : (
                  <Link to="/login" className="text-black hover:opacity-75">
                     𝑳𝒐𝒈𝒊𝒏
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Sticky Language Button in Center */}
      <div className="md:hidden fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50">
       <button onClick={toggleLanguage} type="button" class="btn">
            <strong>{translations[language]?.toggleLanguage}</strong>
              <div id="container-stars">
                <div id="stars"></div>
              </div>

              <div id="glow">
                <div class="circle"></div>
                <div class="circle"></div>
              </div>
            </button>
        </div>
    </>
  );
}
