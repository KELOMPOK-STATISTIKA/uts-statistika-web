export default function DataChart({ data }) {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
      <h2 className="text-lg font-semibold text-emerald-400">Visualisasi Data (Histogram / Distribusi)</h2>
      <p className="text-sm text-slate-400 mt-1">
        Area kerja Wawan Kurniawan. Siap memvisualisasikan {data.length} data.
      </p>
    </div>
  );
}