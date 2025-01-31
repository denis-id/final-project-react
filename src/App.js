import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { FilterProvider } from "./context/FilterContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Articles from "./pages/Articles";
import Cart from "./pages/Cart";
import { CartProvider } from "react-use-cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Layout from "./pages/Layout";
import PageWrapper from "./components/PageWrapper";
import ArticleDetail from "./pages/ArticleDetail";

function App() {
  return (
    <Router>
      <CartProvider>
        <FilterProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-grow">
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/articles/:id" element={<ArticleDetail />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
          </div>
        </FilterProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
