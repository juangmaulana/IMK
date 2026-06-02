const pinjolPathData = {
  id: "pinjol",
  title: "Learning Path 1: Anti-Pinjol Ilegal",
  description: "Pahami taktik yang digunakan oleh predator finansial dan pelajari cara membentengi diri dari risiko utang berbahaya.",
  preQuiz: {
    title: "Tes Pengetahuan Awal — Sebelum Belajar",
    description: "Selamat datang di Learning Path 1: Anti-Pinjol Ilegal! Sebelum mulai belajar, jawab 5 soal berikut untuk mengukur pengetahuan awalmu. Tidak ada jawaban benar/salah yang menentukan apakah kamu boleh lanjut — ini hanya baseline untuk mengukur seberapa banyak pemahamanmu meningkat setelah menyelesaikan semua modul. Jawablah dengan jujur sesuai yang kamu ketahui saat ini.",
    duration: "3-5 menit",
    questions: [
      {
        id: "PQ-1",
        question: "Menurut kamu, apa yang membedakan pinjol LEGAL dari pinjol ILEGAL?",
        options: [
          "A. Pinjol legal bunganya lebih tinggi karena sudah terdaftar resmi",
          "B. Pinjol legal terdaftar/berizin OJK dan transparan soal bunga serta biaya",
          "C. Pinjol legal hanya tersedia di aplikasi dengan banyak bintang di toko aplikasi",
          "D. Pinjol legal selalu menawarkan pinjaman melalui SMS dan WhatsApp"
        ],
        answer: "B",
        explanation: "Pinjol legal wajib memiliki izin dari OJK, transparan soal bunga, biaya, dan tenor, serta memiliki kanal pengaduan resmi. Banyaknya bintang di toko aplikasi atau penawaran via SMS bukan indikator legalitas."
      },
      {
        id: "PQ-2",
        question: "Sebuah aplikasi pinjol meminta izin akses ke seluruh kontak HP-mu saat instalasi. Apa yang sebaiknya kamu lakukan?",
        options: [
          "A. Berikan izin karena itu standar verifikasi identitas pinjol",
          "B. Berikan izin hanya sementara, lalu cabut setelah uang cair",
          "C. Tolak dan hapus aplikasi — ini tanda pinjol ilegal",
          "D. Tidak masalah, data kontak tidak bisa disalahgunakan"
        ],
        answer: "C",
        explanation: "Pinjol legal hanya boleh mengakses kamera, mikrofon, dan lokasi — bukan seluruh kontak, galeri foto, atau SMS. Permintaan akses kontak adalah ciri khas pinjol ilegal yang akan menggunakannya untuk mengintimidasi peminjam."
      },
      {
        id: "PQ-3",
        question: "Jika kamu mengalami masalah dengan pinjol ilegal (bunga mencekik, penagihan kasar), ke mana sebaiknya kamu melapor?",
        options: [
          "A. Langsung ke media sosial agar viral dan dapat perhatian publik",
          "B. Ke pengacara untuk menuntut secara perdata",
          "C. Ke OJK melalui APPK (appk.ojk.go.id) atau Call Center 157",
          "D. Cukup blokir nomor debt collector dan abaikan"
        ],
        answer: "C",
        explanation: "OJK menyediakan kanal pengaduan resmi melalui APPK (appk.ojk.go.id) dan Call Center 157 (bebas pulsa). OJK akan memproses pengaduan dan berkoordinasi dengan pihak berwenang untuk penindakan."
      },
      {
        id: "PQ-4",
        question: "Berapa batas maksimum bunga harian yang boleh dikenakan oleh pinjol legal untuk pinjaman konsumtif, sesuai ketentuan OJK?",
        options: [
          "A. 1% per hari",
          "B. 2% per hari",
          "C. 0,4% per hari",
          "D. Tidak ada batasan, tergantung kesepakatan"
        ],
        answer: "C",
        explanation: "OJK menetapkan batas maksimum bunga pinjol konsumtif sebesar 0,4% per hari melalui POJK No. 10/POJK.05/2022. Pinjol ilegal sering mengenakan bunga 1-5% per hari atau bahkan lebih tinggi."
      },
      {
        id: "PQ-5",
        question: "Apa yang dimaksud dengan 'debt trap' (jebakan utang) dalam konteks pinjol ilegal?",
        options: [
          "A. Ketika peminjam sengaja tidak membayar untuk mendapat potongan bunga",
          "B. Siklus di mana peminjam terpaksa meminjam lagi untuk membayar utang pinjol sebelumnya, sehingga utang terus membengkak",
          "C. Program cicilan khusus yang ditawarkan pinjol kepada pelanggan setia",
          "D. Kondisi di mana rekening bank peminjam diblokir oleh pinjol"
        ],
        answer: "B",
        explanation: "Debt trap adalah jebakan utang di mana peminjam yang tidak mampu melunasi terpaksa mengambil pinjaman baru (dari pinjol lain) untuk menutup utang lama. Akibatnya utang berlipat ganda dan sulit keluar dari siklus ini."
      }
    ]
  },
  modules: [
    {
      id: "modul-1",
      title: "Mengenal Pinjol Legal vs Ilegal",
      duration: "3-5 menit",
      objectives: [
        "Membedakan karakteristik pinjol legal dan pinjol ilegal",
        "Mengidentifikasi minimal 5 ciri pinjol ilegal",
        "Mengetahui cara memverifikasi legalitas pinjol melalui kanal resmi OJK",
        "Memahami regulasi dasar yang mengatur pinjaman online di Indonesia"
      ],
      content: `
### Apa itu Pinjol?
Pinjaman online (pinjol) atau Layanan Pendanaan Bersama Berbasis Teknologi Informasi (LPBBTI) adalah layanan pinjam-meminjam uang berbasis teknologi informasi yang mempertemukan pemberi dana dengan penerima dana secara langsung melalui platform digital.

Pinjol yang legal wajib terdaftar dan mendapat izin dari Otoritas Jasa Keuangan (OJK). Hingga 2025, terdapat puluhan perusahaan fintech lending yang resmi terdaftar di OJK dan masuk dalam kategori Pelaku Usaha Jasa Keuangan (PUJK).

**Peringatan!**
Hanya pinjol yang terdaftar atau berizin OJK yang boleh beroperasi di Indonesia. Pinjol ilegal adalah pinjol yang tidak memiliki izin dari OJK dan beroperasi secara sembunyi-sembunyi, seringkali merugikan konsumen.

### Perbedaan Pinjol Legal vs Ilegal

**PINJOL LEGAL**
- Terdaftar/berizin OJK
- Bunga & biaya transparan dan wajar
- Tenor dan angsuran jelas di awal
- Penagihan etis sesuai aturan OJK
- Privasi data dijaga sesuai UU PDP
- Alamat kantor fisik jelas
- Ada kanal pengaduan resmi

**PINJOL ILEGAL**
- Tidak terdaftar di OJK
- Bunga sangat tinggi & tidak transparan
- Biaya tersembunyi, tidak ada kepastian tenor
- Debt collector kasar, ancaman & intimidasi
- Minta akses semua data di HP (kontak, foto)
- Tidak ada alamat atau kantor fiktif
- Tidak ada mekanisme pengaduan

### Cara Cek Legalitas Pinjol
Selalu verifikasi legalitas sebelum menggunakan layanan pinjol:
1. Kunjungi website resmi OJK: www.ojk.go.id - buka menu 'IKNB' > 'Fintech' > 'Daftar Penyelenggara'
2. Hubungi Call Center OJK di nomor 157 (bebas pulsa)
3. Kirim email ke konsumen@ojk.go.id dengan menyertakan nama aplikasi/platform
4. Gunakan aplikasi APPK (Aplikasi Portal Perlindungan Konsumen) di appk.ojk.go.id
5. Cek melalui media sosial resmi OJK (@ojkindonesia)
      `,
      miniQuiz: [
        {
          id: "MQ1-1",
          question: "Pak Rudi menemukan aplikasi pinjol baru di toko aplikasi dengan rating 4,8 bintang dan sudah diunduh 500.000 kali. Apakah ini berarti pinjol tersebut pasti legal?",
          options: [
            "A. Ya, rating tinggi dan banyak unduhan membuktikan legalitasnya",
            "B. Ya, jika ada di toko aplikasi resmi berarti sudah diverifikasi legal",
            "C. Tidak — legalitas hanya bisa dikonfirmasi melalui cek di ojk.go.id atau 157",
            "D. Tidak jelas, perlu cek ulasan lebih lanjut"
          ],
          answer: "C",
          explanation: "Rating bintang dan jumlah unduhan bukan indikator legalitas. Toko aplikasi tidak melakukan verifikasi status izin OJK. Satu-satunya cara untuk memastikan legalitas pinjol adalah mengecek langsung di website OJK (ojk.go.id) atau menghubungi Call Center 157."
        }
      ]
    },
    {
      id: "modul-2",
      title: "Risiko Pinjol Ilegal",
      duration: "3-5 menit",
      objectives: [
        "Menjelaskan risiko bunga dan biaya yang tidak wajar pada pinjol ilegal",
        "Memahami dampak intimidasi debt collector virtual",
        "Menyadari risiko penyalahgunaan data pribadi",
        "Mengenali tanda-tanda jebakan utang pinjol ilegal"
      ],
      content: `
### Risiko 1: Bunga dan Biaya yang Mencekik
Pinjol ilegal seringkali menerapkan bunga yang sangat tinggi dan biaya tersembunyi yang tidak diinformasikan di awal peminjaman.

**Contoh Nyata Jebakan Bunga**
Pinjam Rp 1.000.000 selama 30 hari.
- **Pinjol Legal**: Bunga 0,4%/hari x 30 = 12% = Rp 120.000. Total kembalikan: Rp 1.120.000.
- **Pinjol Ilegal**: Bunga 1%/hari x 30 = 30% + biaya admin Rp 300.000 (dipotong di awal, hanya terima Rp 700.000). Total kembalikan: Rp 1.300.000 padahal hanya menerima Rp 700.000!

### Risiko 2: Debt Collector Kasar dan Intimidasi
Pinjol ilegal menggunakan taktik penagihan yang melanggar hukum dan sangat merugikan peminjam secara psikologis.
- Mengirim pesan ancaman ke nomor-nomor di daftar kontak HP peminjam
- Menyebarkan foto memalukan atau data pribadi ke teman, keluarga, dan rekan kerja
- Menghubungi atasan di tempat kerja peminjam

**Hak Hukum Konsumen**
Penting: Penagihan utang yang melanggar norma kesopanan dan menyebarkan data pribadi adalah TINDAK PIDANA. Ini diatur dalam UU ITE dan KUHP. Korban berhak melaporkan ke Polri.

### Risiko 3: Penyalahgunaan Data Pribadi
Pinjol ilegal biasanya meminta izin akses yang berlebihan ke perangkat pengguna:
- Akses seluruh daftar kontak telepon - untuk mengancam peminjam yang menunggak
- Akses galeri foto - untuk mengancam menyebarkan foto pribadi
- Akses kamera dan mikrofon - potensi penyadapan
      `,
      miniQuiz: [
        {
          id: "MQ2-1",
          question: "Doni meminjam Rp 2.000.000 dari pinjol ilegal selama 14 hari. Ia hanya menerima Rp 1.400.000 karena dipotong biaya admin Rp 600.000. Saat jatuh tempo ia harus membayar Rp 2.800.000. Berapa persen biaya total yang Doni tanggung dari uang yang ia TERIMA?",
          options: [
            "A. 40% — masih wajar untuk pinjaman darurat",
            "B. 100% — Doni membayar 2x lipat dari yang ia terima",
            "C. 30% — sesuai ketentuan OJK",
            "D. 14% — bunga standar pinjaman 14 hari"
          ],
          answer: "B",
          explanation: "Doni menerima Rp 1.400.000 tapi harus membayar Rp 2.800.000 — tepat 2x lipat atau 100% dari uang yang diterima hanya dalam 14 hari. Ini jauh melebihi batas OJK. Ini adalah jebakan khas pinjol ilegal."
        }
      ]
    },
    {
      id: "modul-3",
      title: "Cara Melaporkan Pinjol Ilegal",
      duration: "3-5 menit",
      objectives: [
        "Mengidentifikasi kanal pengaduan yang tepat sesuai jenis masalah",
        "Menyiapkan bukti yang diperlukan sebelum melapor",
        "Mengikuti prosedur pengaduan ke OJK melalui APPK",
        "Mengetahui kapan harus melapor ke Polri"
      ],
      content: `
### Kanal Pengaduan Resmi
- **APPK OJK (appk.ojk.go.id)**: Semua pengaduan terkait PUJK (termasuk pinjol)
- **Call Center OJK (157)**: Konsultasi cepat, panduan pengaduan
- **Satgas PASTI (kontak.pasti@ojk.go.id)**: Pinjol ilegal, investasi ilegal, scam keuangan
- **Bareskrim Polri (www.patrolisiber.id)**: Pelaporan pidana: ancaman, penyebaran data, penipuan
- **KOMINFO (aduankonten.id)**: Pemblokiran aplikasi/website pinjol ilegal

### Langkah-Langkah Melapor ke OJK via APPK
**SEBELUM MELAPOR: Kumpulkan semua bukti terlebih dahulu!**
Bukti yang Perlu Disiapkan:
- Screenshot percakapan/chat dengan pihak pinjol (termasuk ancaman)
- Screenshot kontrak pinjaman atau syarat & ketentuan
- Bukti transfer dana yang masuk ke rekening
- Bukti pembayaran yang sudah dilakukan
- Identitas diri (KTP) dan data pribadi yang dirugikan

### Alur Penanganan Pengaduan
1. **Lapor ke PUJK (jika pinjol terdaftar)**: Beri waktu 5 hari kerja untuk merespons.
2. **Lapor ke OJK via APPK (jika tidak ditanggapi)**: Jika PUJK tidak merespons atau pinjol ilegal.
3. **Satgas PASTI untuk pinjol ilegal**: Khusus untuk pinjol yang tidak terdaftar OJK.
4. **Lapor ke Polri (jika ada tindak pidana)**: Ancaman, penyebaran data, penipuan adalah tindak pidana.
      `,
      miniQuiz: [
        {
          id: "MQ3-1",
          question: "Sari mengalami penagihan kasar dari pinjol ilegal. Sebelum melapor ke OJK, bukti apa yang PALING PENTING untuk dikumpulkan terlebih dahulu?",
          options: [
            "A. Sertifikat lahir dan kartu keluarga sebagai bukti identitas resmi",
            "B. Screenshot percakapan/pesan ancaman, bukti transfer, dan kontrak pinjaman",
            "C. Kuitansi pembayaran pajak sebagai bukti kepatuhan hukum",
            "D. Cukup ingat nama aplikasinya saja, OJK akan mencari sendiri"
          ],
          answer: "B",
          explanation: "Bukti yang paling krusial sebelum melapor adalah: screenshot percakapan/ancaman, bukti transfer dana yang masuk/keluar, kontrak atau syarat pinjaman, dan identitas diri (KTP). Screenshot adalah bukti digital yang mudah hilang — segera simpan sebelum melapor."
        }
      ]
    },
    {
      id: "modul-4",
      title: "Studi Kasus Nyata",
      duration: "3-5 menit",
      objectives: [
        "Mengidentifikasi modus pinjol ilegal dari kasus nyata",
        "Memetakan risiko yang timbul dari penggunaan pinjol ilegal",
        "Memahami tindakan OJK/Satgas dalam menangani pinjol ilegal"
      ],
      content: `
### Kasus 1: Karyawan Swasta Terjebak Spiral Utang
Budi (32 tahun) membutuhkan uang mendesak Rp 2 juta. Ia mengunduh aplikasi pinjol ilegal. Setelah disetujui, ia hanya menerima Rp 1,4 juta. Budi tidak mampu membayar saat jatuh tempo dan akhirnya meminjam di 5 pinjol ilegal lain untuk menutup utang. Total utangnya membengkak menjadi Rp 15 juta dalam 2 bulan.
**Resolusi**: Budi melapor ke OJK dan Satgas PASTI, yang kemudian memblokir aplikasi tersebut.
**Pelajaran**: Jangan pinjam di pinjol lain untuk menutup utang pinjol - ini hanya memperbesar masalah.

### Kasus 2: Mahasiswi Diancam Foto Memalukan
Siti (21 tahun) menerima SMS penawaran pinjaman dan mengunduh aplikasi. Aplikasi tersebut diam-diam mengakses seluruh galeri foto Siti. Saat Siti menunggak, ia diancam fotonya akan disebar ke seluruh kontaknya.
**Resolusi**: Siti melapor ke Polisi dengan bukti screenshot ancaman. Polri memproses laporan dan Satgas PASTI menutup aplikasi tersebut.
**Pelajaran**: Pengancaman dengan foto/data pribadi adalah TINDAK PIDANA. Segera lapor ke Polri di patrolisiber.id. Jangan tunduk pada ancaman.

### Tindakan OJK dan Satgas PASTI
Pemerintah terus memberantas pinjol ilegal melalui:
- Pemblokiran ribuan aplikasi dan website pinjol ilegal.
- Penindakan hukum bersama Polri.
- Edukasi publik secara masif.
      `,
      miniQuiz: [
        {
          id: "MQ4-1",
          question: "Dalam kasus Budi, ia meminjam Rp 2 juta tapi hanya menerima Rp 1,4 juta. Apa nama praktik pemotongan ini dan mengapa berbahaya?",
          options: [
            "A. Disebut 'deposit keamanan' — normal untuk pinjaman tanpa jaminan fisik",
            "B. Disebut potongan biaya admin di muka yang tidak proporsional — berbahaya karena peminjam menanggung bunga dari jumlah penuh padahal hanya menerima sebagian",
            "C. Disebut 'insurance fee' — wajib di semua lembaga keuangan",
            "D. Disebut 'origination fee' — umum dan diizinkan OJK selama di bawah 5%"
          ],
          answer: "B",
          explanation: "Potongan biaya admin di muka yang besar adalah modus pinjol ilegal yang berbahaya karena peminjam menanggung bunga dari jumlah penuh padahal hanya menerima sebagian uang."
        }
      ]
    }
  ],
  finalQuiz: {
    title: "Uji Pemahaman Anti-Pinjol Ilegal",
    description: "Uji pemahaman komprehensifmu dengan Quiz Akhir. Jawab 10 soal untuk mendapatkan badge 'Anti-Pinjol Aware'!",
    duration: "5-7 menit",
    questions: [
      {
        id: "FQ-1",
        question: "Berikut ini adalah ciri pinjol LEGAL yang terdaftar di OJK, KECUALI...",
        options: [
          "A. Memiliki nomor izin yang bisa dicek di ojk.go.id",
          "B. Bunga dan biaya diinformasikan secara transparan sebelum pencairan",
          "C. Menawarkan pinjaman melalui SMS/WA kepada nomor yang tidak mendaftar",
          "D. Memiliki alamat kantor fisik yang jelas dan dapat dihubungi"
        ],
        answer: "C",
        explanation: "Pinjol legal DILARANG menawarkan pinjaman melalui SMS, WhatsApp, atau media komunikasi pribadi kepada calon nasabah yang belum mendaftar. Ini adalah larangan tegas dari OJK. Sebaliknya, pinjol ilegal sering menggunakan cara ini untuk menjangkau korban."
      },
      {
        id: "FQ-2",
        question: "Budi ingin meminjam Rp 3.000.000 dari pinjol selama 30 hari. Berdasarkan ketentuan OJK, berapa maksimum bunga yang diperbolehkan dalam periode tersebut?",
        options: [
          "A. Rp 900.000 (bunga 30%)",
          "B. Rp 360.000 (bunga 12%) berdasarkan max 0,4%/hari",
          "C. Rp 1.500.000 (bunga 50%)",
          "D. Tidak ada batasan bunga untuk pinjol"
        ],
        answer: "B",
        explanation: "OJK menetapkan batas maksimum bunga pinjol konsumtif sebesar 0,4% per hari. Untuk 30 hari, total bunga maksimal = 0,4% x 30 = 12% = Rp 360.000. Jika pinjol meminta bunga lebih dari ini, bisa jadi pinjol ilegal."
      },
      {
        id: "FQ-3",
        question: "Saat mengunduh aplikasi pinjol, kamu diminta untuk mengizinkan akses ke seluruh kontak HP, galeri foto, dan SMS. Apa yang sebaiknya kamu lakukan?",
        options: [
          "A. Berikan semua izin karena diperlukan untuk verifikasi identitas",
          "B. Berikan izin kontak saja, tolak akses galeri dan SMS",
          "C. JANGAN berikan izin; ini bukan aplikasi pinjol legal dan segera hapus aplikasi tersebut",
          "D. Berikan izin sementara dan cabut setelah pinjaman cair"
        ],
        answer: "C",
        explanation: "Pinjol legal hanya diizinkan mengakses kamera, mikrofon, dan lokasi - bukan kontak, galeri foto, atau SMS. Permintaan akses ke seluruh kontak dan galeri adalah tanda bahaya pinjol ilegal yang akan menyalahgunakan data untuk mengintimidasi peminjam."
      },
      {
        id: "FQ-4",
        question: "Kamu menemukan aplikasi pinjol baru dan ingin memverifikasi apakah legal. Cara yang PALING TEPAT adalah...",
        options: [
          "A. Membaca ulasan di Google Play Store atau App Store",
          "B. Mengecek di website resmi OJK di ojk.go.id atau menghubungi 157",
          "C. Menanyakan kepada teman yang pernah pakai",
          "D. Melihat jumlah download aplikasi di toko aplikasi"
        ],
        answer: "B",
        explanation: "Satu-satunya cara yang pasti untuk mengecek legalitas pinjol adalah melalui sumber resmi OJK: website ojk.go.id, Call Center 157 (bebas pulsa), atau aplikasi APPK. Ulasan di toko aplikasi, jumlah download, dan rekomendasi teman TIDAK dapat menjamin legalitas."
      },
      {
        id: "FQ-5",
        question: "Debt collector dari pinjol mengirim pesan ke kontak HP kamu, menyebut kamu sebagai penipu dan mengancam akan menyebarkan fotomu. Langkah PERTAMA yang harus kamu lakukan adalah...",
        options: [
          "A. Segera membayar lunas agar ancaman berhenti",
          "B. Memblokir nomor debt collector",
          "C. Screenshot semua bukti ancaman dan segera lapor ke Polri via patrolisiber.id",
          "D. Meminjam uang dari pinjol lain untuk melunasi hutang"
        ],
        answer: "C",
        explanation: "Ancaman penyebaran foto dan intimidasi melalui media elektronik adalah TINDAK PIDANA berdasarkan UU ITE. Langkah pertama adalah mengumpulkan dan menyimpan bukti (screenshot), lalu melaporkan ke Polri. Jangan membayar karena ini hanya akan mendorong pelaku terus mengancam."
      },
      {
        id: "FQ-6",
        question: 'SKENARIO: Dewi (38 tahun, pemilik UMKM) membutuhkan modal tambahan Rp 5.000.000 untuk memenuhi pesanan mendadak. Ia melihat iklan di Instagram: "Pinjaman Kilat! Tanpa agunan, cair 10 menit, bunga rendah!" dengan logo yang mirip OJK. Dewi mengklik link dan diarahkan ke website yang meminta dia mengisi formulir dengan data KTP, foto selfie, nomor rekening, dan mengizinkan akses ke seluruh kontaknya. Setelah mengisi, ia mendapat dana Rp 3.800.000 (bukan Rp 5.000.000, karena dipotong "biaya registrasi" Rp 1.200.000). Kontrak menunjukkan ia harus mengembalikan Rp 7.500.000 dalam 30 hari. Berdasarkan skenario, berapa EFEKTIF bunga yang dikenakan kepada Dewi?',
        options: [
          "A. Sekitar 50% dalam 30 hari - ini normal untuk pinjaman darurat",
          "B. Sekitar 97% dalam 30 hari - ini sangat tidak wajar dan jelas pinjol ilegal",
          "C. Sekitar 20% dalam 30 hari - masih dalam batas wajar",
          "D. Tidak bisa dihitung karena informasinya kurang"
        ],
        answer: "B",
        explanation: "Dana yang diterima Dewi hanya Rp 3.800.000, tapi harus mengembalikan Rp 7.500.000. Selisihnya Rp 3.700.000 atau sekitar 97% dari dana yang diterima dalam 30 hari. Ini jauh melampaui batas OJK (12% untuk 30 hari). Ini adalah tanda jelas pinjol ilegal."
      },
      {
        id: "FQ-7",
        question: "Skenario: Logo yang mirip OJK dalam iklan pinjol tersebut menunjukkan...",
        options: [
          "A. Pinjol tersebut sudah mendapat rekomendasi dari OJK",
          "B. Ini adalah modus penipuan - OJK tidak pernah merekomendasikan atau mensponsori pinjol",
          "C. Pinjol tersebut sedang dalam proses pendaftaran OJK",
          "D. Pinjol tersebut merupakan mitra resmi OJK"
        ],
        answer: "B",
        explanation: "OJK TIDAK PERNAH mencantumkan logonya pada iklan pinjol manapun atau merekomendasikan pinjol tertentu. Penggunaan logo yang mirip OJK adalah modus penipuan untuk memberikan kesan resmi dan legal. Ini adalah tanda bahaya besar - harus segera dicek legalitasnya."
      },
      {
        id: "FQ-8",
        question: "Skenario: Tindakan Dewi memberikan izin akses ke seluruh kontaknya adalah berbahaya karena...",
        options: [
          "A. Aplikasi bisa menguras pulsa dengan menghubungi semua kontak",
          "B. Kontak Dewi bisa digunakan untuk mengintimidasi Dewi jika menunggak, dengan menghubungi keluarga/atasan dan menyebarkan informasi memalukan",
          "C. Aplikasi bisa membajak akun media sosial melalui kontak",
          "D. Tidak ada risiko - akses kontak hanya untuk verifikasi identitas"
        ],
        answer: "B",
        explanation: "Tujuan utama pinjol ilegal mengakses kontak adalah sebagai 'sandera' - jika peminjam tidak bisa bayar, mereka akan menghubungi seluruh kontak dan menyebarkan informasi hutang yang mempermalukan peminjam. Ini adalah bentuk intimidasi yang efektif namun melanggar hukum."
      },
      {
        id: "FQ-9",
        question: "Skenario: Jika Dewi ingin melaporkan kasus ini kepada pihak yang tepat, ke mana ia harus melapor PERTAMA?",
        options: [
          "A. Hanya ke Polisi karena ini kriminal",
          "B. Ke media sosial untuk memperingatkan orang lain",
          "C. Ke OJK via APPK (appk.ojk.go.id) atau Call Center 157 untuk pengaduan konsumen",
          "D. Ke pengacara untuk menempuh jalur hukum perdata"
        ],
        answer: "C",
        explanation: "Langkah pertama adalah melapor ke OJK melalui APPK atau Call Center 157. OJK akan membantu menangani pengaduan dan berkoordinasi dengan pihak berwenang. Jika ada ancaman atau tindak pidana, OJK akan merekomendasikan pelaporan ke Polri."
      },
      {
        id: "FQ-10",
        question: "Skenario: Pelajaran terpenting dari skenario Dewi yang bisa mencegah orang lain mengalami hal yang sama adalah...",
        options: [
          "A. Jangan pernah meminjam uang dari siapapun untuk modal usaha",
          "B. Selalu verifikasi legalitas SEBELUM mengajukan pinjaman - cek di ojk.go.id atau 157",
          "C. Hanya pinjam dari bank konvensional saja",
          "D. Jangan pernah menggunakan media sosial untuk mencari informasi keuangan"
        ],
        answer: "B",
        explanation: "Satu langkah sederhana yang bisa mencegah banyak masalah: VERIFIKASI legalitas terlebih dahulu di ojk.go.id atau melalui Call Center 157 sebelum mengajukan pinjaman. Proses verifikasi hanya butuh beberapa menit tapi bisa mencegah kerugian besar."
      }
    ]
  }
};


