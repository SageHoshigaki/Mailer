
export default function Metrics() {
  return (
    <section className="relative w-full min-h-screen bg-black text-white flex items-center">
      <div className="max-w-7xl w-full mx-auto px-6 py-20 grid md:grid-cols-2 gap-20">

        {/* LEFT SIDE — MAIN COPY */}
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl font-light leading-tight">
            Stop paperwork stress<br />
            <span className="text-white/70">Automate your mail & legal workflow</span>
          </h1>

          <p className="mt-6 text-lg text-white/70 max-w-md">
            PennEquity connects your automated mailer system and Justice Wallet 
            to give you real-time document delivery, court-date reminders, 
            and financial tracking — all in one place.
          </p>

          <div className="mt-10 flex items-center gap-6">
            <a
              href="#waitlist"
              className="inline-block border border-white/50 px-6 py-3 rounded-md text-sm tracking-wide hover:bg-white hover:text-black transition"
            >
              Join Waitlist
            </a>

            <button className="text-white/60 text-sm hover:text-white transition flex items-center gap-2">
              Learn more <span className="text-xl">→</span>
            </button>
          </div>
        </div>

        {/* RIGHT SIDE — METRICS / GLOBE / VISUAL */}
        <div className="flex flex-col justify-center space-y-12">

          <div>
            <p className="text-6xl md:text-7xl font-light">40%+</p>
            <p className="text-white/60 mt-2">Reduce Missed Court Dates by</p>
          </div>

          <div>
            <p className="text-6xl md:text-7xl font-light">80%</p>
            <p className="text-white/60 mt-2">Less Time Spent on Paperwork</p>
          </div>

          <div>
            <p className="text-6xl md:text-7xl font-light">99.9%</p>
            <p className="text-white/60 mt-2">Mail delivery accuracy</p>
          </div>

        </div>
      </div>
    </section>
  );
}