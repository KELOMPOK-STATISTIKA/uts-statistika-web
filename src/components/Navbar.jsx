function GithubMark({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <>
      <header className="fixed top-3 sm:top-5 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none">
        <div className="pointer-events-auto w-full sm:w-auto sm:max-w-3xl mx-auto flex items-center justify-between sm:justify-center gap-1.5 sm:gap-3 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-full bg-slate-900/80 backdrop-blur-2xl border border-white/[0.14] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.75)] ring-1 ring-inset ring-white/[0.06]">
          {/* Brand Mark */}
          <button
            type="button"
            onClick={() => setActiveTab('soal1')}
            className="flex items-center gap-1.5 sm:gap-2.5 pl-1.5 sm:pl-2 pr-1 py-1 rounded-full group focus:outline-none shrink-0"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 transition-transform duration-300 group-hover:scale-110"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            >
              <path d="M5 18v-5" />
              <path d="M10 18V8" />
              <path d="M15 18v-8" />
              <path d="M20 18V5" />
            </svg>
            <span className="text-[13px] sm:text-[15px] font-semibold tracking-tight text-white">
              StatProb<span className="text-emerald-400">.</span>
            </span>
          </button>

          {/* Pembatas Vertikal Kiri */}
          <span className="hidden sm:block h-5 w-px bg-white/[0.14]" aria-hidden="true" />

          {/* Navigasi Tab Kapsul Responsif */}
          <nav
            aria-label="Navigasi Utama"
            className="flex items-center gap-0.5 sm:gap-1.5 bg-white/[0.04] sm:bg-transparent p-0.5 sm:p-0 rounded-full"
          >
            <button
              type="button"
              onClick={() => setActiveTab('soal1')}
              className={`px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === 'soal1'
                  ? 'bg-white/[0.15] text-white shadow-sm ring-1 ring-inset ring-white/[0.2]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <span className="sm:hidden">Deskriptif</span>
              <span className="hidden sm:inline">Statistik Deskriptif</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('soal2')}
              className={`px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === 'soal2'
                  ? 'bg-white/[0.15] text-white shadow-sm ring-1 ring-inset ring-white/[0.2]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <span className="sm:hidden">Probabilitas</span>
              <span className="hidden sm:inline">Probabilitas &amp; Bayes</span>
            </button>
          </nav>

          {/* Pembatas Vertikal Kanan */}
          <span className="hidden sm:block h-5 w-px bg-white/[0.14]" aria-hidden="true" />

          {/* Tombol GitHub: Ikon Bulat di Mobile, Pil Lengkap di Desktop */}
          <a
            href="https://github.com/KELOMPOK-STATISTIKA"
            target="_blank"
            rel="noreferrer"
            title="GitHub Organization Kelompok 4"
            aria-label="GitHub Kelompok Statistika"
            className="inline-flex items-center justify-center gap-2 w-8 h-8 md:w-auto md:h-auto md:px-3.5 md:py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white bg-white/[0.05] md:bg-transparent hover:bg-white/[0.1] border border-white/[0.08] md:border-transparent transition-colors shrink-0"
          >
            <GithubMark className="w-4 h-4" />
            <span className="hidden md:inline">GitHub</span>
          </a>
        </div>
      </header>

      {/* Spacer agar konten utama tidak tertutup floating navbar */}
      <div className="h-16 sm:h-20" aria-hidden="true" />
    </>
  );
}