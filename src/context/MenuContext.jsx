import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const MenuContext = React.createContext();

export const MenuProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState ([]);
  const [menus, setMenus] = useState ([]);
  const [category, setCategory] = useState ([]);

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
      setMenus(response.data);
      setLoading(false);
      console.log('Data', response.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
    console.log('Menus');
  };

  const getMenuById = async (id) => {
    setLoading(true);
    try {
     const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
     setMenu(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  
  const getAllCategory = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
      setCategory(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMenu();
    getAllCategory();
  }, []);
console.log('Menu',category);
  return (
    <MenuContext.Provider 
      value={{
        loading, 
        menu, 
        menus, 
        getMenuById, 
        category, 
        getAllCategory
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
// make sure use
export const useMenuContext = () => {
  return useContext(MenuContext);
};
