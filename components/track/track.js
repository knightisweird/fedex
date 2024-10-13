"use client";
import { useState } from "react";
import Image from "next/image";
import overview from "@/assets/location.svg";
import ship from "@/assets/ship.svg";
import pack from "@/assets/package.svg";
import download from "@/assets/down.svg";
import right from "@/assets/right.svg";

let html2pdf;
if (typeof window !== "undefined") {
  html2pdf = require("html2pdf.js");
}


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
        dateOfTransit
        deliveryDate
        service
        terms
        weight
        dimension
        totalPieces
        packaging
        locationTo
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

    // Ensure `html2pdf` is only loaded on the client
    if (html2pdf) {
      html2pdf()
        .from(element)
        .set(options)
        .save()
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    }
  };

  const calculateScheduledDelivery = (orderDate) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 7);
    return date;
  };

  const scheduledDate = orderInfo
    ? calculateScheduledDelivery(orderInfo.orderDate)
    : null;

  return (
    <div className="max-w-[1200px] mx-1 md:mx-auto p-6 py-[50px] md:py-[100px] text-center">
      <h1 className="uppercase text-black text-[24px] md:text-[32px] my-3">
        Track Your Order
      </h1>

      {!orderInfo && (
        <form
          onSubmit={handleSearch}
          className="w-full max-w-[600px] mx-auto flex flex-col items-center"
        >
          <label
            htmlFor="trackingId"
            className="text-[#ff6200] text-center text-[20px] mb-2"
          >
            Enter Tracking ID:
          </label>
          <input
            type="text"
            id="trackingId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
            className="w-full p-3 my-3 block rounded-[4px] border-[1px] border-black md:max-w-[80%]"
          />
          <button
            type="submit"
            className="w-[50%] md:w-[30%] mt-3 p-3 rounded-[4px] bg-[#ff6200] hover:bg-black text-white"
          >
            Track Order
          </button>
        </form>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {orderInfo && (
        <div id="pdf-content" style={{ marginTop: "20px" }}>
          <div className="flex flex-col items-start md:items-start gap-6 md:flex-row justify-between py-6 px-0 md:px-4">
            {/* Scheduled Delivery Section */}
            <div className="text-left scheduled-delivery rounded-md">
              <p className="text-[#1b1b1b1] font-bold text-left">
                SCHEDULED DELIVERY DATE
              </p>
              {scheduledDate && (
                <>
                  <p className="text-[40px] text-grey text-left">
                    {scheduledDate.toLocaleString("en-US", { weekday: "long" })}
                  </p>
                  <p className="text-[18px] text-left">
                    {scheduledDate.toLocaleDateString()} at 12:00 PM
                  </p>
                </>
              )}
              <button
                onClick={downloadPDF}
                className="flex items-center mt-3 p-2 py-1 text-[333] border border-[#333] rounded-[4px] text-left gap-2"
              >
                <Image src={download} width={18} height={18} />
                Download PDF
              </button>
            </div>

            {/* Tracking Details Section */}
            <div className="tracking-info">
              <h4 className="text-[#1b1b1b] text-left font-bold">
                DELIVERY STATUS
              </h4>
              <p className="flex items-center gap-2 text-[20px] text-left text-[#4D148C]">
                {orderInfo.status}
                <Image src={right} width={20} height={20} />
              </p>
            </div>
            <div className="tracking-id">
              <h4 className="text-[#1b1b1b] text-left font-bold">
                TRACKING ID
              </h4>
              <p className="text-left">{orderInfo.orderId}</p>
              <div className="bg-white rounded-lg mt-3 p-0 md:p-2">
                <div className="flex items-center">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-2 bg-purple-600 h-16 rounded-t"></div>
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
                      <h2 className="text-gray-500 text-left font-semibold">
                        FROM
                      </h2>
                      <p className="text-xl text-left font-bold">
                        {orderInfo.location}
                      </p>
                    </div>
                    <div className="mb-4">
                      <h2 className="text-gray-500 text-left font-semibold">
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
                      <p className="font-semibold text-left text-gray-700">
                        ON THE WAY
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipment Facts */}
          <div className="shipment-facts bg-{#FAFAFA} mt-8  md:p-6 rounded-md">
            <h3 className="text-[24px] text-left text-grey-300 mb-4">
              Shipment Facts
            </h3>
            {/* <div className="">
              <span className="flex items-center gap-2">
                <Image src={overview} width={45} height={45} />
                <h6 className="text-[#1b1b1b] text-[22px]">
                  Shipment Overview
                </h6>
              </span>
              <div className="container mx-auto py-6">
                <table className="min-w-full bg-gray-100 rounded-lg shadow-md">
                  <thead>
                    <tr>
                      <th className="max-w-[33%] p-4 border-b border-gray-300 bg-[#4d148c] text-white font-bold text-left">
                        Tracking Number
                      </th>
                      <th className="max-w-[33%] p-4 border-b border-gray-300 bg-[#4d148c] text-white font-bold text-left">
                        Ship Date
                      </th>
                      <th className="max-w-[33%] p-4 border-b border-gray-300 bg-[#4d148c] text-white font-bold text-left">
                        Standard Transit
                      </th>
                      <th className="max-w-[33%] p-4 border-b border-gray-300 bg-[#4d148c] text-white font-bold text-left">
                        Delivered
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 text-left border-b border-gray-300">
                        {orderInfo.orderId}
                      </td>
                      <td className="p-4 text-left border-b border-gray-300">
                        {new Date(orderInfo.orderDate).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-left border-b border-gray-300">
                        {new Date(orderInfo.dateOfTransit).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-left border-b border-gray-300">
                        {new Date(orderInfo.deliveryDate).toLocaleDateString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}

            <div className="mx-auto mt-10 py-4">
              <span className="flex items-center gap-2 mb-2">
                <Image src={overview} width={40} height={40} />
                <h6 className="text-[#1b1b1b] text-[20px]">
                  Shipment Overview
                </h6>
              </span>
              <table className="w-full table-auto border-collapse">
                <tbody>
                  <tr className="bg-[#f2f2f2] border-b">
                    <td className="uppercase font-semibold text-[#333] text-left text-gray-600 p-2">
                      Tracking number
                    </td>
                    <td className="text-gray-800 text-left p-2">
                      {orderInfo.orderId}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="uppercase font-semibold text-[#333] text-left text-gray-600 p-2">
                      Ship date
                    </td>
                    <td className="text-gray-800 text-left p-2">
                      {new Date(orderInfo.orderDate).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr className="bg-[#f2f2f2] border-b">
                    <td className="uppercase font-semibold text-[#333] text-left text-gray-600 p-2">
                      Standard transit
                    </td>
                    <td className="text-gray-800 text-left p-2">
                      {new Date(orderInfo.dateOfTransit).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr className="">
                    <td className="uppercase font-semibold text-[#333] text-left text-gray-600 p-2">
                      DELIVERED
                    </td>
                    <td className="text-gray-800 text-left p-2">
                      {new Date(orderInfo.deliveryDate).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr className="bg-[#f2f2f2] border-b">
                    <td className="uppercase font-semibold text-[#333] text-left text-gray-600 p-2">
                      Location To
                    </td>
                    <td className="text-gray-800 text-left p-2">
                      {orderInfo.locationTo}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Services */}
            {/* <div className="">
              <span className="flex items-center gap-2">
                <Image src={ship} width={45} height={45} />
                <h6 className="text-[#1b1b1b] text-[22px]">
                  Shipment Services
                </h6>
              </span>
              <div className="container mx-auto py-6">
                <table className="min-w-full bg-gray-100 rounded-lg shadow-md">
                  <thead>
                    <tr>
                      <th className="max-w-[33%] p-4 border-b border-gray-300 bg-[#4d148c] text-white font-bold text-left">
                        Service
                      </th>
                      <th className="max-w-[33%] p-4 border-b border-gray-300 bg-[#4d148c] text-white font-bold text-left">
                        Terms
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 text-left border-b border-gray-300">
                        {orderInfo.service}
                      </td>
                      <td className="p-4 text-left border-b border-gray-300">
                        {orderInfo.terms}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}

            <div className="mx-auto mt-10 py-4">
              <span className="flex items-center gap-2 mb-2">
                <Image src={ship} width={40} height={40} />
                <h6 className="text-[#1b1b1b] text-[20px]">
                  Shipment Services
                </h6>
              </span>
              <table className="w-full table-auto border-collapse">
                <tbody>
                  <tr className="bg-[#f2f2f2] border-b">
                    <td className="uppercase font-semibold text-[#333] text-left text-gray-600 p-2">
                      Service
                    </td>
                    <td className="text-gray-800 text-left p-2">
                      {orderInfo.service}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="uppercase font-semibold text-[#333] text-left text-gray-600 p-2">
                      Terms
                    </td>
                    <td className="text-gray-800 text-left p-2">
                      {orderInfo.terms}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Package Details */}
            {/* <div className="">
              <span className="flex items-center gap-2">
                <Image src={pack} width={45} height={45} />
                <h6 className="text-[#1b1b1b] text-[22px]">Package Details</h6>
              </span>
              <div className="container mx-auto py-6">
                <table className="min-w-full bg-gray-100 rounded-lg shadow-md">
                  <thead>
                    <tr>
                      <th className="max-w-[33%] p-4 border-b border-gray-300 bg-[#4d148c] text-white font-bold text-left">
                        Weight
                      </th>
                      <th className="max-w-[33%] p-4 border-b border-gray-300 bg-[#4d148c] text-white font-bold text-left">
                        Dimensions
                      </th>
                      <th className="max-w-[33%] p-4 border-b border-gray-300 bg-[#4d148c] text-white font-bold text-left">
                        Total Pieces
                      </th>
                      <th className="max-w-[33%] p-4 border-b border-gray-300 bg-[#4d148c] text-white font-bold text-left">
                        Packaging
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 text-left border-b border-gray-300">
                        {orderInfo.weight}
                      </td>
                      <td className="p-4 text-left border-b border-gray-300">
                        {orderInfo.dimension}
                      </td>
                      <td className="p-4 text-left border-b border-gray-300">
                        {orderInfo.totalPieces}
                      </td>
                      <td className="p-4 text-left border-b border-gray-300">
                        {orderInfo.packaging}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}

            <div className="mx-auto mt-10 py-4">
              <span className="flex items-center gap-2 mb-2">
                <Image src={pack} width={40} height={40} />
                <h6 className="text-[#1b1b1b] text-[20px]">Package Details</h6>
              </span>
              <table className="w-full table-auto border-collapse">
                <tbody>
                  <tr className="bg-[#f2f2f2] border-b">
                    <td className="uppercase font-semibold text-[#333] text-left text-gray-600 p-2">
                      Weight
                    </td>
                    <td className="text-gray-800 text-left p-2">
                      {orderInfo.weight}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="uppercase font-semibold text-[#333] text-left text-gray-600 p-2">
                      Dimension
                    </td>
                    <td className="text-gray-800 text-left p-2">
                      {orderInfo.dimension}
                    </td>
                  </tr>
                  <tr className="bg-[#f2f2f2] border-b">
                    <td className="uppercase font-semibold text-[#333] text-left text-gray-600 p-2">
                      Total Pieces
                    </td>
                    <td className="text-gray-800 text-left p-2">
                      {orderInfo.totalPieces}
                    </td>
                  </tr>
                  <tr className="">
                    <td className="uppercase font-semibold text-[#333] text-left text-gray-600 p-2">
                      Packaging
                    </td>
                    <td className="text-gray-800 text-left p-2">
                      {orderInfo.packaging}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <div className="shipment-overview">
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
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Track;
