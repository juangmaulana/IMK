export const penipuanPathData = {
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
