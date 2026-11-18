import { useState, useMemo } from 'react';
import { Calculator, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { calculateDescriptiveStats } from '../utils/descriptiveMath';

export default function DescriptiveResults({ data }) {
  const [isSample, setIsSample] = useState(true);

  const stats = useMemo(
    () => calculateDescriptiveStats(data, isSample),
    [data, isSample]
  );

  if (!stats) return null;

  const formatNum = (num) => {
    if (typeof num !== 'number' || Number.isNaN(num)) return '-';
    return Number.isInteger(num) ? num.toString() : num.toFixed(4).replace(/\.?0+$/, '');
  };

  const rows = [
    { no: 1, label: 'Jumlah Data (n)', value: formatNum(stats.n) },
    { no: 2, label: 'Total Nilai (Σx)', value: formatNum(stats.sum) },
    { no: 3, label: 'Mean (Rata-rata)', value: formatNum(stats.mean) },
    { no: 4, label: 'Median (Nilai Tengah)', value: formatNum(stats.median) },
    { no: 5, label: 'Modus', value: stats.modeText },
    { no: 6, label: 'Nilai Minimum', value: formatNum(stats.min) },
    { no: 7, label: 'Nilai Maksimum', value: formatNum(stats.max) },
    { no: 8, label: 'Range (Jangkauan)', value: formatNum(stats.range) },
    { 
      no: 9, 
      label: `Varians (${isSample ? 'Sampel / n-1' : 'Populasi / N'})`, 
      value: formatNum(stats.variance) 
    },
    { 
      no: 10, 
      label: `Standar Deviasi (${isSample ? 'Sampel / s' : 'Populasi / σ'})`, 
      value: formatNum(stats.stdDev) 
    },
    { no: 11, label: 'Kuartil 1 (Q1)', value: formatNum(stats.q1) },
    { no: 12, label: 'Kuartil 3 (Q3)', value: formatNum(stats.q3) },
    { no: 13, label: 'Interquartile Range (IQR)', value: formatNum(stats.iqr) },
    { 
      no: 14, 
      label: 'Deteksi Outlier', 
      value: stats.outliers.length > 0 
        ? `${stats.outliers.length} Outlier (${stats.outliers.join(', ')})` 
        : 'Tidak ada outlier',
      isOutlierRow: true,
    },
  ];

  return (
    <section className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg">
      {/* Header & Toggle Sampel/Populasi */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-emerald-400" />
          <div>
            <h2 className="text-lg font-bold text-slate-100">
              Hasil Perhitungan Statistik Deskriptif
            </h2>
            <p className="text-xs text-slate-400">
              Ringkasan otomatis 14 ukuran statistik utama dalam satu tampilan.
            </p>
          </div>
        </div>
        <div className="inline-flex bg-slate-950 p-1 rounded-xl border border-slate-800 self-start">
          <button
            type="button"
            onClick={() => setIsSample(true)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
              isSample
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sampel (n - 1)
          </button>
          <button
            type="button"
            onClick={() => setIsSample(false)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
              !isSample
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Populasi (N)
          </button>
        </div>
      </div>

      {/* Tabel 14 Ukuran Statistik */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
              <th className="py-3 px-4 w-16">No.</th>
              <th className="py-3 px-4">Ukuran Statistik</th>
              <th className="py-3 px-4 text-right">Hasil Perhitungan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-sm">
            {rows.map((row) => (
              <tr key={row.no} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-4 text-slate-500 font-mono">{row.no}</td>
                <td className="py-3 px-4 font-medium text-slate-200">
                  {row.label}
                </td>
                <td className="py-3 px-4 text-right font-mono font-semibold text-emerald-400">
                  {row.isOutlierRow ? (
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs ${
                        stats.outliers.length > 0
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {stats.outliers.length > 0 ? (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      )}
                      {row.value}
                    </span>
                  ) : (
                    row.value
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info Batas Pagar Outlier */}
      <div className="mt-4 p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
        <span>
          Batas Normal (Aturan IQR):{' '}
          <strong className="text-slate-200 font-mono">
            [{formatNum(stats.lowerFence)} s/d {formatNum(stats.upperFence)}]
          </strong>
        </span>
        <span>
          Data Terurut:{' '}
          <strong className="text-slate-300 font-mono">
            {stats.sorted.slice(0, 12).join(', ')}
            {stats.sorted.length > 12 ? ', ...' : ''}
          </strong>
        </span>
      </div>
    </section>
  );
}