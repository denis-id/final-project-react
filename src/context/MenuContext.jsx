import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const MenuContext = React.createContext();

export const MenuProvider = ({ children }) => {
  // Buat state yang diperlukan untuk menampung data fetching
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState ([]);
  const [menus, setMenus] = useState ([]);
  const [category, setCategory] = useState ([]);

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/api/product`);
      setMenus(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getMenuById = async (id) => {
    setLoading(true);
    try {
     const response = await axios.get(`${process.env.API_URL}/api/product/${id}`);
     setMenu(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  
  const getAllCategory = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/api/category`);
      setCategory(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <MenuContext.Provider value={{loading, menu, menus, getMenuById, category, getAllCategory}}>{children}</MenuContext.Provider>
  );
};
// make sure use
export const useMenuContext = () => {
  return useContext(MenuContext);
};
