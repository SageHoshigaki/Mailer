import React from "react";

const CreditCard = ({ lastFour, selected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`w-96 h-56 m-auto rounded-xl relative text-white shadow-2xl transition-transform transform ${
        selected ? "bg-blue-500 scale-105" : "bg-gray-800 hover:scale-105"
      }`}
    >
      <div className="w-full px-8 absolute top-8">
        <div className="flex justify-between">
          <p className="font-light">Card Number</p>
          <p className="font-medium tracking-more-wider">•••• {lastFour}</p>
        </div>
        <div className="pt-6">
          <div className="flex justify-between">
            <p className="font-light text-xs">Expiry</p>
            <p className="font-medium tracking-wider text-sm">MM/YY</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
