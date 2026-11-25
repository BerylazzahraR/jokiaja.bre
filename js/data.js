/* ==========================================================
   DATA SITUS — kategori, layanan, langkah, testimoni, FAQ.
   Tambah / ubah layanan cukup dengan mengedit array SERVICES.
   ========================================================== */
window.SITE_DATA = {
  categories: [
    {
      id: "penulisan",
      label: "Penulisan & Konsultasi",
      short: "Penulisan",
      icon: "lucide:pen-tool",
      requirements: [
        "Instruksi tugas atau panduan dari dosen (jika ada)",
        "Topik, judul, atau draf awal yang sudah dimiliki",
        "Tenggat waktu dan format yang diminta kampus"
      ],
      faqs: [
        { q: "Apakah saya akan dibantu menulis seluruh tugas?", a: "Layanan ini berfokus pada konsultasi dan pendampingan: struktur, arah argumen, sumber, dan perbaikan draf. Isi akhir tetap menjadi karya dan tanggung jawab Anda." },
        { q: "Bisa konsultasi lewat chat saja?", a: "Bisa. Sesi dilakukan lewat WhatsApp atau panggilan suara, sesuai kenyamanan Anda." }
      ]
    },
    {
      id: "editing",
      label: "Editing & Formatting",
      short: "Editing",
      icon: "lucide:spell-check",
      requirements: [
        "File dokumen dalam format .docx (atau .pdf untuk dibaca saja)",
        "Pedoman format kampus atau gaya sitasi yang dipakai",
        "Catatan bagian yang paling perlu diperhatikan"
      ],
      faqs: [
        { q: "Apakah isi dokumen saya akan diubah?", a: "Tidak tanpa sepengetahuan Anda. Perubahan ditandai lewat track changes sehingga Anda bisa menerima atau menolak tiap koreksi." },
        { q: "Format file apa yang diterima?", a: "Utamanya .docx. File PDF bisa diterima untuk dibaca, namun proses editing membutuhkan berkas yang dapat disunting." }
      ]
    },
    {
      id: "desain",
      label: "Presentasi & Desain",
      short: "Desain",
      icon: "lucide:presentation",
      requirements: [
        "Materi atau outline isi yang akan ditampilkan",
        "Referensi gaya, warna, atau logo (jika ada)",
        "Ukuran atau format keluaran yang dibutuhkan"
      ],
      faqs: [
        { q: "Apakah saya mendapat file yang bisa diedit?", a: "Ya. File sumber (misalnya .pptx atau .fig) diserahkan bersama hasil akhir agar bisa Anda ubah sendiri." },
        { q: "Berapa kali revisi desain?", a: "Revisi ringan disediakan sesuai paket pada detail layanan. Perubahan konsep total dihitung sebagai pekerjaan baru." }
      ]
    },
    {
      id: "teknologi",
      label: "Digital & Teknologi",
      short: "Teknologi",
      icon: "lucide:code-xml",
      requirements: [
        "Deskripsi masalah atau tujuan proyek",
        "Kode, repositori, atau tangkapan layar galat (untuk debugging)",
        "Bahasa pemrograman, framework, dan batasan dari dosen"
      ],
      faqs: [
        { q: "Apakah saya akan diajari, bukan hanya diberi jawaban?", a: "Ya. Setiap perbaikan disertai penjelasan penyebab masalah agar Anda memahami solusinya." },
        { q: "Apakah kode saya aman?", a: "Kode dan data Anda hanya dipakai untuk keperluan pengerjaan dan tidak dibagikan ke pihak lain." }
      ]
    }
  ],

  services: [
    /* ---------- Penulisan & Konsultasi ---------- */
    { id: "konsultasi-makalah", category: "penulisan", name: "Konsultasi Penyusunan Makalah", icon: "lucide:book-open", price: 75000, duration: "1–2 hari", addedAt: "2026-09-12", featured: true,
      desc: "Pendampingan menyusun kerangka, rumusan masalah, dan alur argumen makalah dari nol sampai siap dikumpulkan.",
      long: "Anda membawa topik atau draf kasar, kami membantu merapikannya menjadi makalah yang runtut. Sesi mencakup penajaman judul, penyusunan outline, pemilihan sumber, hingga masukan untuk draf pertama.",
      features: ["Penajaman topik dan rumusan masalah", "Outline bab per bab", "Rekomendasi jenis sumber rujukan", "Satu kali tinjauan draf pertama"] },
    { id: "laporan-praktikum", category: "penulisan", name: "Konsultasi Laporan Praktikum", icon: "lucide:flask-conical", price: 60000, duration: "1–2 hari", addedAt: "2026-08-03",
      desc: "Bantu menyusun struktur laporan, membaca data hasil percobaan, dan menulis pembahasan yang jelas.",
      long: "Cocok untuk laporan praktikum sains, teknik, maupun kesehatan. Kami membantu Anda memahami cara menyajikan data, menulis pembahasan, dan menarik kesimpulan yang sesuai hasil percobaan.",
      features: ["Struktur laporan sesuai standar", "Arahan penyajian tabel dan grafik", "Masukan pada bagian pembahasan", "Pengecekan konsistensi kesimpulan"] },
    { id: "konsultasi-proposal", category: "penulisan", name: "Konsultasi Proposal", icon: "lucide:file-pen", price: 100000, duration: "2–3 hari", addedAt: "2026-10-05",
      desc: "Pendampingan proposal penelitian, PKM, atau kegiatan: dari latar belakang hingga metode dan jadwal.",
      long: "Proposal yang baik dimulai dari masalah yang tajam dan metode yang masuk akal. Kami membantu Anda menguji keduanya, lalu merapikan susunan proposal agar mudah dinilai.",
      features: ["Evaluasi latar belakang dan tujuan", "Masukan metode dan jadwal", "Pengecekan kelengkapan komponen", "Satu kali tinjauan revisi"] },
    { id: "bimbingan-tugas", category: "penulisan", name: "Bimbingan Penyusunan Tugas", icon: "lucide:graduation-cap", price: 50000, duration: "Sesi 60 menit", addedAt: "2026-07-20",
      desc: "Sesi tanya jawab terarah untuk tugas kuliah yang terasa buntu, tanpa harus menunggu jam konsultasi dosen.",
      long: "Anda menjelaskan tugas dan hambatannya, kami membantu memecahnya menjadi langkah kecil yang bisa dikerjakan. Cocok untuk tugas esai, studi kasus, maupun resensi.",
      features: ["Sesi satu lawan satu 60 menit", "Pemecahan tugas menjadi langkah kerja", "Daftar tindak lanjut tertulis", "Tambah sesi bila diperlukan"] },

    /* ---------- Editing & Formatting ---------- */
    { id: "editing-dokumen", category: "editing", name: "Editing Dokumen", icon: "lucide:pen-line", price: 40000, duration: "1–2 hari", addedAt: "2026-10-18", featured: true,
      desc: "Perbaikan kalimat, alur paragraf, dan kejelasan gagasan dengan track changes yang bisa Anda tinjau satu per satu.",
      long: "Editing menyeluruh agar tulisan Anda lebih padat dan mudah dibaca. Setiap perubahan ditandai, lengkap dengan komentar singkat untuk bagian yang perlu keputusan Anda.",
      features: ["Perbaikan kalimat dan alur paragraf", "Seluruh perubahan lewat track changes", "Komentar pada bagian yang ambigu", "Ringkasan catatan perbaikan"] },
    { id: "proofreading", category: "editing", name: "Proofreading", icon: "lucide:spell-check", price: 25000, duration: "12–24 jam", addedAt: "2026-09-01",
      desc: "Pemeriksaan akhir untuk salah ketik, ejaan, dan tanda baca sebelum dokumen dikirim atau dicetak.",
      long: "Langkah terakhir sebelum dikumpulkan. Fokusnya pada kesalahan permukaan: ejaan, tanda baca, huruf kapital, dan konsistensi penulisan istilah.",
      features: ["Ejaan dan tanda baca sesuai PUEBI", "Konsistensi istilah dan singkatan", "Pengecekan angka dan penomoran", "Hasil dalam track changes"] },
    { id: "formatting-makalah", category: "editing", name: "Formatting Makalah", icon: "lucide:align-left", price: 35000, duration: "1 hari", addedAt: "2026-08-22",
      desc: "Penyesuaian margin, heading, nomor halaman, dan daftar isi otomatis sesuai pedoman kampus Anda.",
      long: "Berikan pedoman penulisan dari kampus atau fakultas, kami menerapkannya pada dokumen Anda dengan gaya (style) yang rapi sehingga mudah diperbarui.",
      features: ["Margin, spasi, dan jenis huruf sesuai pedoman", "Heading bertingkat dan daftar isi otomatis", "Penomoran halaman bab dan lampiran", "Daftar tabel dan gambar otomatis"] },
    { id: "cek-tata-bahasa", category: "editing", name: "Pengecekan Tata Bahasa", icon: "lucide:message-square-text", price: 20000, duration: "12 jam", addedAt: "2026-06-30",
      desc: "Koreksi struktur kalimat dan pilihan kata dalam bahasa Indonesia maupun bahasa Inggris.",
      long: "Cocok untuk abstrak, surat, atau esai pendek. Anda menerima versi terkoreksi beserta penjelasan singkat kesalahan yang paling sering muncul agar tidak terulang.",
      features: ["Bahasa Indonesia atau Inggris", "Koreksi struktur dan pilihan kata", "Catatan pola kesalahan berulang", "Cocok untuk dokumen hingga 10 halaman"] },
    { id: "daftar-pustaka", category: "editing", name: "Penyusunan Daftar Pustaka", icon: "lucide:list-ordered", price: 30000, duration: "1 hari", addedAt: "2026-10-27",
      desc: "Merapikan sitasi dan daftar pustaka dalam gaya APA, MLA, IEEE, Harvard, atau Chicago.",
      long: "Kami menyeragamkan kutipan di dalam teks dan daftar pustaka di akhir dokumen, lalu memeriksa bahwa setiap kutipan punya padanan di daftar pustaka, dan sebaliknya.",
      features: ["Gaya APA, MLA, IEEE, Harvard, Chicago", "Pencocokan kutipan dan daftar pustaka", "Format sumber daring dan jurnal", "Hasil siap salin ke dokumen"] },
    { id: "penerjemahan", category: "editing", name: "Penerjemahan Dokumen", icon: "lucide:languages", price: 45000, duration: "1–3 hari", addedAt: "2026-11-09",
      desc: "Terjemahan Indonesia–Inggris untuk abstrak, artikel, atau dokumen pendukung dengan istilah akademik yang tepat.",
      long: "Terjemahan yang mempertahankan makna dan nada tulisan akademik. Istilah teknis dikonsultasikan lebih dulu bila ada lebih dari satu padanan yang lazim.",
      features: ["Indonesia ke Inggris dan sebaliknya", "Istilah akademik dan teknis dijaga konsisten", "Daftar istilah untuk dokumen panjang", "Satu kali revisi ringan"] },

    /* ---------- Presentasi & Desain ---------- */
    { id: "desain-ppt", category: "desain", name: "Desain Presentasi (PPT)", icon: "lucide:presentation", price: 85000, duration: "2–3 hari", addedAt: "2026-10-30", featured: true,
      desc: "Slide yang rapi dan mudah diikuti, dibangun dari materi Anda dengan hierarki visual yang jelas.",
      long: "Kami mengubah materi menjadi alur presentasi yang enak dilihat: satu gagasan per slide, tipografi konsisten, dan visual data yang mudah dibaca dari bangku paling belakang.",
      features: ["Penyusunan alur dan struktur slide", "Tata letak, warna, dan tipografi konsisten", "Visualisasi data dan diagram", "File sumber .pptx dan versi PDF"] },
    { id: "infografis", category: "desain", name: "Desain Infografis", icon: "lucide:layout-dashboard", price: 90000, duration: "2–3 hari", addedAt: "2026-09-25",
      desc: "Ringkas data atau proses yang rumit menjadi satu halaman visual yang jelas dan enak dibaca.",
      long: "Untuk tugas, lomba, atau materi sosialisasi. Kami membantu memilih bagian paling penting dari materi Anda, lalu menatanya menjadi satu komposisi visual.",
      features: ["Penentuan poin utama dan alur baca", "Ikon dan ilustrasi yang seragam", "Ukuran cetak atau media sosial", "File sumber dan ekspor PNG/PDF"] },
    { id: "poster", category: "desain", name: "Desain Poster", icon: "lucide:image", price: 70000, duration: "2 hari", addedAt: "2026-08-15",
      desc: "Poster kegiatan, seminar, atau poster ilmiah dengan tata letak tegas dan informasi yang mudah dipindai.",
      long: "Mulai dari poster acara kampus sampai poster ilmiah untuk konferensi. Anda tinggal mengirim teks dan logo, kami menatanya sesuai ukuran cetak yang dibutuhkan.",
      features: ["Ukuran A3, A2, atau sesuai permintaan", "Tata letak untuk cetak (CMYK) atau layar", "Penempatan logo dan sponsor", "Dua pilihan konsep awal"] },
    { id: "desain-cv", category: "desain", name: "Desain CV", icon: "lucide:contact", price: 55000, duration: "1–2 hari", addedAt: "2026-11-12",
      desc: "CV yang ringkas, terbaca oleh sistem pelamar (ATS), dan menonjolkan pengalaman yang relevan.",
      long: "Kami merapikan isi dan tampilan CV untuk magang, beasiswa, atau lamaran kerja pertama. Struktur dibuat sederhana agar tetap terbaca oleh sistem penyaring otomatis.",
      features: ["Penataan ulang isi dan urutan", "Tata letak bersih ramah ATS", "Versi Indonesia atau Inggris", "File .docx dan PDF"] },
    { id: "diagram", category: "desain", name: "Desain Diagram", icon: "lucide:workflow", price: 50000, duration: "1–2 hari", addedAt: "2026-07-08",
      desc: "Diagram alir, kerangka konsep, ERD, atau diagram proses yang rapi dan siap masuk laporan.",
      long: "Diagram yang konsisten dan terbaca di ukuran kecil. Anda cukup mendeskripsikan alur atau relasinya, kami yang menggambar dan menyelaraskan gayanya dengan dokumen Anda.",
      features: ["Flowchart, kerangka konsep, ERD, UML", "Gaya visual seragam dengan dokumen", "Ekspor PNG, SVG, atau PDF", "File sumber dapat diedit"] },

    /* ---------- Digital & Teknologi ---------- */
    { id: "konsultasi-pemrograman", category: "teknologi", name: "Konsultasi Pemrograman", icon: "lucide:code-xml", price: 80000, duration: "Sesi 60 menit", addedAt: "2026-10-10", featured: true,
      desc: "Sesi satu lawan satu untuk memahami logika, struktur program, dan cara memecah tugas pemrograman.",
      long: "Cocok untuk tugas algoritma, pemrograman berorientasi objek, hingga proyek akhir. Fokusnya pada pemahaman, sehingga Anda dapat melanjutkan sendiri setelah sesi selesai.",
      features: ["Sesi daring 60 menit", "Bahasa umum: Python, Java, JavaScript, C++, PHP", "Pemecahan tugas menjadi modul kecil", "Rangkuman catatan sesi"] },
    { id: "debugging", category: "teknologi", name: "Debugging Kode", icon: "lucide:bug", price: 60000, duration: "Hari yang sama", addedAt: "2026-09-18",
      desc: "Menelusuri galat yang tak kunjung selesai, lengkap dengan penjelasan penyebab dan cara mencegahnya.",
      long: "Kirim kode dan pesan galatnya. Kami menelusuri sumber masalah, memperbaikinya, dan menjelaskan langkah yang diambil agar Anda bisa mengenali pola yang sama di lain waktu.",
      features: ["Analisis penyebab galat", "Perbaikan dengan penjelasan langkah", "Saran penulisan agar lebih mudah dirawat", "Satu putaran tindak lanjut"] },
    { id: "pembuatan-website", category: "teknologi", name: "Pembuatan Website", icon: "lucide:globe", price: 350000, duration: "5–10 hari", addedAt: "2026-11-18",
      desc: "Website sederhana untuk tugas akhir, organisasi, atau portofolio: responsif, cepat, dan mudah dikelola.",
      long: "Dari halaman profil sampai situs katalog kecil. Kami membangun dengan teknologi yang lazim dipakai agar mudah Anda pelajari dan kembangkan sendiri.",
      features: ["Desain responsif di semua perangkat", "HTML, CSS, JavaScript atau PHP", "Panduan penggunaan dan pengelolaan", "Kode sumber diserahkan lengkap"] },
    { id: "konsultasi-database", category: "teknologi", name: "Konsultasi Database", icon: "lucide:database", price: 90000, duration: "2–3 hari", addedAt: "2026-08-28",
      desc: "Perancangan tabel, normalisasi, ERD, dan kueri SQL untuk tugas basis data maupun proyek aplikasi.",
      long: "Kami membantu Anda mengubah kebutuhan data menjadi rancangan yang rapi, memeriksa normalisasi, dan menulis kueri yang efisien serta mudah dipahami.",
      features: ["Perancangan ERD dan skema tabel", "Normalisasi sampai bentuk yang dibutuhkan", "Kueri SQL dan optimasi dasar", "MySQL, PostgreSQL, atau SQLite"] },
    { id: "dokumentasi-proyek", category: "teknologi", name: "Dokumentasi Proyek", icon: "lucide:file-code", price: 65000, duration: "2–3 hari", addedAt: "2026-10-22",
      desc: "README, panduan instalasi, dan dokumentasi teknis agar proyek mudah dipahami dosen maupun rekan tim.",
      long: "Dokumentasi yang membuat orang lain bisa menjalankan proyek Anda tanpa bertanya. Kami menyusun struktur, menjelaskan arsitektur, dan menuliskan langkah penggunaan.",
      features: ["README dan panduan instalasi", "Penjelasan arsitektur dan alur data", "Dokumentasi API atau fungsi utama", "Format Markdown atau .docx"] }
  ],

  steps: [
    { title: "Pilih Layanan", text: "Jelajahi katalog, gunakan filter kategori atau harga, lalu buka detail layanan yang paling mendekati kebutuhan Anda." },
    { title: "Konsultasikan Kebutuhan", text: "Klik pesan dan ceritakan kebutuhan Anda lewat WhatsApp: jenis dokumen, tenggat, serta pedoman dari kampus." },
    { title: "Konfirmasi Harga dan Ketentuan", text: "Kami menyampaikan rincian harga, estimasi waktu, dan jumlah revisi. Pengerjaan baru dimulai setelah Anda setuju." },
    { title: "Proses Pengerjaan", text: "Pekerjaan berjalan sesuai jadwal yang disepakati. Anda dapat menanyakan perkembangan kapan saja." },
    { title: "Review dan Serah Terima", text: "Anda meninjau hasilnya, meminta revisi sesuai ketentuan, lalu menerima berkas akhir dan catatan pengerjaan." }
  ],

  benefits: [
    { icon: "lucide:messages-square", title: "Konsultasi sebelum memesan", text: "Bingung layanan mana yang cocok? Ceritakan dulu kebutuhan Anda. Konsultasi awal tidak dipungut biaya dan tanpa kewajiban memesan." },
    { icon: "lucide:receipt-text", title: "Harga transparan", text: "Harga mulai dari tertera jelas di setiap layanan. Rincian akhir disepakati sebelum pengerjaan." },
    { icon: "lucide:mouse-pointer-click", title: "Pemesanan mudah", text: "Cukup satu klik dari katalog ke WhatsApp, dengan pesan yang sudah terisi." },
    { icon: "lucide:zap", title: "Komunikasi responsif", text: "Pertanyaan Anda dijawab langsung oleh orang yang mengerjakan, bukan sistem otomatis." },
    { icon: "lucide:sliders-horizontal", title: "Sesuai kebutuhan", text: "Lingkup pekerjaan bisa disesuaikan: sebagian bab saja, satu slide saja, atau paket lengkap." },
    { icon: "lucide:shield-check", title: "Privasi dokumen terjaga", text: "Berkas Anda hanya dipakai untuk pengerjaan, tidak dibagikan, dan dihapus atas permintaan setelah selesai." }
  ],

  testimonials: [
    { name: "Alya R.", role: "Mahasiswa Psikologi, semester 5", service: "Proofreading", rating: 5, avatar: "https://randomuser.me/api/portraits/women/44.jpg", text: "Koreksinya jelas dan setiap perubahan bisa saya setujui satu per satu. Naskah jadi jauh lebih rapi sebelum dikumpulkan." },
    { name: "Bima S.", role: "Mahasiswa Teknik Informatika, semester 7", service: "Debugging Kode", rating: 5, avatar: "https://randomuser.me/api/portraits/men/32.jpg", text: "Selain galatnya beres, saya dijelaskan kenapa bisa terjadi. Jadi bisa mengenali pola yang sama di tugas berikutnya." },
    { name: "Citra M.", role: "Mahasiswa Manajemen, semester 3", service: "Desain Presentasi (PPT)", rating: 4, avatar: "https://randomuser.me/api/portraits/women/68.jpg", text: "Slide jadi mudah diikuti dan tidak penuh teks. Revisi kecil ditanggapi dengan cepat." },
    { name: "Dimas P.", role: "Mahasiswa Pendidikan, semester 8", service: "Formatting Makalah", rating: 5, avatar: "https://randomuser.me/api/portraits/men/75.jpg", text: "Daftar isi dan penomoran halaman otomatis, jadi saat saya menambah bab tidak perlu merapikan ulang." },
    { name: "Elisa W.", role: "Mahasiswa Hubungan Internasional, semester 6", service: "Penerjemahan Dokumen", rating: 5, avatar: "https://randomuser.me/api/portraits/women/65.jpg", text: "Istilah teknis dikonfirmasi dulu sebelum diterjemahkan. Hasilnya terasa seperti tulisan akademik yang wajar." }
  ],

  faqs: [
    { q: "Bagaimana cara memesan layanan?", a: "Pilih layanan di katalog, lalu klik \"Pesan Layanan\". Anda akan diarahkan ke WhatsApp dengan pesan yang sudah terisi nama layanan, kategori, dan harga. Tinggal kirim, lalu jelaskan kebutuhan Anda." },
    { q: "Apakah bisa konsultasi terlebih dahulu?", a: "Bisa. Gunakan tombol \"Konsultasi Gratis\" untuk bertanya sebelum memutuskan. Konsultasi awal tidak mengikat dan tidak dipungut biaya." },
    { q: "Bagaimana sistem pembayarannya?", a: "Pembayaran dilakukan setelah harga dan ketentuan disepakati, melalui transfer bank atau dompet digital. Untuk pekerjaan besar, pembayaran dapat dibagi dua tahap: sebelum dan sesudah pengerjaan." },
    { q: "Apakah harga bisa disesuaikan?", a: "Harga di katalog adalah harga mulai dari. Nominal akhir menyesuaikan jumlah halaman, tingkat kesulitan, dan tenggat. Rinciannya disampaikan sebelum Anda memutuskan memesan." },
    { q: "Apakah dokumen pelanggan dijaga kerahasiaannya?", a: "Ya. Dokumen hanya dipakai untuk pengerjaan pesanan Anda, tidak dibagikan ke pihak lain, dan dapat dihapus atas permintaan setelah pekerjaan selesai." },
    { q: "Bagaimana jika ingin melakukan revisi?", a: "Setiap layanan menyertakan revisi sesuai ketentuan yang disepakati di awal. Revisi di luar lingkup awal tetap bisa dikerjakan dengan penyesuaian harga yang disampaikan lebih dulu." }
  ],

  about: {
    quote: "Tugas yang baik lahir dari proses yang tertata, bukan dari panik di malam sebelum tenggat.",
    paragraphs: [
      "Kami membantu mahasiswa merapikan hal-hal di sekitar pekerjaan akademik: struktur tulisan, format dokumen, presentasi, sampai kode program.",
      "Layanan kami bersifat pendampingan. Gagasan dan keputusan akhir tetap milik Anda, kami membantu agar prosesnya lebih jelas, lebih cepat, dan lebih tenang."
    ],
    principles: [
      { n: "01", title: "Jujur soal lingkup", text: "Kami menyampaikan apa yang bisa dan tidak bisa dibantu sejak awal." },
      { n: "02", title: "Proses yang bisa ditinjau", text: "Setiap perubahan ditandai dan dijelaskan, bukan diganti diam-diam." },
      { n: "03", title: "Integritas akademik", text: "Kami tidak menerima permintaan yang melanggar aturan kampus Anda." }
    ]
  }
};
