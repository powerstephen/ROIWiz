export function Header({ onExport }) {
  return (
    <header className="flex flex-col items-center justify-center space-y-3 mb-6">
      {/* Logo */}
      <img src="/tilla-logo.svg" alt="Tilla Logo" className="h-20" />

      {/* Tagline */}
      <h1 className="text-2xl font-bold text-center text-tilla-primary">
        Calculate Your Crew-Ops ROI
      </h1>

      {/* Export Button */}
      <button
        onClick={onExport}
        className="px-4 py-2 text-sm font-medium text-white bg-tilla-primary rounded-lg hover:brightness-110"
      >
        Export CSV
      </button>
    </header>
  );
}
