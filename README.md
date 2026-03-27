# 🚗 IMS Calculator Angsuran

**Kalkulator Angsuran IMS** adalah aplikasi web modern yang dirancang untuk membantu calon nasabah PT. Inovasi Mitra Sejati (IMS) mensimulasikan perhitungan kredit kendaraan secara transparan dan real-time.

🌍 **Live Demo:** [ims-calculator-angsuran.vercel.app](https://ims-calculator-angsuran.vercel.app/)

---

> [!NOTE]
> Project ini merupakan **Tes Teknis** untuk posisi **IT Support Developer** di **PT. INOVASI MITRA SEJATI**.

---

## 📝 Brief Proyek
Aplikasi ini mengimplementasikan logika bisnis finansial yang dinamis berdasarkan tenor (jangka waktu) pinjaman. Dengan antarmuka yang mengutamakan *user experience* dan estetika *premium*, pengguna dapat dengan mudah menyesuaikan harga OTR, Down Payment, dan Tenor untuk melihat estimasi angsuran bulanan secara instan.

### Fitur Utama:
- **Kalkulasi Akurat:** Sesuai dengan spesifikasi teknis dan flowchart bisnis IMS.
- **Interactive DP Slider:** Fleksibilitas memilih Down Payment (0-100%) dengan interval 20%.
- **Bunga Dinamis:** Penyesuaian otomatis suku bunga berdasarkan tenor yang dipilih (12%, 14%, atau 16.5%).
- **UI Premium:** Menggunakan desain *Glassmorphism* dengan dukungan animasi halus.

### Requirement Flow:
![IMS Brief Flow](/public/ims_brief.jpeg)

---

## 🛠️ Tech Stack
- **Framework:** Next.js 15+ (App Router)
- **Styling:** Tailwind CSS v4 (Glassmorphism & Custom Theme)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** TypeScript

---

## 🚀 Cara Menjalankan secara Lokal

1. **Clone project & install dependencies:**
   ```bash
   npm install
   ```

2. **Jalankan development server:**
   ```bash
   npm run dev
   ```

3. **Buka browser:**
   Akses `http://localhost:3000` untuk melihat hasilnya.

---

**Dirancang dan dikembangkan oleh Ahmad Reihan Alavi.**
