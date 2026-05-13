export const pinjolPathData = {
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
