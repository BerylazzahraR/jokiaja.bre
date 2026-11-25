<div align="center">

  <img src="https://api.iconify.design/lucide/file-pen-line.svg?color=%23059669&width=64&height=64" alt="jokiaja.bre logo" width="64" height="64" />

  <h1>jokiaja.bre</h1>
  <p><strong>Layanan Akademik &amp; Produktivitas Mahasiswa — Kebutuhan Akademikmu, Jadi Lebih Mudah.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Iconify-1769AA?style=for-the-badge&logo=iconify&logoColor=white" alt="Iconify" />
    <img src="https://img.shields.io/badge/Tema-Emerald_%23059669-059669?style=for-the-badge" alt="Tema Emerald" />
  </p>

  <p>
    <a href="https://www.instagram.com/jokiaja.bre?fqnt=aWY3ODQycncxa3pk">
      <img src="https://img.shields.io/badge/Instagram-@jokiaja.bre-E4405F?style=flat-square&logo=instagram&logoColor=white" alt="Instagram @jokiaja.bre" />
    </a>
    <a href="https://wa.me/6281281738632">
      <img src="https://img.shields.io/badge/WhatsApp-Konsultasi_Gratis-25D366?style=flat-square&logo=whatsapp&logoColor=white" alt="WhatsApp" />
    </a>
  </p>

</div>

---

## ✨ Tentang Proyek

**jokiaja.bre** adalah landing page & katalog layanan bantuan akademik dan produktivitas mahasiswa yang ringan, responsif, dan langsung terhubung ke **WhatsApp**. Dibangun tanpa framework berat—cukup HTML, CSS, dan Vanilla JavaScript—sehingga cepat dibuka di perangkat apa saja dan mudah dikustomisasi.

---

## 🚀 Fitur Utama

- **🎨 Dark & Light Mode** — Toggle tema otomatis mengikuti preferensi sistem dan tersimpan di `localStorage`.
- **🔍 Katalog Layanan & Filter Cerdas** — Pencarian real-time, filter kategori, filter rentang harga, dan pengurutan (terbaru, termurah, tertinggi).
- **📋 Modal Detail Layanan** — Menampilkan deskripsi lengkap, fitur yang didapat, syarat, serta FAQ khusus per kategori.
- **💬 Integrasi WhatsApp Otomatis** — Klik *Pesan Layanan* atau *Konsultasi Gratis* langsung membuka WhatsApp dengan format pesan yang sudah terisi.
- **⭐ Carousel Testimoni** — Dilengkapi foto profil, rating bintang, dan tag layanan.
- **❓ FAQ Interaktif & Alur Pemesanan** — Accordion pertanyaan umum dan timeline 5 langkah pemesanan yang jelas.
- **⚙️ Konfigurasi Terpusat** — Ubah nama brand, nomor WhatsApp, Instagram, email, hingga daftar layanan cukup dari dua file JS.

---

## 📚 Kategori Layanan

| Kategori | Contoh Layanan |
| :--- | :--- |
| ✍️ **Penulisan & Konsultasi** | Konsultasi Makalah, Laporan Praktikum, Proposal |
| 📝 **Editing & Formatting** | Proofreading, Formatting Dokumen, Parafrasa |
| 🎨 **Presentasi & Desain** | Desain Presentasi (PPT), Infografis, Poster Akademik |
| 💻 **Digital & Teknologi** | Debugging Kode, Pembuatan Website, Konsultasi Database, Dokumentasi Proyek |

---

## 📁 Struktur Proyek

```text
jasajoki/
├── index.html        # Struktur halaman utama (Hero, Katalog, FAQ, Testimoni, Footer)
├── README.md         # Dokumentasi proyek
├── css/
│   └── style.css     # Styling lengkap, tema Dark/Light, & palet warna Emerald
└── js/
    ├── config.js     # Konfigurasi brand, kontak (WA, IG, Email), & template pesan
    ├── data.js       # Data kategori, katalog layanan, langkah, testimoni, & FAQ
    └── app.js        # Logika render dinamis, filter, modal, carousel, & tema
```

---

## 🛠️ Cara Menjalankan & Kustomisasi

### Menjalankan Secara Lokal
1. Clone atau letakkan folder proyek di server lokal (mis. **Laragon** di `e:\laragon\www\jasajoki`).
2. Buka langsung `index.html` di browser, atau akses melalui URL lokal Laragon.

### Kustomisasi Cepat
- **Ganti Identitas & Kontak:** Edit `js/config.js` (`brandName`, `whatsappNumber`, `instagramUrl`, `email`, dan template pesan `messages`).
- **Tambah / Ubah Layanan & Testimoni:** Edit array `services` dan `testimonials` di `js/data.js`.
- **Ubah Warna Tema:** Sesuaikan variabel `--accent` pada `:root[data-theme="dark"]` dan `:root[data-theme="light"]` di `css/style.css`.

---

<div align="center">
  <sub>Dibuat untuk <strong>jokiaja.bre</strong> · © 2026</sub>
</div>

