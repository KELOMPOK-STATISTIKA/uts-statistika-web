import { useState, useRef } from 'react';
import { Upload, Play, RotateCcw, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { parseManualInput, parseCSVContent } from '../utils/csvParser';

export default function InputSection({ onProcessData }) {
  const [rawInput, setRawInput] = useState('');
  const [fileName, setFileName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
      setErrorMsg('Harap unggah file dengan format .csv');
      return;
    }

    setErrorMsg('');
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      const parsed = parseCSVContent(text);
      if (parsed.length === 0) {
        setErrorMsg('File CSV tidak mengandung data numerik yang valid.');
      } else {
        setRawInput(parsed.join(', '));
      }
    };
    reader.readAsText(file);
  };

  const handleCalculate = () => {
    const numbers = parseManualInput(rawInput);
    if (numbers.length < 2) {
      setErrorMsg('Masukkan minimal 2 angka valid untuk dihitung.');
      return;
    }
    setErrorMsg('');
    onProcessData(numbers);
  };

  const handleLoadSample = async () => {
    try {
      const response = await fetch('/sample-data.csv');
      const text = await response.text();
      const parsed = parseCSVContent(text);
      setRawInput(parsed.join(', '));
      setFileName('sample-data.csv');
      setErrorMsg('');
    } catch {
      const fallback = [72, 75, 78, 80, 80, 82, 84, 85, 86, 88, 90, 92, 95, 148];
      setRawInput(fallback.join(', '));
      setFileName('Data Contoh Bawaan');
      setErrorMsg('');
    }
  };

  const handleReset = () => {
    setRawInput('');
    setFileName('');
    setErrorMsg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    onProcessData([]);
  };

  return (
    <section className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-100">Input Data Numerik</h2>
          <p className="text-xs text-slate-400">
            Masukkan angka secara manual (pisahkan dengan koma/spasi) atau unggah file CSV.
          </p>
        </div>
        <button
          type="button"
          onClick={handleLoadSample}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 rounded-lg transition self-start"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          Muat Contoh CSV
        </button>
      </div>

      <textarea
        rows={3}
        value={rawInput}
        onChange={(e) => setRawInput(e.target.value)}
        placeholder="Contoh: 75, 80, 82, 85, 90, 95, 140..."
        className="w-full p-3.5 bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl text-sm text-slate-100 placeholder-slate-600 font-mono"
      />

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition">
            <Upload className="w-4 h-4 text-emerald-400" />
            <span>Pilih File CSV</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          {fileName && (
            <span className="text-xs text-slate-400 truncate max-w-[180px]">
              File: <strong className="text-slate-200">{fileName}</strong>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-xl transition"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            type="button"
            onClick={handleCalculate}
            className="inline-flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-950/50 transition"
          >
            <Play className="w-4 h-4 fill-current" />
            Proses / Hitung
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="mt-3 flex items-center gap-2 text-xs text-rose-400 bg-rose-950/40 border border-rose-900/60 px-3 py-2 rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </section>
  );
}