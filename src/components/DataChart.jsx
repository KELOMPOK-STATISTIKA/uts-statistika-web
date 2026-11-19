import { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { BarChart2 } from 'lucide-react';

export default function DataChart({ data }) {
  const histogramData = useMemo(() => {
    if (!data || data.length === 0) return [];
    const sorted = [...data].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];

    if (min === max) {
      return [{ range: `${min}`, frekuensi: sorted.length }];
    }

    const n = sorted.length;
    const k = Math.max(3, Math.min(10, Math.round(1 + 3.322 * Math.log10(n))));
    const binWidth = (max - min) / k;

    const bins = Array.from({ length: k }, (_, i) => {
      const start = min + i * binWidth;
      const end = i === k - 1 ? max : min + (i + 1) * binWidth;
      return {
        start,
        end,
        range: `${start.toFixed(1)} - ${end.toFixed(1)}`,
        frekuensi: 0,
      };
    });

    for (const val of sorted) {
      let idx = Math.floor((val - min) / binWidth);
      if (idx >= k) idx = k - 1;
      bins[idx].frekuensi += 1;
    }

    return bins;
  }, [data]);

  return (
    <section className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg">
      <div className="flex items-center gap-2 mb-1">
        <BarChart2 className="w-5 h-5 text-emerald-400" />
        <h2 className="text-lg font-bold text-slate-100">
          Visualisasi Data Histogram Distribusi Frekuensi
        </h2>
      </div>
      <p className="text-xs text-slate-400 mb-6">
        Pengelompokan kelas interval otomatis berdasarkan {data?.length || 0} data numerik yang diproses.
      </p>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={histogramData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="range"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={{ stroke: '#334155' }}
              tickLine={false}
              label={{
                value: 'Interval Kelas Nilai',
                position: 'insideBottom',
                offset: -12,
                fill: '#64748b',
                fontSize: 12,
              }}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={{ stroke: '#334155' }}
              tickLine={false}
              label={{
                value: 'Frekuensi',
                angle: -90,
                position: 'insideLeft',
                fill: '#64748b',
                fontSize: 12,
              }}
            />
            <Tooltip
              cursor={{ fill: '#1e293b', opacity: 0.4 }}
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#f1f5f9',
                fontSize: '12px',
              }}
            />
            <Bar
              dataKey="frekuensi"
              name="Jumlah Data (Frekuensi)"
              fill="#1d4ed8"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}