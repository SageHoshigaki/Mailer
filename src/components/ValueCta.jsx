// components/ValueCTA.jsx
export default function ValueCTA() {
  return (
    <section className="w-full bg-white text-black py-32 px-6">
      <div className="max-w-5xl mx-auto text-center space-y-10">
        
        <h2 className="text-4xl md:text-6xl font-light leading-tight">
          Imagine handling every document, payment,
          and court requirement without stress.
        </h2>

        <h3 className="text-2xl md:text-3xl font-light text-neutral-700">
          PennEquity connects real-world problems to real-world solutions —
          automated mail, legal reminders, financial tracking, and more.
        </h3>

        <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
          One platform. One dashboard. Zero confusion.
          Just clarity, accuracy, and peace of mind.
        </p>

        <button className="mt-6 rounded-md bg-black text-white px-8 py-4 text-lg font-medium hover:bg-neutral-800 transition">
          Join the Waitlist
        </button>

      </div>
    </section>
  );
}