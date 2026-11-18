/**
 * Menghitung persentil/kuartil menggunakan metode interpolasi linear (standar Excel PERCENTILE.INC)
 */
function calculateQuartile(sortedData, q) {
  const pos = (sortedData.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sortedData[base + 1] !== undefined) {
    return sortedData[base] + rest * (sortedData[base + 1] - sortedData[base]);
  }
  return sortedData[base];
}

/**
 * Menghitung 14 ukuran statistik deskriptif dari array numerik
 * @param {number[]} rawData - Array angka input
 * @param {boolean} isSample - true untuk Sampel (n-1), false untuk Populasi (n)
 */
export function calculateDescriptiveStats(rawData, isSample = true) {
  if (!rawData || rawData.length === 0) return null;

  const sorted = [...rawData].sort((a, b) => a - b);
  const n = sorted.length;

  // 1. Jumlah data (n) & 2. Total nilai (Ex)
  const sum = sorted.reduce((acc, val) => acc + val, 0);

  // 3. Mean (rata-rata)
  const mean = sum / n;

  // 4. Median
  const mid = Math.floor(n / 2);
  const median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  // 5. Modus (bisa tunggal, multimodal, atau tidak ada jika frekuensi semua sama)
  const freqMap = {};
  let maxFreq = 0;
  for (const val of sorted) {
    freqMap[val] = (freqMap[val] || 0) + 1;
    if (freqMap[val] > maxFreq) maxFreq = freqMap[val];
  }
  let modeText = 'Tidak ada modus';
  if (maxFreq > 1) {
    const modes = Object.keys(freqMap)
      .filter((key) => freqMap[key] === maxFreq)
      .map(Number);
    modeText = `${modes.join(', ')} (muncul ${maxFreq}x)`;
  }

  // 6. Min, 7. Max, 8. Range
  const min = sorted[0];
  const max = sorted[n - 1];
  const range = max - min;

  // 9. Varians & 10. Standar Deviasi
  const squaredDiffSum = sorted.reduce(
    (acc, val) => acc + Math.pow(val - mean, 2),
    0
  );
  const divisor = isSample && n > 1 ? n - 1 : n;
  const variance = squaredDiffSum / divisor;
  const stdDev = Math.sqrt(variance);

  // 11. Kuartil 1 (Q1), 12. Kuartil 3 (Q3), 13. IQR
  const q1 = calculateQuartile(sorted, 0.25);
  const q3 = calculateQuartile(sorted, 0.75);
  const iqr = q3 - q1;

  // 14. Deteksi Outlier (Aturan Tukey: < Q1 - 1.5*IQR atau > Q3 + 1.5*IQR)
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;
  const outliers = sorted.filter((val) => val < lowerFence || val > upperFence);

  return {
    n,
    sum,
    mean,
    median,
    modeText,
    min,
    max,
    range,
    variance,
    stdDev,
    q1,
    q3,
    iqr,
    lowerFence,
    upperFence,
    outliers,
    sorted,
  };
}