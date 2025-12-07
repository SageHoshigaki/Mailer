"use client";

import React, { useState } from "react";

const AddFundsModal = ({ isOpen, onClose, onSubmit }) => {
  const [amount, setAmount] = useState("");

  if (!isOpen) return null; // Hide the modal if it's not open

  const handlePresetAmount = (preset) => setAmount(preset);

  const handleSubmit = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    onSubmit(Number(amount) * 100); // Convert dollars to cents for Stripe
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add Funds</h2>

        {/* Preset Amount Buttons */}
        <div className="flex space-x-2 mb-4">
          {[10, 20, 50].map((preset) => (
            <button
              key={preset}
              onClick={() => handlePresetAmount(preset)}
              className="bg-blue-500 text-white p-2 rounded w-1/3"
            >
              ${preset}
            </button>
          ))}
        </div>

        {/* Custom Amount Input */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter custom amount"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded w-1/3"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white p-2 rounded w-1/3"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFundsModal;
