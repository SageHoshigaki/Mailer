"use client";

import React, { useState } from "react";
import PaymentModal from "./PaymentModal";
import CreditCard from "@components/UserDash/CreditCard";
import AddFundsModal from "@components/Card/AddFundsModal";

const CreditCardManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for PaymentModal visibility
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false); // State for AddFundsModal visibility
  const [cards, setCards] = useState([
    { lastFour: "4242", paymentMethodId: "pm_1QeKsECT1xPnWVmcCLHuxmlr" }, // Example Stripe test card
  ]); // Default card list

  // Open and close modal functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Add new card function
  const handleCardSaved = (newCard) => {
    setCards((prevCards) => [...prevCards, newCard]); // Add new card to the list
    closeModal(); // Close modal after saving card
  };

  // Handle funding logic
  const handleFundAccount = async (amount) => {
    const email = "sagehoshigaki@gmail.com"; // Hard-coded email for testing
    const paymentMethodId = cards[0].paymentMethodId; // Use the first card in the list for now

    try {
      const response = await fetch("/api/wallet/fund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, paymentMethodId, amount }), // Send amount in cents
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Funding failed:", data.error);
        alert(`Error: ${data.error}`);
      } else {
        console.log("Account funded successfully:", data);
        alert("Account funded successfully!");
      }
    } catch (err) {
      console.error("Error funding account:", err);
      alert("An error occurred. Please check the console.");
    }
  };

  return (
    <div>
      <CreditCard />
      <button
        onClick={openModal}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add a New Card
      </button>

      <button
        onClick={() => setIsAddFundsOpen(true)}
        className="bg-green-500 text-white p-2 rounded ml-2"
      >
        Add Funds
      </button>

      {/* Render PaymentModal */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        cards={cards}
        onCardSaved={handleCardSaved}
      />

      {/* Render AddFundsModal */}
      <AddFundsModal
        isOpen={isAddFundsOpen}
        onClose={() => setIsAddFundsOpen(false)}
        onSubmit={handleFundAccount} // Handle funding logic
      />
    </div>
  );
};

export default CreditCardManager;
