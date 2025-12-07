import React from 'react';

/**
 * Komponen untuk menampilkan halaman Syarat dan Ketentuan.
 * PENTING: Ini adalah template. Anda harus berkonsultasi dengan ahli hukum
 * untuk memastikan kontennya sesuai dengan kebutuhan bisnis dan hukum Anda.
 */
const TermsAndConditions: React.FC = () => {
  const websiteName = 'NOCAP.AI';
  // Anda bisa mengganti ini dengan URL domain Anda yang sebenarnya
  const websiteUrl = 'https://nocap-ai-ten.vercel.app/'; 

  return (
    <div className="min-h-screen bg-[#06060A] text-gray-300 font-sans">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white border-b-2 border-cyan-400/30 pb-4 mb-8">
          Syarat dan Ketentuan
        </h1>
        <p className="text-gray-500 mb-12">
          Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <p className="mb-8">Harap baca syarat dan ketentuan ini dengan saksama sebelum menggunakan Layanan kami.</p>

        <div className="space-y-10 text-gray-400 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">1. Pendahuluan</h2>
            <p>
              Selamat datang di {websiteName} .
              Syarat dan Ketentuan ini mengatur penggunaan Anda atas situs web kami yang berlokasi di {websiteUrl}
              yang kami operasikan.
            </p>
            <p className="mt-4">
              Dengan mengakses atau menggunakan Layanan, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari ketentuan ini, maka Anda tidak diizinkan untuk mengakses Layanan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">2. Penggunaan Layanan</h2>
            <p>
              Anda setuju untuk tidak menggunakan Layanan untuk tujuan apa pun yang melanggar hukum atau dilarang oleh Ketentuan ini. Anda tidak boleh menggunakan Layanan dengan cara apa pun yang dapat merusak, melumpuhkan, membebani, atau mengganggu server atau jaringan kami.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">3. Kekayaan Intelektual</h2>
            <p>
              Layanan dan konten aslinya (tidak termasuk Konten yang disediakan oleh pengguna), fitur, dan fungsionalitasnya adalah dan akan tetap menjadi milik eksklusif {websiteName} dan pemberi lisensinya.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">4. Batasan Tanggung Jawab</h2>
            <p>
              Dalam keadaan apa pun, {websiteName}, maupun direktur, karyawan, mitra, agen, pemasok, atau afiliasinya, tidak akan bertanggung jawab atas kerugian tidak langsung, insidental, khusus, konsekuensial, atau hukuman, termasuk namun tidak terbatas pada, kehilangan keuntungan, data, penggunaan, niat baik, atau kerugian tidak berwujud lainnya.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">5. Hukum yang Mengatur</h2>
            <p>
              Ketentuan ini akan diatur dan ditafsirkan sesuai dengan hukum negara Indonesia, tanpa memperhatikan pertentangan ketentuan hukumnya.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">6. Perubahan pada Ketentuan</h2>
            <p>
              Kami berhak, atas kebijakan kami sendiri, untuk mengubah atau mengganti Ketentuan ini kapan saja. Jika revisi bersifat material, kami akan berusaha memberikan pemberitahuan sebelum ketentuan baru berlaku. Apa yang merupakan perubahan material akan ditentukan atas kebijakan kami sendiri.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;