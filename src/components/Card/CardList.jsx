import React from "react";

const CardList = ({ cards, selectedCardIndex, onCardSelect, onAddNewCard }) => {
  return (
    <div className="space-y-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedCardIndex === index ? "border-blue-500" : "border-gray-600"
          }`}
          onClick={() => onCardSelect(index)}
        >
          <span className="text-gray-300">Card ending in {card.lastFour}</span>
        </div>
      ))}
      <div
        className="p-4 border rounded-lg cursor-pointer border-gray-600"
        onClick={onAddNewCard}
      >
        <span className="text-gray-300">Use a new payment method</span>
      </div>
    </div>
  );
};

export default CardList;
