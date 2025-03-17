import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrdersContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderData, setOrderData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    payment: "Credit Card",
    userId: null,
  });

  // Ambil user dan token dari localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.data?.token;
  console.log("user", user);
  console.log("token", token);

  useEffect(() => {
    if (!user) {
      toast.error("Anda harus login terlebih dahulu!", { toastId: "login-error" });
    } else if (!orderData.userId) {
      setOrderData((prev) => ({
        ...prev,
        userId: user.id,
      }));
      getOrderByUserId(user.id);  // Fetch orders when user is set
    }
  }, [user, orderData.userId]); 

  const handleInputChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  const getOrderByUserId = async (userId) => {
    if (!userId || !token) return;

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setOrders(response.data);
      } else {
        toast.error("Tidak ada data pesanan.");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Gagal mengambil pesanan!");
    }
  };

  const generatePayment = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders/${id}/pay`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const paymentData = response.data.data;
        if (paymentData) {
          window.open(paymentData, "_blank");
        }
      }
    } catch (err) {
      console.error("Error generating payment");
      toast.error("Terjadi kesalahan saat memproses pembayaran.");
    }
  };

  const createOrder = async (orderData) => {
    setIsProcessing(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders/`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Pesanan berhasil dibuat!");
        setOrderData({
          address: "",
          city: "",
          postalCode: "",
          country: "",
          payment: "Credit Card",
          userId: user.id,
        });
        await generatePayment(response.data.order.id);
      }
    } catch (err) {
      console.error("Error creating order:", err);
      toast.error("Terjadi Kesalahan saat membuat pesanan");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        orderData,
        handleInputChange,
        getOrderByUserId,
        createOrder,
        isProcessing,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrdersContext);
};
