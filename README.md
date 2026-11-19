# StatProb — Aplikasi Komputasi Statistika Deskriptif & Probabilitas

Aplikasi web interaktif untuk pengolahan data statistik deskriptif, visualisasi distribusi frekuensi, serta perhitungan probabilitas dasar, probabilitas bersyarat, dan inferensi Teorema Bayes.

Dibangun sebagai proyek **Ujian Tengah Semester (UTS)** Mata Kuliah **Statistika** (Semester 3, Tahun Akademik 2026/2027) — Program Studi **Teknik Informatika (Kelas B)**, Fakultas Teknik, **Universitas Perjuangan Tasikmalaya**.

- **Dosen Pengampu:** Teuku Mufizar, S.Kom., M.Kom.
- **Repository GitHub:** [KELOMPOK-STATISTIKA/uts-statistika-web](https://github.com/KELOMPOK-STATISTIKA/uts-statistika-web)
- **Portal Kelas:** [Informatika Kelas B](https://ti-b.vercel.app/)

---

## Fitur Utama

### 1. Modul 01 — Statistik Deskriptif & Visualisasi Data (Soal 1)
- **Input Data Fleksibel:** Mendukung input angka secara manual (dipisahkan koma, spasi, titik koma, atau baris baru) maupun unggah berkas `.csv`, dilengkapi tombol muat contoh dataset dan reset.
- **14 Ukuran Statistik Otomatis:** Menghitung secara langsung dalam satu tampilan tabel terpadu:
  1. Jumlah data ($n$)
  2. Total nilai ($\sum x$)
  3. Mean (rata-rata)
  4. Median (nilai tengah)
  5. Modus (tunggal, multimodal, atau tanpa modus)
  6. Nilai minimum
  7. Nilai maksimum
  8. Range (jangkauan)
  9. Varians — mendukung mode **Sampel ($n - 1$)** dan **Populasi ($N$)**
  10. Standar deviasi — mendukung mode **Sampel ($s$)** dan **Populasi ($\sigma$)**
  11. Kuartil 1 ($Q_1$)
  12. Kuartil 3 ($Q_3$)
  13. Interquartile Range ($IQR = Q_3 - Q_1$)
  14. Deteksi outlier otomatis berbasis pagar Tukey ($< Q_1 - 1.5 \times IQR$ atau $> Q_3 + 1.5 \times IQR$)
- **Visualisasi Histogram:** Grafik batang distribusi frekuensi otomatis dengan pengelompokan kelas interval menggunakan aturan Sturges:
  $$k = 1 + 3.322 \log_{10}(n)$$

### 2. Modul 02A — Kalkulator Probabilitas Dasar (Soal 2A)
- Menghitung probabilitas kejadian $P(A)$ dan $P(B)$, komplemen $P(A')$ dan $P(B')$, irisan $P(A \cap B)$, serta gabungan $P(A \cup B)$.
- Mendukung tiga jenis hubungan kejadian:
  - **Saling Lepas:** $P(A \cap B) = 0$
  - **Independen:** $P(A \cap B) = P(A) \times P(B)$
  - **Umum:** Input irisan manual dengan rumus $P(A \cup B) = P(A) + P(B) - P(A \cap B)$
- Dilengkapi langkah-langkah perhitungan sistematis, ilustrasi Diagram Venn dinamis, serta tombol preset contoh kasus soal.

### 3. Modul 02B — Probabilitas Bersyarat & Teorema Bayes (Soal 2B)
- **Mode Teorema Bayes:** Menghitung probabilitas total bukti $P(E)$ dan probabilitas posterior $P(H \mid E)$ berdasarkan prevalensi $P(H)$, sensitivitas $P(E \mid H)$, dan *false positive* $P(E \mid H')$:
  $$P(H \mid E) = \frac{P(E \mid H) \cdot P(H)}{P(E \mid H) \cdot P(H) + P(E \mid H') \cdot P(H')}$$
- **Mode Probabilitas Bersyarat:** Menghitung $P(A \mid B) = \frac{P(A \cap B)}{P(B)}$ dengan validasi matematis.
- Dilengkapi generator **interpretasi hasil probabilitas otomatis** serta tombol preset **Kasus Filter Phishing**.

---

## Verifikasi Kasus Uji Soal UTS

| Modul | Skenario Uji | Input | Output Aplikasi | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Soal 2A** | Kejadian Saling Lepas | $P(A) = 0.3$; $P(B) = 0.4$ | $P(A \cup B) = \mathbf{0.7000}$ ($70\%$) | Sesuai |
| **Soal 2B** | Probabilitas Ditandai Sistem | Prevalensi $8\%$, Sensitivitas $92\%$, FP $3\%$ | $P(E) = \mathbf{0.1012}$ ($10.12\%$) | Sesuai |
| **Soal 2B** | Posterior Phishing jika Ditandai | Prevalensi $8\%$, Sensitivitas $92\%$, FP $3\%$ | $P(\text{Phishing} \mid \text{Ditandai}) = \mathbf{0.7273}$ ($72.73\%$) | Sesuai |

---

## Teknologi yang Digunakan

- **Frontend Framework:** React + Vite
- **Styling:** Tailwind CSS
- **Visualisasi Grafik:** Recharts
- **Ikon Antarmuka:** Lucide React
- **Deployment:** Vercel

---

## Struktur Proyek

```text
uts-statistika-web/
├── public/
│   └── sample-data.csv                 # Dataset contoh (termasuk nilai outlier)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                  # Navigasi floating pill responsif
│   │   ├── InputSection.jsx            # Form input manual & unggah file CSV
│   │   ├── DescriptiveResults.jsx      # Tabel 14 ukuran statistik deskriptif
│   │   ├── DataChart.jsx               # Visualisasi histogram distribusi frekuensi
│   │   ├── BasicProbability.jsx        # Kalkulator Soal 2A & Diagram Venn
│   │   └── BayesProbability.jsx        # Kalkulator Soal 2B & interpretasi Bayes
│   ├── utils/
│   │   ├── csvParser.js                # Utilitas parsing input teks & CSV
│   │   ├── descriptiveMath.js          # Algoritma 14 ukuran statistik & outlier
│   │   ├── basicProbMath.js            # Rumus probabilitas dasar & validasi
│   │   └── bayesMath.js                # Rumus bersyarat, Bayes & generator interpretasi
│   ├── App.jsx                         # Layout utama & footer informasi kelompok
│   ├── index.css                       # Konfigurasi Tailwind CSS & tipografi
│   └── main.jsx                        # Entry point aplikasi React
├── index.html
├── package.json
└── README.md
```

---

## Cara Menjalankan di Lokal

1. **Clone repository:**
   ```bash
   git clone https://github.com/KELOMPOK-STATISTIKA/uts-statistika-web.git
   cd uts-statistika-web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:5173` pada browser.

4. **Build untuk produksi:**
   ```bash
   npm run build
   ```

---

## Tim Pengembang — Kelompok 4 (Kelas B)

| No. | Nama Mahasiswa | NIM | Peran & Modul Tanggung Jawab |
| :-: | :--- | :---: | :--- |
| 1 | **Rayival Dede Saputra** | `2503010032` | Project Manager, Integrasi Sistem, UI/UX (`App.jsx`, `Navbar.jsx`) |
| 2 | **Wahyu Hidayat** | `2503010030` | Modul Statistik Deskriptif 14 Metrik (`descriptiveMath.js`, `DescriptiveResults.jsx`) |
| 3 | **Yafiq Dhiyauddin** | `2503010026` | Modul Probabilitas Dasar Soal 2A (`basicProbMath.js`, `BasicProbability.jsx`) |
| 4 | **Daffa Fauzan Nugraha** | `2503010041` | Modul Probabilitas Bersyarat & Bayes Soal 2B (`bayesMath.js`, `BayesProbability.jsx`) |
| 5 | **Wawan Kurniawan** | `2503010039` | Modul Input Manual/CSV & Visualisasi Grafik (`csvParser.js`, `InputSection.jsx`, `DataChart.jsx`) |