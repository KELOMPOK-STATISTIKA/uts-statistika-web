import { useState } from 'react';
import Navbar from './components/Navbar';
import InputSection from './components/InputSection';
import DescriptiveResults from './components/DescriptiveResults';
import DataChart from './components/DataChart';
import BasicProbability from './components/BasicProbability';
import BayesProbability from './components/BayesProbability';

export default function App() {
  const [activeTab, setActiveTab] = useState('soal1');
  const [numericData, setNumericData] = useState([]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {activeTab === 'soal1' ? (
          <div className="space-y-6">
            <InputSection onProcessData={(parsedArray) => setNumericData(parsedArray)} />

            {numericData.length > 0 ? (
              <div className="space-y-6">
                <DescriptiveResults data={numericData} />
                <DataChart data={numericData} />
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl text-slate-500 text-sm">
                Masukkan data numerik atau unggah file CSV untuk melihat hasil analisis dan grafik.
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BasicProbability />
            <BayesProbability />
          </div>
        )}
      </main>

      <footer className="border-t border-slate-900 py-4 text-center text-xs text-slate-500">
        Kelompok UTS Statistika (Rayival, Wawan, Wahyu, Yafiq, Dafa) — Universitas Perjuangan Tasikmalaya
      </footer>
    </div>
  );
}