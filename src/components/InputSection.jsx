export default function InputSection({ onProcessData }) {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
      <h2 className="text-lg font-semibold text-emerald-400">Input Data Numerik & CSV</h2>
      <p className="text-sm text-slate-400 mt-1">Area kerja Wawan Kurniawan (Input Manual & Upload CSV).</p>
      <button
        onClick={() => onProcessData([70, 75, 80, 80, 85, 90, 145])}
        className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition"
      >
        Simulasi Kirim Data Contoh
      </button>
    </div>
  );
}