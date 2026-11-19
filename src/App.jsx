import { useState } from 'react';
import { FileSpreadsheet, ArrowRight, ArrowUpRight } from 'lucide-react';
import Navbar from './components/Navbar';
import InputSection from './components/InputSection';
import DescriptiveResults from './components/DescriptiveResults';
import DataChart from './components/DataChart';
import BasicProbability from './components/BasicProbability';
import BayesProbability from './components/BayesProbability';

const TEAM_MEMBERS = [
  {
    name: 'Rayival Dede Saputra',
    nim: '2503010032',
    role: 'Project Manager & Integrator',
  },
  {
    name: 'Wahyu Hidayat',
    nim: '2503010030',
    role: 'Statistik Deskriptif',
  },
  {
    name: 'Yafiq Dhiyauddin',
    nim: '2503010026',
    role: 'Probabilitas Dasar',
  },
  {
    name: 'Daffa Fauzan Nugraha',
    nim: '2503010041',
    role: 'Teorema Bayes',
  },
  {
    name: 'Wawan Kurniawan',
    nim: '2503010039',
    role: 'Input CSV & Grafik',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('soal1');
  const [numericData, setNumericData] = useState([]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'soal1' ? (
          <div>
            {/* Header Konteks Modul 01 */}
            <div className="mb-6 pb-4 border-b border-white/[0.07] flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                  Modul 01 • Soal 1
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                  Pengolahan Data Statistik Deskriptif
                </h2>
              </div>
              <p className="text-xs text-slate-400">
                14 ukuran statistik otomatis, deteksi outlier IQR, &amp; histogram distribusi frekuensi.
              </p>
            </div>

            {/* Grid Asimetris: Panel Input Sticky di Kiri, Output & Grafik di Kanan */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-20">
                <InputSection
                  onProcessData={(parsedArray) => setNumericData(parsedArray)}
                />
              </div>

              <div className="lg:col-span-7 space-y-6">
                {numericData.length > 0 ? (
                  <>
                    <DescriptiveResults data={numericData} />
                    <DataChart data={numericData} />
                  </>
                ) : (
                  <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-10 text-center">
                    <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 flex items-center justify-center mx-auto mb-3.5">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-200">
                      Belum Ada Dataset yang Diproses
                    </h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto mt-1.5 leading-relaxed">
                      Masukkan deretan angka numerik secara manual pada panel di sebelah kiri atau klik{' '}
                      <span className="font-medium text-slate-200">Muat Contoh CSV</span>{' '}
                      lalu tekan <span className="font-medium text-emerald-400">Proses / Hitung</span>.
                    </p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-full">
                      <span>Output: 14 Ukuran Statistik &amp; Histogram</span>
                      <ArrowRight className="w-3 h-3 text-emerald-400" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Header Konteks Modul 02 */}
            <div className="mb-6 pb-4 border-b border-white/[0.07] flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                  Modul 02 • Soal 2A &amp; 2B
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                  Kalkulator Probabilitas &amp; Teorema Bayes
                </h2>
              </div>
              <p className="text-xs text-slate-400">
                Probabilitas dasar (saling lepas &amp; independen), bersyarat P(A|B), &amp; inferensi Bayes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <BasicProbability />
              <BayesProbability />
            </div>
          </div>
        )}
      </main>

      {/* Editorial Multi-Column Footer */}
      <footer className="border-t border-white/[0.08] bg-slate-950 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Kolom 1: Informasi Akademik & Mata Kuliah */}
            <div className="lg:col-span-4 space-y-4">
              <div>
                <p className="text-sm font-semibold tracking-tight text-white">
                  StatProb<span className="text-emerald-400">.</span>
                </p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Aplikasi komputasi web untuk pengolahan ukuran pemusatan, penyebaran data,
                  serta analisis probabilitas dasar dan inferensi Teorema Bayes.
                </p>
              </div>

              <dl className="pt-3 border-t border-white/[0.06] space-y-2 text-xs">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Mata Kuliah</dt>
                  <dd className="text-slate-300 font-medium text-right">
                    Statistika (Semester 3)
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Kelas</dt>
                  <dd className="text-slate-300 font-medium text-right">
                    Kelas{' '}
                    <a
                      href="https://ti-b.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      title="Buka Portal Kelas TI-B"
                      className="text-emerald-400 hover:text-emerald-300 font-bold underline decoration-emerald-400/50 hover:decoration-emerald-300 underline-offset-4 px-0.5 transition-colors"
                    >
                      B
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Dosen Pengampu</dt>
                  <dd className="text-slate-300 font-medium text-right">
                    Teuku Mufizar, S.Kom., M.Kom.
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Tahun Akademik</dt>
                  <dd className="text-slate-300 font-mono text-right">2026 / 2027</dd>
                </div>
              </dl>
            </div>

            {/* Kolom 2: Daftar Anggota Kelompok 4 (Tabular List Bersih) */}
            <div className="lg:col-span-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Anggota Kelompok 4
                </h3>
                <span className="text-[11px] text-slate-500">5 Mahasiswa</span>
              </div>

              <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                {TEAM_MEMBERS.map((member) => (
                  <li
                    key={member.nim}
                    className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-slate-500 tabular-nums">
                        {member.nim}
                      </span>
                      <span className="font-medium text-slate-200">{member.name}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 sm:text-right pl-[5.25rem] sm:pl-0">
                      {member.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kolom 3: Navigasi Cepat & Tautan */}
            <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Eksplorasi
                </h3>
                <ul className="space-y-2.5 text-xs">
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('soal1');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      Statistik Deskriptif
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('soal2');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      Probabilitas &amp; Bayes
                    </button>
                  </li>
                  <li>
                    <a
                      href="https://github.com/KELOMPOK-STATISTIKA"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                      <span>GitHub Organization</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Colophon Bawah */}
          <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <p>
              Program Studi Teknik Informatika • Fakultas Teknik — Universitas Perjuangan Tasikmalaya
            </p>
            <p className="text-slate-600">
              Project Ujian Tengah Semester • Kelompok 4 • Kelas{' '}
              <a
                href="https://ti-b.vercel.app/"
                target="_blank"
                rel="noreferrer"
                title="Buka Portal Kelas TI-B"
                className="text-emerald-400/90 hover:text-emerald-300 font-semibold underline decoration-emerald-500/40 underline-offset-2 transition-colors"
              >
                B
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}