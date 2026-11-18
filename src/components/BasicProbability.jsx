import { useState, useMemo } from 'react';
import { Percent, Sparkles, AlertCircle, Info, Calculator } from 'lucide-react';
import { calculateBasicProbability } from '../utils/basicProbMath';

export default function BasicProbability() {
  const [pAInput, setPAInput] = useState('0.3');
  const [pBInput, setPBInput] = useState('0.4');
  const [relationType, setRelationType] = useState('mutually_exclusive');
  const [customInterInput, setCustomInterInput] = useState('0.1');

  const result = useMemo(() => {
    const pA = parseFloat(pAInput);
    const pB = parseFloat(pBInput);
    const customInter = parseFloat(customInterInput);
    return calculateBasicProbability(pA, pB, relationType, customInter);
  }, [pAInput, pBInput, relationType, customInterInput]);

  const handleLoadCaseExample = () => {
    setPAInput('0.3');
    setPBInput('0.4');
    setRelationType('mutually_exclusive');
  };

  const fmt = (val) => Number(val.toFixed(4)).toString();

  return (
    <section className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
          <div className="flex items-center gap-2">
            <Percent className="w-5 h-5 text-emerald-400"/>
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                Soal 2A: Probabilitas Dasar
              </h2>
              <p className="text-xs text-slate-400">
                Komplemen, Gabungan, Irisan, Saling Lepas & Independen
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLoadCaseExample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition self-start"
          >
            <Sparkles className="w-3.5 h-3.5"/>
            Contoh Kasus Soal
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Probabilitas P(A)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={pAInput}
                onChange={(e) => setPAInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl text-sm text-slate-100 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Probabilitas P(B)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={pBInput}
                onChange={(e) => setPBInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl text-sm text-slate-100 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Hubungan Kejadian A dan B
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'mutually_exclusive', label: 'Saling Lepas' },
                { id: 'independent', label: 'Independen' },
                { id: 'general', label: 'Umum (Input Irisan)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setRelationType(opt.id)}
                  className={`px-3 py-2 text-xs font-medium rounded-xl border transition ${
                    relationType === opt.id
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {relationType === 'general' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Probabilitas Irisan P(A ∩ B)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={customInterInput}
                onChange={(e) => setCustomInterInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl text-sm text-slate-100 font-mono"
              />
            </div>
          )}
        </div>

        {result.error ? (
          <div className="mt-5 flex items-center gap-2 text-xs text-rose-400 bg-rose-950/40 border border-rose-900/60 p-3 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0"/>
            <span>{result.error}</span>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-300 font-medium">
                  Probabilitas Gabungan P(A ∪ B)
                </p>
                <p className="text-[11px] text-slate-400">
                  Probabilitas kejadian A atau B terjadi
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  {fmt(result.union)}
                </span>
                <span className="block text-xs text-slate-400 font-mono">
                  ({(result.union * 100).toFixed(2)}%)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-slate-400 block">Kejadian P(A)</span>
                <span className="text-sm font-mono font-semibold text-slate-100">
                  {fmt(result.pA)} ({(result.pA * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-slate-400 block">Kejadian P(B)</span>
                <span className="text-sm font-mono font-semibold text-slate-100">
                  {fmt(result.pB)} ({(result.pB * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-slate-400 block">Komplemen P(A')</span>
                <span className="text-sm font-mono font-semibold text-sky-400">
                  {fmt(result.compA)} ({(result.compA * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-slate-400 block">Komplemen P(B')</span>
                <span className="text-sm font-mono font-semibold text-sky-400">
                  {fmt(result.compB)} ({(result.compB * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="col-span-2 p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                <span className="text-slate-400">Probabilitas Irisan P(A ∩ B)</span>
                <span className="text-sm font-mono font-semibold text-amber-400">
                  {fmt(result.intersection)} ({(result.intersection * 100).toFixed(2)}%)
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                <Calculator className="w-3.5 h-3.5 text-emerald-400"/>
                <span>Langkah-Langkah Perhitungan Sistematis</span>
              </div>
              <ul className="space-y-1 font-mono text-[11px] text-slate-400">
                {result.stepDetails.map((step, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-emerald-500">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <span className="text-[11px] font-medium text-slate-400 mb-2">
                Ilustrasi Diagram Venn (Himpunan A & B)
              </span>
              <svg viewBox="0 0 200 110" className="w-48 h-28">
                <rect x="2" y="2" width="196" height="106" fill="none" stroke="#334155" rx="8" strokeDasharray="4" />
                <text x="8" y="14" fill="#64748b" fontSize="9" fontFamily="monospace">S</text>
                
                {relationType === 'mutually_exclusive' ? (
                  <>
                    <circle cx="60" cy="55" r="32" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
                    <text x="55" y="58" fill="#10b981" fontSize="10" fontWeight="bold">A</text>
                    
                    <circle cx="140" cy="55" r="32" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="1.5" />
                    <text x="135" y="58" fill="#3b82f6" fontSize="10" fontWeight="bold">B</text>
                  </>
                ) : (
                  <>
                    <circle cx="75" cy="55" r="36" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
                    <text x="55" y="58" fill="#10b981" fontSize="10" fontWeight="bold">A</text>
                    
                    <circle cx="125" cy="55" r="36" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="1.5" />
                    <text x="135" y="58" fill="#3b82f6" fontSize="10" fontWeight="bold">B</text>
                  </>
                )}
              </svg>
              <span className="text-[10px] text-slate-500 mt-1">
                {relationType === 'mutually_exclusive' ? 'Himpunan terpisah (Saling Lepas)' : 'Himpunan saling beririsan'}
              </span>
            </div>
          </div>
        )}
      </div>

      {!result.error && (
        <div className="mt-4 p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start gap-2 text-xs text-slate-400">
          <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"/>
          <div>
            <strong className="text-slate-200 block">{result.relationLabel}</strong>
            <span>{result.formulaNote}</span>
          </div>
        </div>
      )}
    </section>
  );
}