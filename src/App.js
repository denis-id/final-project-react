import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { FilterProvider } from "./context/FilterContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import { CartProvider } from "react-use-cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";

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
