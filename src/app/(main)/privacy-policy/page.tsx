"use client";
import React from 'react';

/**
 * Komponen untuk menampilkan halaman Kebijakan Privasi.
 * PENTING: Ini adalah template. Anda harus berkonsultasi dengan ahli hukum
 * untuk memastikan kontennya sesuai dengan kebutuhan bisnis dan hukum Anda.
 */
const PrivacyPolicy: React.FC = () => {
  const websiteName = 'NOCAP.AI';
  const websiteUrl = 'https://nocap-ai.vercel.app'; // Ganti dengan URL domain Anda

  return (
    <div className="min-h-screen bg-[#06060A] text-gray-300 font-sans">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white border-b-2 border-cyan-400/30 pb-4 mb-8">
          Kebijakan Privasi
        </h1>
        <p className="text-gray-500 mb-12">
          Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <p className="mb-8">
          Selamat datang di {websiteName}. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat Anda mengunjungi situs web kami di {websiteUrl} ("Layanan").
        </p>

        <div className="space-y-10 text-gray-400 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">1. Informasi yang Kami Kumpulkan</h2>
            <p>
              Kami dapat mengumpulkan informasi pribadi yang Anda berikan secara sukarela, seperti nama dan alamat email saat Anda mendaftar atau menghubungi kami. Kami juga dapat mengumpulkan informasi non-pribadi secara otomatis, seperti alamat IP, jenis browser, dan data penggunaan saat Anda berinteraksi dengan Layanan kami.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">2. Bagaimana Kami Menggunakan Informasi Anda</h2>
            <p>
              Informasi yang kami kumpulkan digunakan untuk:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Menyediakan, mengoperasikan, dan memelihara Layanan kami.</li>
              <li>Meningkatkan, mempersonalisasi, dan memperluas Layanan kami.</li>
              <li>Memahami dan menganalisis bagaimana Anda menggunakan Layanan kami.</li>
              <li>Mengembangkan produk, layanan, fitur, dan fungsionalitas baru.</li>
              <li>Berkomunikasi dengan Anda, baik secara langsung atau melalui salah satu mitra kami, termasuk untuk layanan pelanggan, untuk memberi Anda pembaruan dan informasi lain yang berkaitan dengan Layanan.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">3. Keamanan Data</h2>
            <p>
              Keamanan informasi Anda penting bagi kami. Kami berusaha untuk menggunakan cara yang dapat diterima secara komersial untuk melindunginya, tetapi ingatlah bahwa tidak ada metode transmisi melalui Internet, atau metode penyimpanan elektronik yang 100% aman.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">4. Tautan ke Situs Lain</h2>
            <p>
              Layanan kami mungkin berisi tautan ke situs lain yang tidak dioperasikan oleh kami. Jika Anda mengklik tautan pihak ketiga, Anda akan diarahkan ke situs pihak ketiga tersebut. Kami sangat menyarankan Anda untuk meninjau Kebijakan Privasi setiap situs yang Anda kunjungi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">5. Perubahan pada Kebijakan Privasi Ini</h2>
            <p>
              Kami dapat memperbarui Kebijakan Privasi kami dari waktu ke waktu. Kami akan memberitahu Anda tentang perubahan apa pun dengan memposting Kebijakan Privasi baru di halaman ini. Anda disarankan untuk meninjau Kebijakan Privasi ini secara berkala untuk setiap perubahan.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;