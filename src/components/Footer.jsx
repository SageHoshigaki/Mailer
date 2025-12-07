export default function FooterCTA() {
  return (
    <section
      className="relative w-full min-h-[65vh] flex items-center justify-center 
      overflow-hidden bg-gradient-to-b 
      from-[#001226] via-[#1e40af] to-[#0a1a33]"
    >
      {/* --- Bottom glow to match orange version --- */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2
        w-[60%] h-[140px] bg-white/20 opacity-40 blur-3xl rounded-full 
        pointer-events-none"
      />

      {/* --- Vertical divider lines --- */}
      <div className="absolute inset-0 flex justify-between px-10 opacity-[0.09] pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-px bg-white"></div>
        ))}
      </div>

      {/* --- BIG TEXT --- */}
      <h1
        className="text-white font-extrabold select-none text-[20vw] md:text-[13vw] 
        leading-none z-10"
      >
        Get in Touch
      </h1>

      {/* --- Tiny repeating labels --- */}
      <div
        className="absolute bottom-10 w-full flex justify-between px-14 
        text-[10px] tracking-widest uppercase text-white/70 z-10"
      >
        {["Let’s Chat", "Let’s Chat", "Let’s Chat", "Let’s Chat", "Let’s Chat", "Let’s Chat"].map(
          (t, i) => (
            <span key={i}>{t}</span>
          )
        )}
      </div>
    </section>
  );
}