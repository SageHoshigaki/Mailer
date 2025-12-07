import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center">

      {/* Background Image */}
      <Image
        src="/img/hero2.jpg"
        alt="Hero background"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_auto] items-center gap-12">

          {/* Left Column */}
          <div className="max-w-xl">
            <p className="mb-4 text-xs uppercase tracking-widest text-white/90">
              Coming Soon
            </p>

            <h1 className="text-4xl md:text-6xl font-light leading-tight text-white">
              <span className="block text-white/95">A Smarter Way to Handle</span>
              <span className="block text-white/75">Paperwork, Payments,</span>
              <span className="block text-white/75">and Court Essentials</span>
            </h1>

            <a
              href="#waitlist"
              className="mt-8 inline-block rounded-md bg-white px-6 py-3 text-sm font-medium text-black shadow transition hover:bg-white/90"
            >
              Join Waitlist
            </a>
          </div>

          {/* Right Column */}
          <p className="hidden md:block max-w-sm text-sm leading-relaxed text-white/90">
            We’re building tools for real problems — legal, financial, operational.
            PennEquity removes friction, reduces paperwork, and eliminates stress
            so you can focus on what actually matters.
          </p>

        </div>
      </div>

    </section>
  );
}