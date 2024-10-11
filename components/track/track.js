"use client"; // for client-side rendering in Next.js

import { useState } from "react";
import dynamic from "next/dynamic";
const html2pdf = dynamic(() => import("html2pdf.js"), { ssr: false });

// Fetch data from Contentful
const fetchOrderData = async (orderId) => {
  const query = `{
    orderCollection(where: {orderId: "${orderId}"}, limit: 1) {
      items {
        orderId
        status
        customerName
        location
        orderDate
      }
    }
  }`;

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`, // Contentful Delivery API token
      },
      body: JSON.stringify({ query }),
    }
  );

  const data = await response.json();
  return data?.data?.orderCollection?.items?.[0] || null;
};

const Track = () => {
  const [orderId, setOrderId] = useState("");
  const [orderInfo, setOrderInfo] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setOrderInfo(null);

    try {
      const order = await fetchOrderData(orderId);

      if (!order) {
        setError("Order not found");
        return;
      }

      setOrderInfo(order);
    } catch (error) {
      setError("Failed to fetch order information");
    }
  };

  const downloadPDF = () => {
    if (!orderInfo) {
      console.error("Order information is not available.");
      return;
    }

    const element = document.getElementById("pdf-content");

    // Check if the element exists before proceeding
    if (!element) {
      console.error("PDF content element not found.");
      return;
    }

    const options = {
      margin: 1,
      filename: `order_${orderInfo.orderId}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
      .from(element)
      .set(options)
      .save()
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  return (
    <div className="max-w-[1200px] mx-auto p-6 py-[100px] text-center">
      <h1 className="text-[24px] md:text-[28px] my-3">Track Your Order</h1>

      {!orderInfo && (
        <form
          onSubmit={handleSearch}
          className="w-full max-w-[600px] mx-auto flex flex-col items-center"
        >
          <label htmlFor="trackingId" className="text-center mb-2">
            Enter Tracking ID:
          </label>
          <input
            type="text"
            id="trackingId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
            className="w-full p-2 my-3 block border-[1px] md:max-w-[70%]"
          />
          <button
            type="submit"
            className="p-3 rounded-md bg-[#ff6200] text-white"
          >
            Track Order
          </button>
        </form>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {orderInfo && (
        <div id="pdf-content" style={{ marginTop: "20px" }}>
          <div className="flex justify-between bg-gray-100 py-6 px-4">
            {/* Scheduled Delivery Section */}
            <div className="scheduled-delivery rounded-md">
              <p className="text-gray-500 font-bold">SCHEDULED DELIVERY DATE</p>
              <h2 className="text-[40px]">Saturday</h2>
              <p className="text-[18px]">10/12/24 at 12:00 PM</p>
              <button
                onClick={downloadPDF}
                className="mt-3 p-2 bg-green-500 text-white rounded-md"
              >
                Download PDF
              </button>
            </div>

            {/* Tracking Details Section */}
            <div className="tracking-info">
              <h4 className="text-gray-500 font-bold">DELIVERY STATUS</h4>
              <p className="text-[20px] text-blue-500">{orderInfo.status}</p>
            </div>
            <div className="tracking-id">
              <h4 className="text-gray-500 font-bold">TRACKING ID</h4>
              <p>{orderInfo.orderId}</p>
              <div className="bg-white rounded-lg shadow-md w-96 p-8">
                <div className="flex items-center">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-1 bg-purple-600 h-16 rounded-t"></div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-600 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9V7a1 1 0 112 0v2a1 1 0 11-2 0zm0 4a1 1 0 112 0v-2a1 1 0 11-2 0v2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="w-1 bg-purple-600 h-16 rounded-b"></div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-4">
                      <h2 className="text-gray-500 font-semibold">FROM</h2>
                      <p className="text-xl font-bold">New York</p>
                    </div>
                    <div className="mb-4">
                      <h2 className="text-gray-500 font-semibold">
                        WE HAVE YOUR PACKAGE
                      </h2>
                    </div>
                    <div className="bg-gray-200 rounded-full p-4 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-600 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9V7a1 1 0 112 0v2a1 1 0 11-2 0zm0 4a1 1 0 112 0v-2a1 1 0 11-2 0v2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="font-semibold text-gray-700">ON THE WAY</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipment Facts */}
          <div className="shipment-facts bg-gray-100 mt-8 p-6 rounded-md">
            <h3 className="text-[24px] mb-4 font-bold">Shipment Facts</h3>
            <div className="shipment-overview">
              <div className="flex justify-between">
                <p>
                  <strong>Tracking Number:</strong> {orderInfo.orderId}
                </p>
                <p>
                  <strong>Location:</strong> {orderInfo.location}
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date(orderInfo.orderDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Delivery Status:</strong> {orderInfo.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Track;
