"use client";

import React, { useState } from "react";
import QuoteModal from "@/components/modals/quote-modal";
import DisplayQuotes from "@/components/Body/display-quotes";

const MainBody = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 dark:bg-[#1f1f1f] px-4">
      <div className="max-w-3xl w-full bg-white mt-20 dark:bg-[#2c2c2e] p-8 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          QuoteFusion
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-8">
          Discover and generate inspirational quotes with ease.
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleOpenModal}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Generate Quote
          </button>
        </div>
      </div>
      <QuoteModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <DisplayQuotes />
    </div>
  );
};

export default MainBody;