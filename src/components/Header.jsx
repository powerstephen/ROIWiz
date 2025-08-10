export function Header({ onExport }) {
  return (
    <header className="relative mb-6">
      {/* Top-right actions */}
      <div className="absolute right-0 top-0 flex items-center gap-2">
        <a
          href="https://www.tilla.tech/"
          target="_blank"
          rel="noreferrer"
          className="btn"
        >
          Tilla Website
        </a>
        <button
          onClick={onExport}
          className="btn btn-primary"
        >
          Export CSV
        </button>
      </div>

      {/* Centered brand block */}
      <div className="flex flex-col items-center">
        <img src="/tilla-logo.svg" alt="Tilla Logo" className="h-20 w-auto" />
        <h1 className="text-3xl font-bold text-center text-tilla-primary mt-2">
          Calculate Your Crew-Ops ROI
        </h1>
        <p className="text-base font-semibold text-gray-800 text-center mt-1">
          Unlock Cost Savings And Efficiency With Digitised Crew Changes
        </p>
      </div>
    </header>
  );
}
