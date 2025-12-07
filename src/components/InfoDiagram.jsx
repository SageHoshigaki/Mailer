
import React from "react";

export default function InfoDiagram() {
  return (
    <section className="w-full bg-black text-white py-32 flex flex-col items-center px-4">
      {/* Top Label */}
      <p className="text-xs tracking-widest text-gray-400 mb-6 uppercase">
        Why Join the Waitlist?
      </p>

      {/* Title */}
      <h2 className="text-center text-4xl md:text-5xl font-semibold leading-tight mb-4">
        No more lines. No more chaos. No more missed dates.<br />
        Your Ideas, Our Build
      </h2>

      {/* Subtitle */}
      <p className="text-center text-gray-400 max-w-xl mb-10 text-sm md:text-base">
       Our Mailer handles your documents; the Justice Wallet handles your fines and court obligations.
       Your daily life becomes organized, trackable, and stress-free.
      </p>

      {/* CTA Button */}
      <button
        className="border border-gray-600 px-6 py-3 rounded-md text-sm tracking-wide hover:bg-white hover:text-black transition"
      >
        Why You Should Save Your Spot
      </button>

      {/* Decorative graphic placeholder */}
      <div className="w-full flex justify-center mt-20 mb-10 opacity-40">
        <div className="w-64 h-64 border border-gray-700 rounded-full"></div>
      </div>

      {/* Bottom Feature Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-12 mt-10">
        {/* Card 1 */}
        <div className="flex flex-col gap-3 border-l border-gray-700 pl-6">
          <span className="text-lg">✎</span>
          <p className="font-medium">Less Stress, More Control</p>
          <p className="text-gray-400 text-sm">
            Automate mail, deadlines, fines, and court tasks — all in one place.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col gap-3 border-l border-gray-700 pl-6">
          <span className="text-lg">◎</span>
          <p className="font-medium">Never Miss a Date Again</p>
          <p className="text-gray-400 text-sm">
          Smart alerts for court dates, payments, and important notices.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col gap-3 border-l border-gray-700 pl-6">
          <span className="text-lg">▣</span>
          <p className="font-medium">Clear Guidance, Anytime</p>
          <p className="text-gray-400 text-sm">
           Get simple answers and step-by-step support when things get confusing.
          </p>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col gap-3 border-l border-gray-700 pl-6">
          <span className="text-lg">⌖</span>
          <p className="font-medium">Full Transparency</p>
          <p className="text-gray-400 text-sm">
            Track mail, deadlines, and legal progress with real-time clarity.
          </p>
        </div>
      </div>
    </section>
  );
}