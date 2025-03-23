import axios from "axios";
import React, { useContext, useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./AuthContext";

const OrdersContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderData, setOrderData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    payment: "Credit Card",
    userId: null,
  });

  const {recentUser}= useAuth();
  const user = useMemo(() => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
}, []);

  const token = recentUser?.token || user?.data?.token;

  useEffect(() => {
    if (!user) {
      toast.error("Anda harus login terlebih dahulu!", { toastId: "login-error" });
      return;
    }

    if (!orderData.userId && user?.id) {
      setOrderData((prev) => ({ ...prev, userId: user.id }));
    }

    if (user?.id) {
      getOrders();
    }
  }, [user?.id]);

  const handleInputChange = (e) => {
    setOrderData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getOrders = async () => {
    if (!user?.id || !token) return;

     setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setOrders(response.data.data);
      } else {
        toast.error("Tidak ada data pesanan.");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Gagal mengambil pesanan!");
    } finally {
      setLoading(false);
    }
  };

  const payOrder = async (id) => {
    if (!token) return;

    try {
      const newTab = window.open("", "_blank");
      if (!newTab) {
        toast.error("Pop-up pembayaran diblokir oleh browser.");
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders/${id}/pay`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data?.data) {
        newTab.location.href = response.data.data;
      } else {
        newTab.close();
        toast.error("Terjadi kesalahan saat memproses pembayaran.");
      }
    } catch (err) {
      console.error("Error generating payment:", err);
      toast.error("Terjadi kesalahan saat memproses pembayaran.");
    }
  };

  const createOrder = async (orderData) => {
    orderData.products_name = orderData.products_name || "Produk tidak tersedia";
    setIsProcessing(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders`,
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response || !response.data || !response.data.order) {
        throw new Error("Respon tidak valid dari server.");
      }

      const orderId = response.data.order.id;
      toast.success("Pesanan berhasil dibuat!");

      setOrderData((prev) => ({
        ...prev,
        address: "",
        city: "",
        postalCode: "",
        country: "",
        payment: "Credit Card",
      }));

      await payOrder(orderId);
     

      return response;
    } catch (err) {
      console.error("Error creating order:", err);
      toast.error(err.response?.data?.message || "Terjadi kesalahan saat membuat pesanan");
      throw err;
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
        getOrders,
        createOrder,
        isProcessing,
        payOrder,
        loading,     
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrdersContext);
