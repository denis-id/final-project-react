import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  // Buat state yang diperlukan untuk menampung data fetching
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      // Fetch data products
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async () => {
    setLoading(true);
    try {
      // Fetch data product by ID
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getAllCategory = async () => {
    try {
      // Fetch data category
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{}}>{children}</ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
