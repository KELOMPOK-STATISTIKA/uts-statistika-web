import { useState, useMemo } from 'react';
import { ShieldAlert, Sparkles, AlertCircle, MessageSquareQuote } from 'lucide-react';
import {
  calculateBayesTheorem,
  calculateConditionalProbability,
} from '../utils/bayesMath';

export default function BayesProbability() {
  const [mode, setMode] = useState('bayes'); // 'bayes' | 'conditional'

  const [priorPct, setPriorPct] = useState('8');
  const [sensitivityPct, setSensitivityPct] = useState('92');
  const [falsePosPct, setFalsePosPct] = useState('3');
  const [hypothesisName, setHypothesisName] = useState('email phishing');
  const [evidenceName, setEvidenceName] = useState('ditandai oleh sistem');

  const [pInterInput, setPInterInput] = useState('0.12');
  const [pBInput, setPBInput] = useState('0.4');

  const bayesResult = useMemo(() => {
    const prior = parseFloat(priorPct) / 100;
    const sens = parseFloat(sensitivityPct) / 100;
    const fp = parseFloat(falsePosPct) / 100;
    return calculateBayesTheorem(prior, sens, fp, hypothesisName, evidenceName);
  }, [priorPct, sensitivityPct, falsePosPct, hypothesisName, evidenceName]);

  const condResult = useMemo(() => {
    return calculateConditionalProbability(
      parseFloat(pInterInput),
      parseFloat(pBInput)
    );
  }, [pInterInput, pBInput]);

  const handleLoadPhishingCase = () => {
    setMode('bayes');
    setPriorPct('8');
    setSensitivityPct('92');
    setFalsePosPct('3');
    setHypothesisName('email phishing');
    setEvidenceName('ditandai oleh sistem');
  };

  const inputClass =
    'w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl text-sm text-slate-100 font-mono';

  return (
    <section className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                Soal 2B: Bersyarat &amp; Teorema Bayes
              </h2>
              <p className="text-xs text-slate-400">
                Probabilitas P(A|B), Inferensi Bayes &amp; Interpretasi Hasil
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLoadPhishingCase}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg transition self-start"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Kasus Filter Phishing
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 border border-slate-800 rounded-xl mb-4">
          <button
            type="button"
            onClick={() => setMode('bayes')}
            className={`py-1.5 text-xs font-medium rounded-lg transition ${
              mode === 'bayes'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Teorema Bayes
          </button>
          <button
            type="button"
            onClick={() => setMode('conditional')}
            className={`py-1.5 text-xs font-medium rounded-lg transition ${
              mode === 'conditional'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Bersyarat P(A|B)
          </button>
        </div>

        {mode === 'bayes' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Prevalensi P(H) (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={priorPct}
                  onChange={(e) => setPriorPct(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Sensitivitas P(E|H) (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={sensitivityPct}
                  onChange={(e) => setSensitivityPct(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  False Positive P(E|H&apos;) (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={falsePosPct}
                  onChange={(e) => setFalsePosPct(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Label Hipotesis (H)
                </label>
                <input
                  type="text"
                  value={hypothesisName}
                  onChange={(e) => setHypothesisName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Label Bukti (E)
                </label>
                <input
                  type="text"
                  value={evidenceName}
                  onChange={(e) => setEvidenceName(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {bayesResult.error ? (
              <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/40 border border-rose-900/60 p-3 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{bayesResult.error}</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                    <span className="text-[11px] text-slate-400 block">
                      1. Probabilitas Ditandai Sistem P(E)
                    </span>
                    <span className="text-xl font-bold font-mono text-sky-400 mt-1 block">
                      {bayesResult.totalEvidenceProb.toFixed(4)}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      ({bayesResult.evidencePct}%)
                    </span>
                  </div>
                  <div className="p-3.5 bg-emerald-950/30 border border-emerald-500/30 rounded-xl">
                    <span className="text-[11px] text-emerald-300 block">
                      2. Posterior Bayes P(Phishing | Ditandai)
                    </span>
                    <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block">
                      {bayesResult.posterior.toFixed(4)}
                    </span>
                    <span className="text-xs text-slate-300 font-mono">
                      ({bayesResult.posteriorPct}%)
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-mono space-y-1">
                  <div>
                    P(E|H) · P(H) = {bayesResult.truePositiveJoint.toFixed(4)}
                  </div>
                  <div>
                    P(E|H&apos;) · P(H&apos;) = {bayesResult.falsePositiveJoint.toFixed(4)}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <MessageSquareQuote className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-400 block mb-0.5">
                      Interpretasi Hasil Probabilitas:
                    </strong>
                    <span>{bayesResult.interpretation}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Probabilitas Irisan P(A ∩ B)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={pInterInput}
                  onChange={(e) => setPInterInput(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Probabilitas Syarat P(B)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.0001"
                  max="1"
                  value={pBInput}
                  onChange={(e) => setPBInput(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {condResult.error ? (
              <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/40 border border-rose-900/60 p-3 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{condResult.error}</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs text-emerald-300 font-medium">
                      Probabilitas Bersyarat — P(A | B)
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Rumus: P(A ∩ B) / P(B)
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold font-mono text-emerald-400">
                      {condResult.pAGivenB.toFixed(4)}
                    </span>
                    <span className="block text-xs text-slate-400 font-mono">
                      ({condResult.percentage}%)
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <MessageSquareQuote className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-400 block mb-0.5">
                      Interpretasi Hasil:
                    </strong>
                    <span>{condResult.interpretation}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}