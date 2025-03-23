import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Hero from "../components/Hero";
import ChatWhatsApp from "../components/ChatWhatsApp";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { FaEye, FaFilePdf, FaTrash } from "react-icons/fa";
import jsPDF from "jspdf";
import NoImageAnimation from "../assets/images/no-orders-found.gif";
import autoTable from "jspdf-autotable";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { recentUser } = useAuth();
  const navigate = useNavigate();

  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  const handleDelete = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrder(orderId);
      }
    });
  };
  
  const generatePDF = () => {
    const doc = new jsPDF();
  doc.text("Order List Report", 14, 10);
  
    doc.text("Order List Report", 14, 10);
  
    const tableColumn = ["#", "Customer", "Total", "Products", "Status"];
    const tableRows = [];
  
    orders.forEach((order, index) => {
      const orderData = [
        index + 1,
        `${order.first_name} ${order.last_name}`,
        `Rp ${(order.price || 0).toFixed(2)}`,
        order.products_name,
        order.status,
      ];
      tableRows.push(orderData);
    });
  
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
  
    doc.save("order_list.pdf");
  };
  
  const deleteOrder = async (orderId) => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    const token = parsedUser?.data?.token || recentUser?.token;
  
    if (!token) {
      console.error("Token tidak ditemukan! User harus login.");
      return;
    }
  
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId));
      Swal.fire({
        title: "Deleted!",
        text: "Order has been deleted successfully.",
        icon: "success",
        timer: 2000, 
        showConfirmButton: false
      });
    } catch (error) {
      console.error("Error deleting order:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the order.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  const getOrders = useCallback(async () => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    const token = parsedUser?.data?.token || recentUser?.token;

    if (!token) {
      console.error("Token tidak ditemukan! User harus login.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOrders(response.data.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [navigate, recentUser]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const getOrderById = async (orderId) => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    const token = parsedUser?.data?.token || recentUser?.token;

    if (!token) {
      console.error("Token tidak ditemukan! User harus login.");
      return;
    }

    setIsProcessing(orderId);
    setLoadingDetail(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setSelectedOrder(response.data.order);
    } catch (error) {
      console.error("Error fetching order details:", error);
      setSelectedOrder(null);
    } finally {
      setLoadingDetail(false);
      setIsProcessing(null);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const customerName = `${order.first_name || ""} ${order.last_name || ""}`.toLowerCase();
    const products = order.products_name ? order.products_name.toLowerCase() : "";

    return (
      customerName.includes(searchTerm.toLowerCase()) ||
      products.includes(searchTerm.toLowerCase())
    );
  });

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.replace(regex, `<span class="bg-yellow-200 px-1">${highlight}</span>`);
  };
  
  const { language, translations } = useLanguage();

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
  
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
  
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  };

  return (
    <div className="bg-white">
    <Hero title="Orders" description="" />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 mt-6 bg-white rounded-lg shadow-2xl">
      <div class="px-5 py-4 sm:px-6 sm:py-5 bg-gradient-to-r from-black to-red-800 rounded-t-2xl flex justify-center items-center">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-center bg-gradient-to-r from-white to-red-600 text-transparent bg-clip-text animate-pulse">
            {translations[language]?.orderListTitle}
        </h2>
      </div>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder={translations[language]?.placeHolderOrderList}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 000 8 4 4 0 000-8zM2 8a6 6 0 1110.32 4.906l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Tampilan Mobile */}
        <div className="md:hidden">
          {loading ? (
            Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="animate-pulse bg-gray-200 p-4 rounded-lg mb-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
                variants={tableRowVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-sm text-gray-700">
                  <p><span className="font-semibold">Customer:</span> <span dangerouslySetInnerHTML={{ __html: highlightText(`${order.first_name || ""} ${order.last_name || ""}`, searchTerm) }} /></p>
                  <p><span className="font-semibold">Total:</span> Rp {(order.price || 0).toFixed(2)}</p>
                  <p><span className="font-semibold">Produk:</span> <span dangerouslySetInnerHTML={{ __html: highlightText(order.products_name || "N/A", searchTerm) }} /></p>
                  <p><span className="font-semibold">Status:</span> 
                    <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-lg 
                      ${order.status === "Pending" ? "bg-orange-100 text-orange-700" : 
                        order.status === "Paid" ? "bg-green-100 text-green-700" : 
                        "bg-green-100 text-green-700"}`}>
                      {order.status || "Pending"}
                    </span>
                  </p>
                  <p><span className="font-semibold">Invoice:</span> 
                  {order.status === "Pending" && order.url ? (
                    <a 
                      href={order.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block px-3 py-1 bg-yellow-500 text-white font-semibold rounded-md shadow-md hover:bg-yellow-600 transition"
                    >
                      Bayar Sekarang
                    </a>
                  ) : order.url ? (
                    <a 
                      href={order.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-500 underline"
                    >
                      {translations[language]?.orderListviewInvoice}
                    </a>
                  ) : (
                    "Pending"
                  )}
                </p>
                <div className="flex flex-col gap-2 mt-2">
                  <button
                    onClick={() => getOrderById(order.id)}
                    className={`w-full mt-2 px-3 py-1 rounded text-white ${
                      isProcessing === order.id ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={isProcessing === order.id}
                  >
                    {isProcessing === order.id ? "Processing..." : "View Details"}
                  </button>

                  <div className="flex gap-2">
              {/* Tombol PDF */}
              <motion.button
                onClick={generatePDF}
                className={`w-full px-3 py-2 bg-red-900 text-white rounded-lg hover:bg-black transition ${
                  isProcessing === order.id ? "cursor-not-allowed" : ""
                }`}
                disabled={isProcessing === order.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download PDF 
              </motion.button>

              {/* Tombol Delete */}
              <motion.button
                onClick={() => handleDelete(order.id)}
                className={`w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition ${
                  isProcessing === order.id ? "cursor-not-allowed" : ""
                }`}
                disabled={isProcessing === order.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {translations[language]?.orderListDelete}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
            ))
          ) : (
            <div className="text-center p-4"> 
              <img src={NoImageAnimation} alt="No Orders Found" className="w-40 mx-auto" />
            <p>{translations[language]?.orderListNoOrdersFound}</p>
              <span>
                {translations[language]?.orderListGetYourOrders} {" "}
                <a href="/menu" className="text-blue-500 underline">
                {translations[language]?.orderListNoOrdersFoundHere}
                </a>
              </span>
            </div>
          )}
        </div>

        {/* Tampilan Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">#</th>
                <th className="border p-2">{translations[language]?.orderListCustomer}</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">{translations[language]?.orderListProducts}</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Invoice</th>
                <th className="border p-2">{translations[language]?.orderListDetails}</th>
                <th className="border p-2">{translations[language]?.orderListDelete}</th>
                <th className="border p-2">PDF</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="border p-2 bg-gray-200">&nbsp;</td>
                      <td className="border p-2 bg-gray-200">&nbsp;</td>
                      <td className="border p-2 bg-gray-200">&nbsp;</td>
                      <td className="border p-2 bg-gray-200">&nbsp;</td>
                      <td className="border p-2 bg-gray-200">&nbsp;</td>
                      <td className="border p-2 bg-gray-200">&nbsp;</td>
                      <td className="border p-2 bg-gray-200">&nbsp;</td>
                      <td className="border p-2 bg-gray-200">&nbsp;</td>
                      <td className="border p-2 bg-gray-200">&nbsp;</td>
                    </tr>
                  ))
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    className="text-center"
                    variants={tableRowVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2" 
                          dangerouslySetInnerHTML={{ 
                              __html: highlightText(`${order.first_name || ""} ${order.last_name || ""}`, searchTerm) 
                          }}>
                      </td>
                    <td className="border p-2">Rp {(order.price || 0).toFixed(2)}</td>
                    <td className="border p-2" dangerouslySetInnerHTML={{ __html: highlightText(order.products_name || "N/A", searchTerm) }}></td>
                    <td className="border p-2">
                      <span
                        className={`px-3 py-1 text-white font-semibold rounded-full shadow-lg 
                          ${order.status === "Pending" ? "bg-orange-500 animate-pulse" : 
                            order.status === "Paid" ? "bg-green-500 animate-pulse" : 
                            "bg-green-500"}`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </td>
                    <td className="border p-2">
                      {order.url ? (
                        <a
                          href={order.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-500 font-medium hover:underline"
                        > 
                         {translations[language]?.orderListInvoice}
                        </a>
                      ) : (
                        "Pending"
                      )}
                    </td>
                    <td className="border p-2 flex justify-center gap-2">
                      <motion.button
                        onClick={() => getOrderById(order.id)}
                        className={`px-3 py-1 rounded text-white ${
                          isProcessing === order.id ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-black transition"
                        }`}
                        disabled={isProcessing === order.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isProcessing === order.id ? "Processing..." : <FaEye size={18} />}
                      </motion.button>
                    </td>
                    <td className="border p-2">
                      <motion.button
                        onClick={() => handleDelete(order.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaTrash size={18} />
                      </motion.button>
                    </td>
                    <td className="border p-2">
                      <motion.button
                         onClick={generatePDF}
                        className="px-3 py-1 bg-red-700 text-white rounded-lg hover:bg-black transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaFilePdf size={18} />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))
              ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  <img 
                  src={NoImageAnimation} 
                  alt="No Orders Found" 
                  className="w-40 mx-auto" 
                  />
                  <p>
                    {translations[language]?.orderListNoOrdersFound}
                  </p>
                    <span>
                      {translations[language]?.orderListGetYourOrders} {" "}
                        <a href="/menu" className="text-blue-500 underline">
                          {translations[language]?.orderListNoOrdersFoundHere}
                        </a>
                    </span>
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <ChatWhatsApp />
        <a href="/menu"
                class="fixed bottom-4 right-3 px-3 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600 transition hover:scale-110">
                + {translations[language]?.orderListAddOrders}
            </a>

        {/* tampilan modal view details */}
        <AnimatePresence>
          {selectedOrder && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
            >
              <motion.div
                className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full border border-gray-200 
             max-h-screen overflow-y-auto"
                variants={modalVariants}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{translations[language]?.orderListDetails}:</h3>
                <hr />
                {loadingDetail ? (
                  <p className="text-gray-500 text-center">Loading...</p>
                ) : (
                  <div className="text-gray-700 space-y-2 text-sm">
                    <p><span className="font-semibold">{translations[language]?.orderListCustomer}:</span> {selectedOrder.first_name} {selectedOrder.last_name}</p>
                    <hr />
                    <p><span className="font-semibold">Email:</span> {selectedOrder.email}</p>
                    <hr />
                    <p><span className="font-semibold">{translations[language]?.orderListPhone}:</span> {selectedOrder.phone}</p>
                    <hr />
                    <p><span className="font-semibold">{translations[language]?.orderListAddress}:</span> {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.country}</p>
                    <hr />
                    <p><span className="font-semibold">{translations[language]?.orderListPostalCode}:</span> {selectedOrder.postal_code}</p>
                    <hr />
                    <p><span className="font-semibold">{translations[language]?.orderListProducts}:</span> {selectedOrder.products_name}</p>
                    <hr />
                    <p><span className="font-semibold">{translations[language]?.orderListPaymentChannel}:</span> {selectedOrder.payment_channel || "N/A"}</p>
                    <hr />
                    <p><span className="font-semibold">{translations[language]?.orderListPaymentMethod}:</span> {selectedOrder.payment_method || "N/A"}</p>
                    <hr />
                    <p><span className="font-semibold">{translations[language]?.orderListCreatedAt}:</span> {formatDateTime(selectedOrder.created_at)}</p>
                    <hr />
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition duration-200"
                    >
                      {translations[language]?.orderListcloseOrders}
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrderList;