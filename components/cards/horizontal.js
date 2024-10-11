import Image from 'next/image';
import React from 'react';

const HorizontalCard = ({cover, title, content, cta}) => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start bg-white shadow-md rounded-lg space-y-6 lg:space-y-0 lg:space-x-6 max-w-6xl mx-auto">
      {/* Left Section - Text */}
      <div className="lg:w-1/2 space-y-3 text-center lg:text-left p-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600">
          {content}
        </p>
        <p className="text-[#007AB7] font-semibold">
          {cta}
        </p>
      </div>

      {/* Right Section - Image */}
      <div className="lg:w-1/2 flex justify-center lg:justify-end">
        <Image
          src={cover} // Replace with your image path
          alt="Package Image"
          width={500} // Set width and height based on the image
          height={300}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default HorizontalCard;
