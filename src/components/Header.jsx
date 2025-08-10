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
      <div className="flex flex-col items-center space-y-2">
        <img src="/tilla-logo.svg" alt="Tilla Logo" className="h-20 w-auto" />
        <h1 className="text-2xl font-bold text-center text-tilla-primary">
          Calculate Your Crew-Ops ROI
        </h1>
        <p className="text-sm text-slate-700 text-center">
          Estimate your savings from digitisation of crew changes
        </p>
      </div>
    </header>
  );
}
