# NOCAP.AI - See Beyond the Likes

![Alt text](logo-dark.webp "Logo NOCAP.AI")

NOCAP.AI adalah sebuah platform berbasis web yang memanfaatkan kecerdasan buatan (AI) untuk menganalisis konten media sosial. Aplikasi ini membantu pengguna mendapatkan wawasan mendalam dari foto dan caption, memprediksi engagement, dan memberikan rekomendasi untuk meningkatkan performa konten.

**Live Demo:** https://nocap-ai.vercel.app

---

## ✨ Fitur Utama

- **Dual Core Engine**:
  - **AI Copywriter**: Menghasilkan caption yang menarik secara instan berdasarkan analisis psikologis untuk memicu interaksi maksimal.
  - **Predictive Analytics**: Memprediksi jangkauan (reach) dan skor viralitas konten sebelum dipublikasikan.
- **Analisis Media**: Unggah gambar (JPG/PNG) dan biarkan AI membedah setiap piksel, mendeteksi objek, dan menganalisis sentimen.
- **Hasil yang Dapat Diimplementasikan**: Dapatkan draf caption, rekomendasi hashtag, dan prediksi skor viralitas yang siap digunakan.
- **Autentikasi Pengguna**: Sistem login untuk mengakses halaman analisis (dashboard).
- **Desain Responsif**: Tampilan yang optimal di perangkat desktop maupun mobile.
- **Latar Belakang Interaktif**: Efek partikel dinamis untuk pengalaman visual yang menarik.

---

## 🚀 Teknologi yang Digunakan

- **Framework**: Next.js 14 (dengan App Router)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Geist Sans & Geist Mono
- **Ikon**: Lucide React
- **Animasi**: Canvas API kustom untuk efek partikel.
- **Manajemen State Sederhana**: React Hooks (`useState`, `useEffect`)
- **Autentikasi**: Berbasis Cookie dengan js-cookie
- **API Mocking (Development)**: MSW (Mock Service Worker) untuk simulasi API.

---

## 🛠️ Menjalankan Proyek Secara Lokal

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan pengembangan lokal Anda.

### Prasyarat

Pastikan Anda telah menginstal:
- Node.js (v18.x atau lebih baru)
- pnpm (atau npm/yarn)

### Instalasi

1.  **Clone repositori:**
    ```bash
    git clone https://github.com/imphen/imphen.git
    cd imphen
    ```

2.  **Instal dependensi:**
    ```bash
    pnpm install
    ```

### Menjalankan Server Pengembangan

Untuk memulai server pengembangan, jalankan perintah berikut:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
