'use client'
import React from 'react';

const MarqueeText = ({ texts }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className="inline-block text-xl animate-marquee text-white text-[24px]">
        {texts.map((text, index) => (
          <span key={index} className="mx-4 text-[16px] md:text-[20px]">
            {text}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MarqueeText;
