"use client";

import React, { useState } from "react";
import NewCardForm from "@components/Card/NewCardForm";
import CardList from "@components/Card/CardList";

const PaymentModal = ({ isOpen, onClose, cards = [], onCardSaved }) => {
  const [isAddingNewCard, setIsAddingNewCard] = useState(false);

  if (!isOpen) return null; // Hide the modal if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg">
        <h2>{isAddingNewCard ? "Add a New Card" : "Payment Methods"}</h2>
        {isAddingNewCard ? (
          <NewCardForm
            onCardSaved={(newCard) => {
              onCardSaved(newCard);
              setIsAddingNewCard(false);
            }}
            onCancel={() => setIsAddingNewCard(false)}
          />
        ) : (
          <CardList
            cards={cards}
            onAddNewCard={() => setIsAddingNewCard(true)}
          />
        )}
        <button onClick={onClose} className="bg-gray-500 text-white p-2 mt-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
