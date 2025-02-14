import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrdersContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    payment: "Credit Card",
    userId: null,
  });

  const user = JSON.parse(localStorage.getItem("user"));
  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      userId: user.id,
      [e.target.name]: e.target.value,
    });
  };
  const getOrderByUserId = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/api/orders/${user.id}`);
      setOrders(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createOrder = async () => {
    try {
      const response =  await axios.post(
        `${process.env.API_URL}/api/orders`,
        JSON.stringify(formData),
      )
    } catch (err) {
      console.log(err);
      // Handle error
    }
  };

  return <OrdersContext.Provider value={{orders, formData, handleInputChange, getOrderByUserId, createOrder}}>{children}</OrdersContext.Provider>;
};
// make sure use
export const useOrderContext = () => {
  return useContext(OrdersContext);
};
