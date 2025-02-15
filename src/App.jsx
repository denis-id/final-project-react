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

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading delay (e.g., fetching data)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set to false after 5 seconds to hide the loader
    }, 5000);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  return (
    <>
      {isLoading ? (
        <SPLoader />
      ) : (
        <Router>
          <LanguageProvider>
            <CartProvider>
              <ArticleProvider>
                <OrderProvider>
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
                            <Route path="/articles/:id" element={<ArticleDetail />} />
                            <Route path="/articleDetail/:id" element={<ArticleDetail />} />
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
                </OrderProvider>
              </ArticleProvider>
            </CartProvider>
          </LanguageProvider>
        </Router>
      )}
    </>
  );
}

export default App;
