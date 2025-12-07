export default function Nav() {
  return (
    <nav className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4">
      {/* Logo */}
      <div className="flex items-center gap-2 text-lg font-semibold text-white">
        <img src="/logo.svg" alt="PennEquity" className="h-6" />
        <span className="hidden md:inline-block">PennEquity</span>
      </div>

      {/* CTA */}
      <a
        href="#waitlist"
        className="rounded-md border border-white/60 px-5 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black"
      >
        Join Waitlist
      </a>
    </nav>
  );
}