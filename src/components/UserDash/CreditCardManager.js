"use client";

import React, { useState } from "react";
import PaymentModal from "./PaymentModal";

const CreditCardManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cards, setCards] = useState([
    { lastFour: "1234" },
    { lastFour: "5678" },
  ]);

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Manage Payment Methods
      </button>
      {isModalOpen && (
        <PaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          cards={cards}
          onCardSaved={(newCard) => setCards((prev) => [...prev, newCard])}
        />
      )}
    </div>
  );
};

export default CreditCardManager;
