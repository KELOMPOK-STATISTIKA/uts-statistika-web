import { BarChart3, Calculator } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">
              UTS STATISTIKA
            </span>
            <span className="text-xs text-slate-400">Teknik Informatika — UNPER</span>
          </div>
          <h1 className="text-lg font-bold text-slate-100 mt-1">
            StatProb Analytics Dashboard
          </h1>
        </div>

        <nav className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('soal1')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'soal1'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Soal 1: Deskriptif</span>
          </button>

          <button
            onClick={() => setActiveTab('soal2')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'soal2'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Soal 2: Probabilitas</span>
          </button>
        </nav>
      </div>
    </header>
  );
}