import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FilterProvider } from "./context/FilterContext";
import { LanguageProvider } from "./context/LanguageContext";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import './styles/Button.css';
import MenuDetail from "./pages/MenuDetail";
import { CartProvider } from "react-use-cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Articles from "./pages/Articles";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ArticleDetail from "./pages/ArticleDetail";
import SPLoader from "./components/SpinnerLoader";
import { useState, useEffect } from "react";
import { ArticleProvider } from "./context/ArticleContext";
import { OrderProvider } from "./context/OrderContext";
import WelcomeAnnouncer from "./components/WelcomeAnnouncer";
import { MenuProvider } from "./context/MenuContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [showAnnouncer, setShowAnnouncer] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
      setShowAnnouncer(true);
    }, 5000);

    return () => clearTimeout(timer); 
  }, []);

  const handleContinue = () => setShowAnnouncer(false);

  return (
    <div>
       {isLoading ? (
        <SPLoader />
      ) : showAnnouncer ? (
        <WelcomeAnnouncer onContinue={handleContinue} />
      ) : (
        <Router>
          <AuthProvider>
          <LanguageProvider>
            <CartProvider>
              <ArticleProvider>
                <OrderProvider>
                  <MenuProvider>
                  <FilterProvider>
                    <div className="min-h-screen flex flex-col" style={{backgroundColor:'#EFE8D9'}}>
                      <main className="flex-grow">
                        <Routes>
                          <Route element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/menu" element={<Menu />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/articles" element={<Articles />} />
                            <Route path="/articles/:slug" element={<ArticleDetail />} />
                            <Route path="/articleDetail/:slug" element={<ArticleDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/menu/:id" element={<MenuDetail />} />
                          </Route>
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                        </Routes>
                      </main>
                    </div>
                  </FilterProvider>
                  </MenuProvider>
                </OrderProvider>
              </ArticleProvider>
            </CartProvider>
          </LanguageProvider>
          </AuthProvider>
        </Router>
      )}
    </div>
  );
}

export default App;
