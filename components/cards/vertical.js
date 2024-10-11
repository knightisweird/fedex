import Image from "next/image";
import React from "react";
import sampleImage from "@/assets/hrimage.jpg";

const VerticalCard = ({title, content, cover, cta}) => {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg">
      {/* Right Section - Image */}
      <div className="flex justify-center lg:justify-end">
        <Image
          src={cover} // Replace with your image path
          alt="Package Image"
          width={500} // Set width and height based on the image
          height={300}
          className="object-cover"
        />
      </div>

      {/* Left Section - Text */}
      <div className="p-4">
        <h2 className="text-[20px] font-medium">{title}</h2>
        <p className="text-gray-600 py-4">
          {content}
        </p>
        <button className="text-[#007AB7] font-semibold">
          {cta}
        </button>
      </div>
    </div>
  );
};

export default VerticalCard;
