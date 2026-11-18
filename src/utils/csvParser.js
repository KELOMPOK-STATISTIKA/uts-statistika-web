/**
 * Mengubah string input manual (dipisah koma, spasi, titik koma, atau enter)
 * menjadi array angka murni.
 */
export function parseManualInput(rawText) {
  if (!rawText || typeof rawText !== 'string') return [];
  return rawText
    .split(/[\s,;]+/)
    .map((item) => item.trim())
    .filter((item) => item !== '')
    .map((item) => Number(item))
    .filter((num) => !Number.isNaN(num));
}

/**
 * Membaca isi teks file CSV dan mengubahnya menjadi array angka.
 * Otomatis mengabaikan baris header teks (seperti "nilai", "data", dll).
 */
export function parseCSVContent(csvText) {
  if (!csvText || typeof csvText !== 'string') return [];
  const lines = csvText.split(/\r?\n/);
  const numbers = [];
  
  for (const line of lines) {
    const cells = line.split(/[,;]/);
    for (const cell of cells) {
      const cleaned = cell.trim().replace(/^["']|["']$/g, '');
      if (cleaned !== '' && !Number.isNaN(Number(cleaned))) {
        numbers.push(Number(cleaned));
      }
    }
  }
  return numbers;
}