export default function DescriptiveResults({ data }) {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
      <h2 className="text-lg font-semibold text-emerald-400">Hasil Statistik Deskriptif (14 Metrik)</h2>
      <p className="text-sm text-slate-400 mt-1">
        Area kerja Wahyu Hidayat. Data diterima: {data.length} item.
      </p>
    </div>
  );
}