const penipuanPathData = {
  preQuiz: {
    questions: [
      {
        question: "Kamu menerima SMS dari nomor tidak dikenal yang mengaku dari bank BCA, berisi link untuk 'verifikasi akun'. Apa yang sebaiknya kamu lakukan?",
        options: [
          "A. Langsung klik link-nya karena mungkin penting",
          "B. Klik link tapi jangan isi data apapun",
          "C. Hapus SMS dan hubungi call center bank resmi untuk konfirmasi",
          "D. Forward ke teman untuk minta pendapat"
        ],
        answer: "C. Hapus SMS dan hubungi call center bank resmi untuk konfirmasi",
        explanation: "Jangan pernah klik link dari SMS mencurigakan. Selalu hubungi call center resmi bank untuk konfirmasi. Ini adalah modus phishing yang sangat umum di Indonesia."
      },
      {
        question: "Investasi dengan ciri 'keuntungan pasti 30% per bulan, tanpa risiko, rekrut anggota baru dapat bonus' adalah contoh dari...",
        options: [
          "A. Investasi reksa dana yang menguntungkan",
          "B. Skema Ponzi / investasi bodong",
          "C. Program tabungan bank yang menggiurkan",
          "D. Fintech lending yang legal"
        ],
        answer: "B. Skema Ponzi / investasi bodong",
        explanation: "Tiga ciri utama investasi bodong: imbal hasil tidak wajar/pasti, tanpa risiko (mustahil dalam investasi nyata), dan sistem rekrut anggota baru (skema Ponzi)."
      },
      {
        question: "Apa yang dimaksud dengan 'deepfake' dalam konteks penipuan?",
        options: [
          "A. Email penipuan yang sulit dideteksi",
          "B. Teknologi pemalsuan video/suara menggunakan AI untuk menipu korban",
          "C. Aplikasi belanja online palsu",
          "D. Nomor rekening palsu penipu"
        ],
        answer: "B. Teknologi pemalsuan video/suara menggunakan AI untuk menipu korban",
        explanation: "Deepfake adalah teknologi AI yang mampu membuat video atau suara palsu yang terlihat/terdengar sangat nyata. Sering digunakan penipu dengan menampilkan wajah pejabat atau selebriti untuk promosi investasi ilegal."
      },
      {
        question: "Kamu menemukan toko online di Instagram menjual HP seharga 50% lebih murah dari harga pasaran, tapi hanya menerima transfer bank dan tidak ada ulasan pembeli. Ini kemungkinan adalah...",
        options: [
          "A. Toko resmi yang sedang promo besar",
          "B. Toko baru yang belum banyak pembeli",
          "C. Penipuan toko online (fake marketplace)",
          "D. Barang bekas yang dijual murah"
        ],
        answer: "C. Penipuan toko online (fake marketplace)",
        explanation: "Harga jauh di bawah pasaran, hanya menerima transfer bank (tidak bisa dispute), dan tidak ada ulasan adalah tanda-tanda classic penipuan toko online. Belanja hanya di marketplace resmi dengan sistem escrow."
      },
      {
        question: "Ke mana kamu harus melapor jika mengalami penipuan yang melibatkan produk keuangan ilegal (pinjol ilegal, investasi bodong)?",
        options: [
          "A. Hanya ke polisi saja",
          "B. Hanya ke OJK saja",
          "C. Ke OJK melalui APPK, Satgas PASTI, dan/atau kepolisian sesuai jenis kasusnya",
          "D. Ke media sosial untuk peringatkan orang lain"
        ],
        answer: "C. Ke OJK melalui APPK, Satgas PASTI, dan/atau kepolisian sesuai jenis kasusnya",
        explanation: "Kanal pelaporan bergantung pada jenis kasus. OJK melalui APPK (157) untuk produk keuangan ilegal, Satgas PASTI untuk pinjol/investasi bodong, dan kepolisian untuk tindak pidana. Ketiganya bisa dilakukan bersamaan."
      }
    ]
  },
  modules: [
    { 
      title: "Jenis-Jenis Scam Digital", 
      duration: "3-5 menit",
      objectives: [
        "Peserta mampu mengenali jenis-jenis scam digital yang umum terjadi",
        "Memahami cara kerjanya"
      ],
      content: `
### Apa itu Scam Digital?
Scam digital adalah upaya penipuan melalui media elektronik untuk mencuri uang, akun, atau data pribadi korban. Pelaku sering menyamar sebagai pihak terpercaya seperti bank, marketplace, perusahaan, atau bahkan anggota keluarga.

### Jenis Scam yang Sering Ditemui
- **Phishing**: Pesan, email, atau website palsu yang meminta korban membuka link dan memasukkan data sensitif.
- **Vishing**: Telepon palsu yang mengatasnamakan pihak resmi untuk meminta OTP, PIN, atau informasi rekening.
- **Smishing**: Phishing melalui SMS atau aplikasi pesan instan.
- **Social engineering**: Manipulasi psikologis agar korban panik, takut, atau tergesa-gesa mengambil keputusan.

### Data yang Tidak Boleh Dibagikan
Jangan pernah membagikan OTP, PIN, password, kode CVV kartu, atau tautan reset akun kepada siapa pun. Petugas resmi tidak akan meminta data rahasia tersebut melalui chat atau telepon.

### Langkah Aman Saat Menerima Pesan Mencurigakan
1. Jangan klik link dan jangan unduh file dari pengirim tidak dikenal.
2. Jangan mengikuti instruksi untuk mentransfer uang atau membagikan kode rahasia.
3. Tutup percakapan, lalu hubungi institusi terkait melalui kanal resminya.
4. Simpan screenshot pesan jika perlu dilaporkan.
      `,
      miniQuiz: [
        {
          id: "MQ1-1",
          question: "Kamu menerima WA dari nomor asing yang mengaku CS BCA, mengatakan ada transaksi mencurigakan di rekeningmu dan meminta kamu menyebutkan kode OTP yang baru saja dikirim ke HP-mu. Apa yang kamu lakukan?",
          options: [
            "A. Berikan kode OTP agar masalah cepat selesai",
            "B. Tolak, tutup chat, dan langsung hubungi Halo BCA 1500888",
            "C. Minta bukti identitas dulu baru berikan OTP",
            "D. Transfer saldo ke rekening lain sebagai tindakan pengamanan"
          ],
          answer: "B. Tolak, tutup chat, dan langsung hubungi Halo BCA 1500888",
          explanation: "OTP adalah kode rahasia yang tidak boleh dibagikan ke siapapun - termasuk yang mengaku petugas bank! Bank resmi tidak pernah meminta OTP melalui WA atau telepon. Segera hubungi call center resmi bank kamu."
        },
        {
          id: "MQ1-2",
          question: "Apa perbedaan utama antara phishing dan vishing?",
          options: [
            "A. Phishing lebih berbahaya dari vishing",
            "B. Phishing dilakukan melalui media tertulis (email/SMS/website), vishing melalui telepon/suara",
            "C. Vishing hanya terjadi di media sosial",
            "D. Keduanya sama saja, hanya beda istilah"
          ],
          answer: "B. Phishing dilakukan melalui media tertulis (email/SMS/website), vishing melalui telepon/suara",
          explanation: "Phishing (dari 'fishing') dilakukan melalui media tertulis digital seperti email, SMS, atau website palsu. Vishing (voice phishing) dilakukan melalui telepon/suara. Keduanya sama-sama berbahaya dan perlu diwaspadai."
        },
        {
          id: "MQ1-3",
          question: "Teknik social engineering yang menciptakan rasa takut atau panik agar korban bertindak cepat tanpa berpikir panjang disebut...",
          options: [
            "A. Baiting",
            "B. Pretexting",
            "C. Urgency/Fear tactic",
            "D. Quid pro quo"
          ],
          answer: "C. Urgency/Fear tactic",
          explanation: "Urgency/Fear tactic adalah teknik menciptakan rasa urgensi atau ketakutan (misalnya: 'Rekening Anda akan diblokir dalam 1 jam!') agar korban panik dan membuat keputusan terburu-buru. Saat kamu merasa panik, berhenti sejenak dan verifikasi informasi terlebih dahulu."
        }
      ]
    },
    { 
      title: "Investasi Bodong Digital", 
      duration: "3-5 menit",
      objectives: [
        "Peserta mampu mengenali ciri-ciri investasi ilegal digital dan membedakannya dari investasi legal"
      ],
      content: `
### Apa itu Investasi Bodong Digital?
Investasi bodong digital adalah penawaran investasi tanpa dasar usaha yang jelas atau tanpa izin yang sesuai. Pelaku memanfaatkan media sosial, grup chat, aplikasi, dan website yang tampak profesional untuk meyakinkan calon korban.

### Gunakan Prinsip 2L: Legal dan Logis
- **Legal**: Periksa apakah pihak yang menawarkan produk memiliki izin dari lembaga berwenang sesuai jenis produknya.
- **Logis**: Nilai apakah keuntungan yang dijanjikan masuk akal. Investasi selalu memiliki risiko dan tidak ada keuntungan besar yang pasti.

### Tanda Bahaya Investasi Bodong
- Menjanjikan profit tinggi, tetap, dan tanpa risiko.
- Meminta transfer cepat karena penawaran disebut terbatas.
- Bonus utama berasal dari merekrut anggota baru.
- Penarikan dana dipersulit atau hanya bisa dilakukan setelah mengajak orang lain.
- Tidak transparan tentang cara kerja bisnis dan penggunaan dana.

### Sebelum Menyetorkan Uang
Jangan hanya percaya pada testimoni, tampilan aplikasi, atau bukti transfer dari anggota lain. Periksa legalitas, pahami produknya, dan hindari keputusan saat sedang ditekan untuk segera bergabung.
      `,
      miniQuiz: [
        {
          id: "MQ2-1",
          question: "Temanmu mengajak bergabung di platform investasi yang menjanjikan profit 3% per hari (90% per bulan), dengan syarat merekrut minimal 3 orang baru agar bisa withdraw. Ini adalah ciri-ciri dari...",
          options: [
            "A. Investasi reksa dana yang agresif",
            "B. Program afiliasi marketplace yang legal",
            "C. Skema Ponzi yang berpotensi ilegal",
            "D. Trading saham dengan leverage tinggi"
          ],
          answer: "C. Skema Ponzi yang berpotensi ilegal",
          explanation: "Kombinasi 3 tanda bahaya sekaligus: profit sangat tinggi dan 'pasti' (tidak ada investasi legal yang menjamin 90%/bulan), sistem rekrut wajib (ciri Ponzi), dan syarat merekrut untuk withdraw (tanda uang bersumber dari investor baru, bukan bisnis nyata)."
        },
        {
          id: "MQ2-2",
          question: "Apa yang dimaksud dengan rumus '2L' dalam mendeteksi investasi bodong menurut OJK?",
          options: [
            "A. Logis dan Lancar",
            "B. Legal dan Logis",
            "C. Lihat dan Laporkan",
            "D. Listing dan Likuiditas"
          ],
          answer: "B. Legal dan Logis",
          explanation: "Rumus 2L OJK: Legal (cek apakah produk/platform punya izin dari OJK, Bappebti, atau lembaga berwenang) dan Logis (apakah imbal hasilnya masuk akal dan wajar). Jika salah satu tidak terpenuhi, jangan investasi."
        },
        {
          id: "MQ2-3",
          question: "Seseorang menawarkan robot trading yang katanya sudah terbukti menghasilkan profit 5% per hari selama 2 tahun. Mana yang BUKAN langkah tepat untuk merespons tawaran ini?",
          options: [
            "A. Cek izin platform di website OJK dan Bappebti",
            "B. Langsung transfer uang untuk mencoba karena sudah 'terbukti'",
            "C. Tanya cara kerja robot-nya secara rinci dan transparan",
            "D. Konsultasi dengan ahli keuangan independen sebelum memutuskan"
          ],
          answer: "B. Langsung transfer uang untuk mencoba karena sudah 'terbukti'",
          explanation: "Tidak ada investasi yang 'terbukti' tanpa risiko. Transfer langsung tanpa verifikasi adalah tindakan berisiko sangat tinggi. Selalu cek legalitas, pahami cara kerjanya, dan konsultasi terlebih dahulu sebelum berinvestasi."
        }
      ]
    },
    { 
      title: "Modus Penipuan Belanja Daring & E-Wallet", 
      duration: "3-5 menit",
      objectives: [
        "Peserta mampu mengenali modus penipuan di platform belanja online dan e-wallet serta cara menghindarinya"
      ],
      content: `
### Penipuan Belanja Daring
Pelaku sering menawarkan barang populer dengan harga jauh di bawah pasaran melalui media sosial atau toko tidak resmi. Setelah korban mentransfer uang, barang tidak dikirim atau korban diarahkan ke link palsu untuk mencuri akun marketplace.

### Tanda Bahaya Saat Berbelanja
- Harga terlalu murah dibandingkan harga pasar.
- Penjual hanya menerima transfer ke rekening pribadi.
- Penjual menolak transaksi melalui marketplace resmi.
- Akun baru dibuat, tidak memiliki ulasan wajar, atau menggunakan foto produk hasil salinan.
- Penjual mendesak korban segera membayar karena stok disebut hampir habis.

### Modus yang Menargetkan E-Wallet
Waspadai chat yang meminta OTP, link hadiah palsu, akun CS palsu, dan modus salah transfer. Bukti transfer berupa gambar belum membuktikan bahwa saldo benar-benar masuk.

### Cara Bertransaksi Lebih Aman
1. Gunakan marketplace dengan sistem perlindungan pembeli atau escrow.
2. Periksa transaksi langsung dari aplikasi, bukan dari screenshot pengirim.
3. Jangan membagikan OTP atau login melalui link dari chat.
4. Untuk kasus salah transfer, hubungi CS resmi agar pengembalian dana tercatat.
      `,
      miniQuiz: [
        {
          id: "MQ3-1",
          question: "Kamu ingin beli sepatu sneakers limited edition seharga Rp 500.000 (harga normal Rp 1.500.000) dari sebuah toko di Instagram. Penjual hanya mau terima transfer ke rekening pribadi dan tidak ada ulasan pembeli. Apa yang sebaiknya kamu lakukan?",
          options: [
            "A. Transfer langsung karena harganya murah, rugi kalau dilewatkan",
            "B. Transfer setengah dulu sebagai uang muka",
            "C. Tidak jadi beli dan cari di marketplace resmi yang memiliki sistem perlindungan pembeli",
            "D. Minta foto KTP penjual sebagai jaminan lalu transfer"
          ],
          answer: "C. Tidak jadi beli dan cari di marketplace resmi yang memiliki sistem perlindungan pembeli",
          explanation: "Harga 67% di bawah pasaran + hanya terima transfer rekening pribadi + tidak ada ulasan = tanda-tanda penipuan yang sangat kuat. KTP pun bisa dipalsukan. Selalu belanja di marketplace resmi yang punya sistem escrow dan perlindungan pembeli."
        },
        {
          id: "MQ3-2",
          question: "Kamu menerima pesan WA dari nomor tidak dikenal yang mengaku customer service Shopee, mengatakan akunmu bermasalah dan meminta kode OTP yang baru saja kamu terima. Ini adalah modus...",
          options: [
            "A. Verifikasi akun yang sah dari Shopee",
            "B. Phishing melalui WhatsApp untuk mencuri akun Shopee-mu",
            "C. Sistem keamanan baru yang wajar",
            "D. Konfirmasi pesanan yang tertunda"
          ],
          answer: "B. Phishing melalui WhatsApp untuk mencuri akun Shopee-mu",
          explanation: "CS marketplace resmi tidak pernah menghubungi melalui WhatsApp dari nomor tidak terverifikasi dan tidak pernah meminta kode OTP. OTP adalah kode one-time yang hanya untuk kamu gunakan sendiri. Bagikan OTP = berikan akses penuh akunmu ke penipu."
        },
        {
          id: "MQ3-3",
          question: "Seseorang tidak dikenal mengirim uang Rp 500.000 ke e-wallet-mu, lalu menghubungimu mengaku 'salah kirim' dan minta dikembalikan. Apa langkah yang paling tepat?",
          options: [
            "A. Langsung kembalikan karena itu hal yang benar",
            "B. Kembalikan tapi minta imbalan lebih",
            "C. Verifikasi dulu melalui aplikasi apakah dana benar-benar masuk, lalu hubungi CS e-wallet untuk prosedur resmi pengembalian dana",
            "D. Abaikan saja karena belum tentu salah kirim"
          ],
          answer: "C. Verifikasi dulu melalui aplikasi apakah dana benar-benar masuk, lalu hubungi CS e-wallet untuk prosedur resmi pengembalian dana",
          explanation: "Modus 'salah transfer' sering menggunakan bukti transfer palsu. Langkah benar: (1) Cek di aplikasi apakah dana benar-benar masuk, (2) Jangan transfer kembali langsung, (3) Hubungi CS e-wallet untuk prosedur resmi agar pengembalian terdokumentasi dan kamu terlindungi."
        }
      ]
    },
    { 
      title: "Deepfake & AI-Generated Scam", 
      duration: "3-5 menit",
      objectives: [
        "Peserta mampu mengenali ancaman deepfake dan konten AI palsu dalam konteks penipuan keuangan"
      ],
      content: `
### Apa itu Deepfake?
Deepfake adalah konten video, gambar, atau suara yang dimanipulasi menggunakan AI agar tampak seperti dibuat oleh orang tertentu. Dalam penipuan keuangan, deepfake dapat digunakan untuk meniru tokoh publik, petugas perusahaan, atasan, atau anggota keluarga.

### Bentuk Penipuan Berbasis AI
- Video tokoh publik yang seolah-olah mempromosikan investasi tertentu.
- Telepon dengan suara kerabat yang meminta transfer darurat.
- Rekaman suara atasan yang meminta pembayaran mendesak.
- Foto atau video palsu untuk membangun identitas penipu.

### Tanda yang Perlu Diperhatikan
- Gerakan bibir dan suara tidak sinkron.
- Kedipan, tepi wajah, atau pencahayaan tampak tidak alami.
- Pesan meminta transfer segera dan melarang korban melakukan verifikasi.
- Konten berasal dari akun tidak resmi atau tidak konsisten dengan pernyataan resmi sebelumnya.

### Cara Memverifikasi
Hubungi orang atau institusi terkait melalui nomor yang sudah tersimpan atau kanal resmi. Untuk permintaan darurat dari keluarga, ajukan pertanyaan personal yang hanya diketahui orang tersebut sebelum mengambil tindakan.
      `,
      miniQuiz: [
        {
          id: "MQ4-1",
          question: "Kamu melihat video di YouTube yang menampilkan Gubernur Bank Indonesia 'berbicara' tentang platform investasi baru yang sangat menguntungkan dan meminta masyarakat segera daftar. Apa yang sebaiknya kamu lakukan?",
          options: [
            "A. Langsung daftar karena Gubernur BI pasti terpercaya",
            "B. Bagikan ke keluarga agar tidak ketinggalan kesempatan",
            "C. Verifikasi ke sumber resmi (website BI, akun BI terverifikasi) apakah video tersebut asli atau deepfake",
            "D. Daftar dengan modal kecil dulu untuk 'test'"
          ],
          answer: "C. Verifikasi ke sumber resmi (website BI, akun BI terverifikasi) apakah video tersebut asli atau deepfake",
          explanation: "Pejabat resmi seperti Gubernur BI tidak pernah merekomendasikan platform investasi spesifik melalui video YouTube tidak resmi. Video tersebut sangat mungkin adalah deepfake. Selalu verifikasi melalui saluran resmi lembaga tersebut."
        },
        {
          id: "MQ4-2",
          question: "Kamu menerima telepon dari suara yang sangat mirip suara adikmu, mengaku sedang dalam masalah dan butuh transfer uang segera Rp 5 juta dalam 1 jam. Apa langkah yang tepat?",
          options: [
            "A. Langsung transfer karena suaranya memang mirip adik",
            "B. Tanya pertanyaan personal yang hanya adikmu tahu, lalu hubungi adikmu melalui nomor HP-nya yang kamu simpan untuk konfirmasi",
            "C. Tolak karena pasti penipuan",
            "D. Transfer setengahnya dulu"
          ],
          answer: "B. Tanya pertanyaan personal yang hanya adikmu tahu, lalu hubungi adikmu melalui nomor HP-nya yang kamu simpan untuk konfirmasi",
          explanation: "Teknologi voice cloning bisa meniru suara seseorang dengan sangat akurat. Langkah tepat: (1) Tanya pertanyaan yang hanya orang tersebut tahu, (2) Hubungi orang tersebut melalui nomor yang sudah kamu simpan sebelumnya (bukan nomor yang menelepon). Jangan transfer sebelum verifikasi identitas."
        },
        {
          id: "MQ4-3",
          question: "Manakah dari tanda-tanda berikut yang BUKAN indikasi bahwa sebuah video kemungkinan adalah deepfake?",
          options: [
            "A. Gerakan mulut tidak sinkron dengan suara",
            "B. Video tersebut diunggah oleh akun resmi terverifikasi dengan centang biru dan konsisten dengan pernyataan resmi sebelumnya",
            "C. Tepi wajah terlihat blur dan tidak alami",
            "D. Kedipan mata tidak natural atau terlalu jarang"
          ],
          answer: "B. Video tersebut diunggah oleh akun resmi terverifikasi dengan centang biru dan konsisten dengan pernyataan resmi sebelumnya",
          explanation: "Akun resmi terverifikasi yang konsisten dengan track record sebelumnya justru merupakan indikator konten ASLI, bukan deepfake. Deepfake biasanya diunggah oleh akun tidak resmi/mencurigakan, dan memiliki tanda-tanda teknis seperti sinkronisasi mulut-suara yang buruk, tepi wajah blur, atau kedipan tidak natural."
        }
      ]
    },
    { 
      title: "Cara Melaporkan & Melindungi Diri", 
      duration: "3-5 menit",
      objectives: [
        "Peserta mengetahui langkah-langkah konkret untuk melaporkan penipuan digital dan melindungi diri dari ancaman serupa"
      ],
      content: `
### Jika Kamu Menjadi Korban
Tindakan cepat dapat membantu membatasi kerugian dan menjaga bukti. Jangan menghapus percakapan atau buru-buru mengikuti instruksi lanjutan dari pelaku.

### Langkah Penanganan Awal
1. Hentikan komunikasi dengan pelaku dan jangan melakukan transfer tambahan.
2. Simpan screenshot chat, nomor telepon, alamat website, bukti transaksi, dan kronologi kejadian.
3. Hubungi bank atau penyedia e-wallet melalui kanal resmi untuk mengamankan akun dan menanyakan prosedur penanganan transaksi.
4. Ganti password akun terdampak dan aktifkan autentikasi dua faktor (2FA).

### Kanal Pelaporan
- **OJK dan APPK**: Untuk pengaduan terkait produk atau aktivitas keuangan ilegal.
- **Satgas PASTI**: Untuk informasi mengenai aktivitas keuangan ilegal seperti investasi bodong dan pinjol ilegal.
- **Kepolisian**: Untuk dugaan tindak pidana seperti penipuan, pemerasan, atau ancaman.
- **Platform terkait**: Laporkan akun, toko, iklan, atau tautan palsu agar dapat ditindaklanjuti.

### Kebiasaan Perlindungan Diri
Gunakan password berbeda untuk setiap akun penting, aktifkan 2FA, periksa alamat website sebelum login, dan selalu verifikasi permintaan uang melalui kanal komunikasi kedua.
      `,
      miniQuiz: [
        {
          id: "MQ5-1",
          question: "Kamu baru sadar telah menjadi korban penipuan investasi bodong dan sudah transfer Rp 10 juta. Urutan langkah pertama yang paling tepat adalah...",
          options: [
            "A. Langsung posting di media sosial untuk memperingatkan orang lain",
            "B. Kumpulkan semua bukti, hubungi bank untuk blokir rekening, lalu lapor ke OJK/APPK dan kepolisian",
            "C. Tunggu dulu siapa tahu uangnya dikembalikan",
            "D. Hubungi penipu langsung dan minta uang kembali"
          ],
          answer: "B. Kumpulkan semua bukti, hubungi bank untuk blokir rekening, lalu lapor ke OJK/APPK dan kepolisian",
          explanation: "Urutan yang benar: (1) Amankan diri — kumpulkan bukti, blokir akun yang terdampak, (2) Lapor resmi — ke OJK/APPK untuk produk keuangan ilegal dan ke polisi untuk tindak pidana. Posting di medsos boleh dilakukan tapi bukan prioritas pertama dan perlu hati-hati agar tidak dianggap fitnah."
        },
        {
          id: "MQ5-2",
          question: "Nomor dan kanal resmi OJK untuk pengaduan konsumen adalah...",
          options: [
            "A. 157 / WhatsApp 081157157157 / www.ojk.go.id/APPK",
            "B. 1500257 / www.bi.go.id",
            "C. 110 / www.polri.go.id",
            "D. 021-5252555 / www.kominfo.go.id"
          ],
          answer: "A. 157 / WhatsApp 081157157157 / www.ojk.go.id/APPK",
          explanation: "Kontak resmi OJK: Call Center 157, WhatsApp 081157157157, dan pengaduan online melalui APPK di www.ojk.go.id. Nomor lain yang disebutkan adalah milik BI (Bank Indonesia), Polri, dan Kominfo — masing-masing punya fungsi berbeda."
        },
        {
          id: "MQ5-3",
          question: "Manakah langkah yang PALING PENTING untuk mencegah akun digitalmu diretas?",
          options: [
            "A. Menggunakan password yang sama di semua akun agar mudah diingat",
            "B. Hanya login dari perangkat pribadi",
            "C. Mengaktifkan autentikasi dua faktor (2FA) di semua akun penting",
            "D. Tidak pernah menggunakan aplikasi perbankan digital"
          ],
          answer: "C. Mengaktifkan autentikasi dua faktor (2FA) di semua akun penting",
          explanation: "Autentikasi dua faktor (2FA) adalah lapisan keamanan ekstra yang memastikan bahwa bahkan jika password kamu bocor, peretas tetap tidak bisa masuk tanpa kode verifikasi kedua. Ini adalah satu tindakan keamanan paling efektif yang bisa dilakukan setiap orang."
        }
      ]
    },
  ],
  finalQuiz: {
    questions: [
      {
        id: "FQ1",
        question: "Berikut adalah ciri-ciri phishing, KECUALI...",
        options: [
          "A. Mengirim link melalui SMS atau email",
          "B. Meminta data sensitif seperti OTP dan PIN",
          "C. Menggunakan domain resmi perusahaan yang terverifikasi dengan protokol keamanan SSL penuh",
          "D. Menciptakan urgensi agar korban segera bertindak"
        ],
        answer: "C. Menggunakan domain resmi perusahaan yang terverifikasi dengan protokol keamanan SSL penuh",
        explanation: "Phishing selalu menggunakan domain PALSU yang dibuat mirip domain asli. Website phishing memang bisa menggunakan HTTPS (SSL), tapi nama domainnya berbeda dari domain resmi. Misalnya: 'bca-secure.com' bukan 'bca.co.id'. Website resmi perusahaan memiliki domain yang konsisten dan terverifikasi."
      },
      {
        id: "FQ2",
        question: "Investasi yang menjanjikan return 10% per minggu (520% setahun!) kemungkinan besar adalah...",
        options: [
          "A. Investasi saham yang sangat berhasil",
          "B. Reksa dana dengan strategi agresif",
          "C. Skema Ponzi atau investasi bodong",
          "D. Obligasi korporasi dengan kupon tinggi"
        ],
        answer: "C. Skema Ponzi atau investasi bodong",
        explanation: "Return 520% per tahun adalah tidak mungkin dan tidak logis dalam investasi legal manapun. Sebagai perbandingan, reksa dana saham terbaik Indonesia rata-rata 15-25% per tahun. Return tidak wajar adalah tanda paling kuat dari investasi bodong."
      },
      {
        id: "FQ3",
        question: "Seorang penipu meneleponmu menggunakan suara yang terdengar persis seperti suara ibumu, meminta transfer uang segera. Teknologi yang kemungkinan digunakan adalah...",
        options: [
          "A. Phishing",
          "B. Social engineering biasa",
          "C. Voice cloning berbasis AI",
          "D. SIM swapping"
        ],
        answer: "C. Voice cloning berbasis AI",
        explanation: "Voice cloning adalah teknologi AI yang dapat meniru suara seseorang dari rekaman audio singkat. Penipu menggunakannya untuk menipu anggota keluarga atau kolega. Selalu verifikasi identitas penelepon melalui nomor yang sudah kamu kenal sebelum mentransfer uang."
      },
      {
        id: "FQ4",
        question: "Kamu ingin berbelanja online. Manakah platform yang PALING AMAN untuk bertransaksi?",
        options: [
          "A. Toko di Instagram yang punya followers banyak",
          "B. Website dengan tampilan profesional yang baru kamu temukan",
          "C. Marketplace resmi (Tokopedia/Shopee/Lazada) dengan sistem escrow dan rekening bersama",
          "D. Grup Facebook jual-beli dengan admin aktif"
        ],
        answer: "C. Marketplace resmi (Tokopedia/Shopee/Lazada) dengan sistem escrow dan rekening bersama",
        explanation: "Marketplace resmi dengan sistem escrow memastikan uang pembeli ditahan dulu sampai barang diterima — ini melindungi pembeli dari penjual penipu. Followers banyak, tampilan profesional, atau admin aktif tidak menjamin keamanan transaksi."
      },
      {
        id: "FQ5",
        question: "Satgas PASTI yang dibentuk OJK berfungsi untuk...",
        options: [
          "A. Mengawasi perbankan konvensional",
          "B. Menangani pengaduan kartu kredit",
          "C. Penanganan aktivitas keuangan ilegal termasuk pinjol ilegal dan investasi bodong",
          "D. Mengatur kebijakan suku bunga"
        ],
        answer: "C. Penanganan aktivitas keuangan ilegal termasuk pinjol ilegal dan investasi bodong",
        explanation: "Satgas PASTI (Penanganan Aktivitas Keuangan Ilegal) adalah satuan tugas OJK yang bertugas khusus menangani dan memberantas aktivitas keuangan ilegal seperti pinjol ilegal, investasi bodong, dan entitas keuangan tanpa izin."
      },
      {
        id: "FQ6",
        question: "Manakah yang BUKAN merupakan tanda-tanda deepfake video?",
        options: [
          "A. Gerakan bibir tidak sinkron dengan suara",
          "B. Video diunggah oleh akun resmi terverifikasi yang sudah lama aktif dan konsisten",
          "C. Kedipan mata tidak natural",
          "D. Pencahayaan wajah tidak konsisten dengan latar belakang"
        ],
        answer: "B. Video diunggah oleh akun resmi terverifikasi yang sudah lama aktif dan konsisten",
        explanation: "Akun resmi terverifikasi yang sudah lama aktif dan konsisten justru merupakan indikator konten ASLI. Tanda-tanda teknis deepfake meliputi sinkronisasi mulut-suara yang buruk, kedipan tidak natural, dan pencahayaan yang tidak konsisten."
      },
      {
        id: "FQ7",
        question: "Apa yang sebaiknya PERTAMA kali dilakukan jika menyadari akun e-wallet kamu diretas?",
        options: [
          "A. Screenshot semua transaksi lalu posting di Twitter/X",
          "B. Hubungi CS e-wallet melalui kanal resmi untuk blokir akun dan laporkan kejadian",
          "C. Coba login ulang berulang kali",
          "D. Tunggu 24 jam untuk melihat perkembangannya"
        ],
        answer: "B. Hubungi CS e-wallet melalui kanal resmi untuk blokir akun dan laporkan kejadian",
        explanation: "Tindakan pertama adalah menghentikan kerugian lebih lanjut dengan segera memblokir akun melalui CS resmi. Posting di media sosial bisa dilakukan setelahnya, tapi bukan prioritas pertama. Mencoba login ulang bisa memperburuk situasi jika perangkatmu sudah terkompromi."
      },
      {
        id: "FQ8",
        question: "Rumus '2L' OJK untuk menilai legalitas investasi adalah...",
        options: [
          "A. Logis dan Lancar",
          "B. Listing dan Likuiditas",
          "C. Legal dan Logis",
          "D. Legalitas dan Laporan"
        ],
        answer: "C. Legal dan Logis",
        explanation: "Rumus 2L OJK: Legal = cek izin di OJK/Bappebti; Logis = apakah imbal hasilnya masuk akal? Jika salah satu tidak terpenuhi, jangan investasi. Ini adalah cara cepat mendeteksi investasi bodong."
      },
      {
        id: "FQ9",
        question: "Seseorang mengaku dari 'Tim Keamanan OJK' meneleponmu dan meminta untuk memberikan nomor rekening dan saldo tabungan untuk 'verifikasi keamanan'. Ini adalah modus...",
        options: [
          "A. Prosedur standar OJK yang harus diikuti",
          "B. Vishing (voice phishing) yang mengatasnamakan OJK",
          "C. Pemeriksaan pajak yang sah",
          "D. Audit keuangan dari pemerintah"
        ],
        answer: "B. Vishing (voice phishing) yang mengatasnamakan OJK",
        explanation: "OJK tidak pernah menghubungi nasabah secara proaktif untuk meminta data rekening atau saldo. Ini adalah vishing klasik yang memanfaatkan nama OJK. Segera tutup telepon dan hubungi OJK di 157 untuk melaporkan nomor penipu tersebut."
      },
      {
        id: "FQ10",
        question: "Untuk melaporkan penipuan online yang melibatkan tindak pidana (transfer paksa, pemerasan), kamu harus melapor ke...",
        options: [
          "A. Hanya ke OJK saja",
          "B. Hanya ke Kominfo saja",
          "C. Bareskrim Polri melalui patrolisiber.id atau nomor 110",
          "D. Langsung ke pengadilan"
        ],
        answer: "C. Bareskrim Polri melalui patrolisiber.id atau nomor 110",
        explanation: "Untuk tindak pidana siber seperti transfer paksa, pemerasan, atau penipuan online, pelaporan ke kepolisian (Bareskrim Siber) melalui patrolisiber.id atau 110 adalah jalur yang tepat. Pelaporan ke OJK juga bisa dilakukan jika melibatkan produk keuangan ilegal — keduanya bisa paralel."
      },
      {
        id: "FQ11",
        question: "SKENARIO 1: Budi (35 tahun) menerima iklan di Instagram yang menampilkan video 'Menteri Keuangan' merekomendasikan platform investasi 'GoldProfit' dengan return 25% per bulan. Tertarik, Budi mengklik link di bio, diarahkan ke website yang tampak profesional dengan domain 'goldprofit-investasi.com'. Dia didaftar oleh seorang 'agen' melalui WhatsApp yang memintanya untuk transfer Rp 5 juta sebagai modal awal, dengan janji bisa withdraw kapan saja. Bonus tambahan jika merekrut 3 teman. Dari skenario di atas, ada berapa tanda bahaya (red flag) yang bisa kamu identifikasi, dan apa tindakan tepat Budi?",
        options: [
          "A. 1 red flag: hanya soal return yang tinggi. Budi sebaiknya coba dulu dengan modal kecil",
          "B. 3 red flag: video tokoh pejabat, return tidak wajar, dan sistem rekrut. Budi harus segera cek legalitas di OJK dan tidak transfer",
          "C. 5+ red flag: video deepfake pejabat, return 25%/bulan tidak masuk akal, domain mencurigakan, sistem rekrut MLM, dan tidak ada informasi izin OJK. Budi harus tidak transfer, laporkan ke OJK dan Bareskrim Siber",
          "D. 2 red flag: domain dan sistem rekrut. Boleh coba jika Budi sudah cek website-nya terlihat bagus"
        ],
        answer: "C. 5+ red flag: video deepfake pejabat, return 25%/bulan tidak masuk akal, domain mencurigakan, sistem rekrut MLM, dan tidak ada informasi izin OJK. Budi harus tidak transfer, laporkan ke OJK dan Bareskrim Siber",
        explanation: "Ada 5+ red flag dalam skenario ini: (1) Video deepfake pejabat di iklan Instagram — pejabat tidak pernah merekomendasikan investasi di media sosial; (2) Return 25%/bulan = 300%/tahun, jauh di atas wajar; (3) Domain 'goldprofit-investasi.com' bukan domain resmi; (4) Sistem rekrut = ciri skema Ponzi; (5) Tidak ada informasi izin OJK/Bappebti. Budi TIDAK BOLEH transfer dan harus melaporkan platform ini ke OJK (157) dan Bareskrim Siber (patrolisiber.id)."
      },
      {
        id: "FQ12",
        question: "SKENARIO 2: Siti (20 tahun, mahasiswa) berbelanja di toko Instagram yang menjual skincare impor seharga 60% lebih murah dari harga resmi. Penjual memintanya transfer ke rekening atas nama perorangan. Setelah transfer Rp 800.000, Siti tidak mendapat konfirmasi pengiriman. Saat Siti mencoba menghubungi penjual melalui WA, dia malah menerima pesan dari nomor berbeda yang mengaku 'CS Toko', memintanya klik link untuk 'cek status pesanan'. Siti mengklik link tersebut dan diarahkan ke halaman yang meminta login akun Tokopedia-nya. Jika kamu adalah Siti, langkah mana yang paling tepat setelah menyadari potensi penipuan ini?",
        options: [
          "A. Login di link tersebut untuk benar-benar cek status pesanan",
          "B. Transfer uang lagi karena mungkin pesanan pertama bermasalah",
          "C. JANGAN klik/login di link mencurigakan, segera ganti password Tokopedia, laporkan ke platform Tokopedia, dan buat laporan polisi dengan membawa bukti transfer dan percakapan",
          "D. Biarkan saja karena jumlahnya tidak terlalu besar"
        ],
        answer: "C. JANGAN klik/login di link mencurigakan, segera ganti password Tokopedia, laporkan ke platform Tokopedia, dan buat laporan polisi dengan membawa bukti transfer dan percakapan",
        explanation: "Siti sedang menghadapi serangan berlapis: (1) Penipuan toko online palsu (sudah terjadi); (2) Serangan sedang diserang dengan phishing link untuk mencuri akun Tokopedia-nya. JANGAN klik/login di link tersebut. Langkah: (1) Jangan login di link mencurigakan, (2) Langsung ganti password Tokopedia dan aktifkan 2FA, (3) Laporkan ke Tokopedia dengan bukti, (4) Buat laporan polisi di kantor polisi terdekat atau patrolisiber.id dengan membawa bukti transfer dan screenshot percakapan."
      }
    ]
  }
};



const learningPaths = {
  pinjol: pinjolPathData,
  penipuan: {
    id: "penipuan",
    title: "Learning Path 2: Penipuan Digital & Aktivitas Keuangan Ilegal",
    description: "Pelajari cara mengenali phishing, social engineering, investasi bodong, penipuan belanja daring, e-wallet, deepfake, dan kanal pelaporan resmi.",
    ...penipuanPathData,
    preQuiz: {
      title: "Tes Pengetahuan Awal Penipuan Digital",
      description: "Ukur pemahaman awal tentang penipuan digital sebelum memulai modul.",
      duration: "3-5 menit",
      ...penipuanPathData.preQuiz,
    },
    finalQuiz: {
      title: "Uji Pemahaman Penipuan Digital",
      description: "Jawab quiz akhir untuk menguji pemahaman tentang scam digital dan aktivitas keuangan ilegal.",
      duration: "7-10 menit",
      ...penipuanPathData.finalQuiz,
    },
  },
};

module.exports = { learningPaths };
