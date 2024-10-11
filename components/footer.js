import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-[#4d148c] p-6">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between text-white">
        <p className="text-center md:text-left">© FedEx 1995-2024</p>
        <div className="hidden md:flex items-center justify-end">
          Site Map | Terms of Use | Privacy & Security | Ad Choices
        </div>
      </div>
    </footer>
  );
};

export default Footer;
