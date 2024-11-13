import React, { useState, useEffect, useContext } from "react";
import { format } from "date-fns";
import EnlargedX from "../assets/EnlargedX.png";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import Pagination from "../components/Pagination";
import OrderDetailsModal from "../components/OrderDetailsModal";

const UserOrdersPage = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [totalOrders, setTotalOrders] = useState(0);

  // Filtering State
  const [statusFilter, setStatusFilter] = useState("");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Modal State
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!authLoading && user) {
      fetchOrders();
    }
    // eslint-disable-next-line
  }, [user, currentPage, statusFilter]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: currentPage,
        limit: ordersPerPage,
      };
      if (statusFilter) {
        params.status = statusFilter;
      }

      const response = await api.get("/orders/my-orders", { params });
      if (response.data.success) {
        setOrders(response.data.data);
        setTotalOrders(response.data.total);
      } else {
        setError(response.data.message || "Failed to load orders.");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.message || "Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setSelectedStatus(
      status === "" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)
    );
    setCurrentPage(1); // Reset to first page on filter change
    setIsStatusOpen(false);
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  const statusOptions = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Refunded",
  ];

  return (
    <>
      <div className="main-div bg-gradient-to-r from-[#A467F7] to-[#4C03CB] flex flex-col md:flex-row items-center">
        <div className="left-col px-6 py-12 md:px-20 md:py-28 w-full md:w-1/2 flex flex-col items-center md:items-start">
          <h1 className="text-6xl md:text-8xl lg:text-9xl quantico-bold-italic text-white text-center md:text-left">
            Orders
          </h1>
          <p className="text-white pt-sans-regular text-xl md:text-2xl mt-4 text-center md:text-left">
            See what you've ordered!
          </p>
        </div>
        <div className="right-col hidden md:flex w-full md:w-1/2 h-48 md:h-[400px] overflow-hidden items-center justify-center mt-6 md:mt-0">
          <img
            className="w-44 md:w-[360px] object-cover transition-transform duration-[2000ms] ease-in-out transform hover:-translate-y-20 md:hover:-translate-y-96"
            src={EnlargedX}
            alt="Enlarged"
          />
        </div>
      </div>
      <div className="flex justify-center items-start py-10 md:py-20 bg-gray-100 min-h-screen">
        <div className="w-full max-w-7xl px-4 md:px-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold quantico-bold-italic uppercase text-black mb-4 md:mb-0">
              Your Order Status
            </h1>

            {/* Filter Dropdown */}
            <div className="relative w-full md:w-auto">
              <button
                type="button"
                className="w-full md:w-60 bg-white border border-black text-black py-2 px-4 pr-8 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.3)] quantico-bold-italic text-lg focus:outline-none"
                onClick={() => setIsStatusOpen(!isStatusOpen)}
              >
                {selectedStatus}
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <i className="fa-solid fa-chevron-down"></i>
                </span>
              </button>
              {isStatusOpen && (
                <div className="absolute z-10 w-full bg-white shadow-lg rounded-b-lg border border-black mt-1">
                  <ul>
                    <li
                      onClick={() => handleStatusFilterChange("")}
                      className={`p-3 hover:bg-gray-200 cursor-pointer quantico-regular ${
                        selectedStatus === "All" ? "bg-gray-200" : ""
                      }`}
                    >
                      All
                    </li>
                    {statusOptions.map((status) => (
                      <li
                        key={status}
                        onClick={() =>
                          handleStatusFilterChange(status.toLowerCase())
                        }
                        className={`p-3 hover:bg-gray-200 cursor-pointer quantico-regular ${
                          selectedStatus === status ? "bg-gray-200" : ""
                        }`}
                      >
                        {status}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-4 text-lg md:text-xl text-black quantico-regular">
              Loading your orders...
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-red-500 text-center mb-4 text-lg md:text-xl quantico-regular">
              {error}
            </div>
          )}

          {/* Orders List */}
          {!loading && !error && (
            <>
              {orders.length === 0 ? (
                <p className="text-center text-xl md:text-2xl text-black quantico-regular">
                  No orders found.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="border p-4 md:p-6 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow bg-white"
                      onClick={() => openOrderDetails(order)}
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <h2 className="text-2xl md:text-3xl font-semibold quantico-bold-italic text-black">
                          Order ID: {order.orderNumber}
                        </h2>
                        <span
                          className={`mt-2 md:mt-0 px-4 py-2 rounded-full text-white text-sm md:text-lg quantico-bold-italic ${
                            order.status === "delivered"
                              ? "bg-green-500"
                              : order.status === "processing" ||
                                order.status === "shipped"
                              ? "bg-blue-500"
                              : order.status === "cancelled" ||
                                order.status === "refunded"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </div>
                      <p className="mb-2 text-lg md:text-xl quantico-regular">
                        <strong>Date:</strong> {format(new Date(order.createdAt), "PPP")}
                      </p>
                      <p className="mb-4 text-lg md:text-xl quantico-regular">
                        <strong>Total Amount:</strong> ${order.finalAmount.toFixed(2)}
                      </p>
                      <div className="flex justify-end">
                        <button
                          onClick={() => openOrderDetails(order)}
                          className="bg-gradient-to-r from-black to-[#0821D2] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg quantico-bold-italic text-lg md:text-xl hover:shadow-xl transition-shadow"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalOrders > ordersPerPage && (
                <div className="mt-6 md:mt-8 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalItems={totalOrders}
                    itemsPerPage={ordersPerPage}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              )}
            </>
          )}

          {/* Order Details Modal */}
          {selectedOrder && (
            <OrderDetailsModal
              order={selectedOrder}
              onClose={closeOrderDetails}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UserOrdersPage;
