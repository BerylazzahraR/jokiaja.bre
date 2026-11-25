/* ==========================================================
   KONFIGURASI SITUS — ubah semua nilai penting di sini saja.
   ========================================================== */
window.SITE_CONFIG = {
  // Ganti dengan nama brand Anda
  brandName: "jokiaja.bre",
  brandInitial: "J",
  tagline: "Layanan akademik & produktivitas mahasiswa",

  // Nomor WhatsApp format internasional TANPA tanda + / spasi / nol di depan
  // Contoh: 6281234567890
  whatsappNumber: "6281281738632",

  instagramHandle: "jokiaja.bre",
  instagramUrl: "https://www.instagram.com/jokiaja.bre?fqnt=aWY3ODQycncxa3pk",
  email: "halo@jokiaja.bre",

  // Statistik hero. Dua pertama dihitung otomatis dari data katalog.
  // Nilai di bawah ini adalah PLACEHOLDER — sesuaikan dengan kondisi nyata.
  responseMinutes: 60,

  // Pesan otomatis WhatsApp
  messages: {
    order: (s, kategori, harga) =>
      `Halo, saya tertarik untuk memesan layanan berikut:\n\n` +
      `Nama Layanan: ${s}\nKategori: ${kategori}\nHarga: ${harga}\n\n` +
      `Saya ingin mengetahui informasi lebih lanjut mengenai layanan ini.\n\nTerima kasih.`,
    consult:
      `Halo, saya ingin konsultasi terlebih dahulu mengenai kebutuhan akademik saya. ` +
      `Boleh dibantu menentukan layanan yang paling sesuai?\n\nTerima kasih.`
  }
};
