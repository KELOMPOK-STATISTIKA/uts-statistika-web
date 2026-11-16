# Pembagian Tugas & Arsitektur Proyek UTS Statistika

**Informasi Akademik:**
* **Universitas:** Universitas Perjuangan Tasikmalaya (UNPER)
* **Program Studi:** Teknik Informatika (Semester 3)
* **Mata Kuliah:** Statistika
* **Dosen Pengampu:** Teuku Mufizar, M.Kom
* **Tech Stack:** React JS, Vite, Tailwind CSS v3, Recharts, Lucide React

---

## 1. Daftar Anggota & Pembagian Modul (Per File)

Untuk mencegah terjadinya *merge conflict* di Git, setiap anggota memiliki tanggung jawab penuh terhadap file tertentu dan **dilarang mengubah file milik anggota lain** tanpa koordinasi dengan Lead Integrator.

| No | Nama Anggota | Peran / Modul | File Tanggung Jawab | Target & Spesifikasi Fitur |
| :-: | :--- | :--- | :--- | :--- |
| **1** | **Rayival Dede Saputra** | **Lead Integrator, Core App & Input Data** | • `src/App.jsx`<br>• `src/components/Navbar.jsx`<br>• `src/components/InputSection.jsx`<br>• `src/utils/csvParser.js`<br>• `public/sample-data.csv`<br>• `docs/pembagian-tugas.md` | • Setup repository GitHub, struktur folder, & konfigurasi Tailwind CSS v3.<br>• Fitur input data numerik manual & upload file `.csv` (Soal 1).<br>• Tombol **Proses/Hitung**, **Reset**, validasi data angka, dan tombol **Muat Contoh Data**.<br>• Menggabungkan seluruh komponen ke `App.jsx` & *deployment* aplikasi. |
| **2** | **Wahyu Hidayat** | **Soal 1: Engine & Output Statistik Deskriptif** | • `src/utils/descriptiveMath.js`<br>• `src/components/DescriptiveResults.jsx` | • Menghitung 14 ukuran statistik wajib secara otomatis dalam 1 tampilan:<br>  1. Jumlah data ($n$)<br>  2. Total nilai ($\sum x$)<br>  3. Mean (rata-rata)<br>  4. Median<br>  5. Modus<br>  6. Nilai minimum<br>  7. Nilai maksimum<br>  8. Range (jangkauan)<br>  9. Varians<br>  10. Standar deviasi<br>  11. Kuartil 1 ($Q_1$)<br>  12. Kuartil 3 ($Q_3$)<br>  13. Interquartile Range ($IQR = Q_3 - Q_1$)<br>  14. Deteksi Outlier otomatis (batas bawah $Q_1 - 1.5 \times IQR$ dan batas atas $Q_3 + 1.5 \times IQR$). |
| **3** | **Wawan Kurniawan** | **Soal 1: Visualisasi Data Statistik** | • `src/components/DataChart.jsx` | • Menampilkan visualisasi distribusi data menggunakan library `recharts`.<br>• Membuat **Histogram / Diagram Batang Distribusi Frekuensi** otomatis (menghitung jumlah kelas dengan aturan Sturges $k = 1 + 3.322 \log_{10}(n)$ dan lebar interval kelas).<br>• Responsif di layar desktop maupun mobile. |
| **4** | **Yafiq Dhiyauddin Robbani** | **Soal 2A: Kalkulator Probabilitas Dasar** | • `src/utils/basicProbMath.js`<br>• `src/components/BasicProbability.jsx` | • Input nilai $P(A)$ dan $P(B)$ (validasi rentang $0 \le P \le 1$).<br>• Pilihan tipe hubungan kejadian: **Saling Lepas**, **Independen**, atau **Umum**.<br>• Menghitung $P(A)$, komplemen $P(A')$ & $P(B')$, irisan $P(A \cap B)$, dan gabungan $P(A \cup B)$.<br>• Menyediakan tombol **Muat Contoh Kasus Soal** ($P(A)=0,3$, $P(B)=0,4$, saling lepas $\rightarrow$ hasil $0,7$). |
| **5** | **Dafa** | **Soal 2B: Probabilitas Bersyarat & Teorema Bayes** | • `src/utils/bayesMath.js`<br>• `src/components/BayesProbability.jsx` | • Menghitung **Probabilitas Bersyarat** $P(A|B)$ dan **Teorema Bayes**.<br>• Menampilkan **interpretasi hasil probabilitas** secara otomatis dalam kalimat yang mudah dipahami.<br>• Menyediakan tombol **Muat Contoh Kasus Filter Phishing** (Prevalensi $= 8\%$, Sensitivitas $= 92\%$, False Positive $= 3\%$) untuk menghitung $P(\text{Ditandai})$ dan $P(\text{Phishing} \mid \text{Ditandai})$. |

---

## 2. Kontrak Data (Props Interface)

Agar seluruh komponen dapat langsung terhubung di `src/App.jsx`, format `props` yang disepakati adalah sebagai berikut:

1. **Komponen Wahyu (`DescriptiveResults.jsx`)**
   * Menerima prop `data` berupa array angka (`number[]`).
   * Contoh: `<DescriptiveResults data={[75, 80, 82, 85, 90, 150]} />`
2. **Komponen Wawan (`DataChart.jsx`)**
   * Menerima prop `data` berupa array angka (`number[]`).
   * Contoh: `<DataChart data={[75, 80, 82, 85, 90, 150]} />`
3. **Komponen Yafiq (`BasicProbability.jsx`) & Dafa (`BayesProbability.jsx`)**
   * Bersifat mandiri (*self-contained state*) sehingga tidak memerlukan `props` dari `App.jsx`.

---

## 3. Aturan Alur Kerja Git (Workflow)

1. **Clone Repository:**
   ```bash
   git clone https://github.com/KELOMPOK-STATISTIKA/statistika-uts-web.git
   cd statistika-uts-web
   npm install
   ```
2. **Buat Branch Pribadi (Wajib):**
   * Wahyu: `git checkout -b feat/descriptive-stats`
   * Wawan: `git checkout -b feat/data-chart`
   * Yafiq: `git checkout -b feat/basic-probability`
   * Dafa: `git checkout -b feat/bayes-probability`
3. **Commit & Push ke Branch Masing-Masing:**
   ```bash
   git add <file-milik-sendiri>
   git commit -m "feat: deskripsi singkat fitur"
   git push origin <nama-branch-sendiri>
   ```
4. **Pull Request (PR):**
   * Setelah fitur selesai dan diuji tanpa error, buat **Pull Request** ke branch `main` di GitHub untuk direview dan di-merge oleh Lead Integrator.