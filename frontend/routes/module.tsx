import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ChevronLeft, AlertTriangle, ShieldCheck, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pinjolPathData } from "@/data/pinjol-content";
import { penipuanPathData } from "@/data/penipuan-content";

export const Route = createFileRoute("/module")({
  component: ModulePage,
});

function ModulePage() {
  const nav = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const moduleId = parseInt(searchParams.get("id") || "1", 10);
  const pathId = searchParams.get("pathId") || "pinjol";
  const progressKey = `${pathId}Progress`;

  // For now, map pathId to content (can be expanded later)
  const allData: Record<string, any> = {
    pinjol: pinjolPathData,
    penipuan: penipuanPathData
  };
  const pathData = allData[pathId] || pinjolPathData;
  const moduleIndex = moduleId - 1;
  const moduleData = pathData.modules[moduleIndex];

  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [moduleId]);

  if (!moduleData) {
    return <div>Module not found</div>;
  }

  const handleAnswer = (qId: string, optIndex: number) => {
    if (showResults) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const checkQuiz = () => {
    setShowResults(true);
  };

  const finishModule = () => {
    // Update progress
    const currentProgress = Number(localStorage.getItem(progressKey) || 0);
    const newProgress = moduleId + 1; // if modul 1 finished, progress becomes 2
    if (newProgress > currentProgress) {
      localStorage.setItem(progressKey, newProgress.toString());
    }
    nav({ to: `/app/paths/${pathId}` });
  };

  // Custom renderer for Modul 1 to match the exact design
  if (moduleId === 1 && pathId === "pinjol") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
        {/* Header */}
        <div className="bg-[#1f4e79] px-6 py-8 text-center text-white">
          <Link to={`/app/paths/${pathId}` as any} className="absolute left-4 top-6 flex items-center text-white/80 hover:text-white">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <div className="text-sm font-bold tracking-widest text-white/80 uppercase">MODUL 1</div>
          <h1 className="mt-2 text-2xl font-bold leading-tight">{moduleData.title}</h1>
          <div className="mt-2 text-sm text-white/80 italic">Durasi: {moduleData.duration}</div>
        </div>

        <div className="mx-auto max-w-3xl space-y-8 px-6 py-8">
          {/* Tujuan Pembelajaran */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Tujuan Pembelajaran</h2>
            <p className="mt-2 text-sm">Setelah menyelesaikan modul ini, pengguna mampu:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
              {moduleData.objectives?.map((obj: string, i: number) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </section>

          {/* Apa itu Pinjol? */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Apa itu Pinjol?</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Pinjaman online (pinjol) atau Layanan Pendanaan Bersama Berbasis Teknologi Informasi (LPBBTI) adalah layanan pinjam-meminjam uang berbasis teknologi informasi yang mempertemukan pemberi dana dengan penerima dana secara langsung melalui platform digital.
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              Pinjol yang legal wajib terdaftar dan mendapat izin dari Otoritas Jasa Keuangan (OJK). Hingga 2025, terdapat puluhan perusahaan fintech lending yang resmi terdaftar di OJK dan masuk dalam kategori Pelaku Usaha Jasa Keuangan (PUJK).
            </p>

            {/* Peringatan Alert */}
            <div className="mt-4 rounded border-l-4 border-[#c0392b] bg-[#e74c3c] p-4 text-white">
              <div className="font-bold">Peringatan!</div>
              <p className="mt-1 text-sm">
                Penting: Hanya pinjol yang terdaftar atau berizin OJK yang boleh beroperasi di Indonesia. Pinjol ilegal adalah pinjol yang tidak memiliki izin dari OJK dan beroperasi secara sembunyi-sembunyi, seringkali merugikan konsumen.
              </p>
            </div>
          </section>

          {/* Perbedaan Pinjol Legal vs Ilegal */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Perbedaan Pinjol Legal vs Ilegal</h2>
            <div className="mt-4 flex flex-col overflow-hidden rounded-md border border-border sm:flex-row">
              <div className="flex-1 bg-[#e8f4f8] p-4">
                <h3 className="font-bold text-[#1f4e79]">PINJOL LEGAL</h3>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>Terdaftar/berizin OJK</li>
                  <li>Bunga & biaya transparan dan wajar</li>
                  <li>Tenor dan angsuran jelas di awal</li>
                  <li>Penagihan etis sesuai aturan OJK</li>
                  <li>Privasi data dijaga sesuai UU PDP</li>
                  <li>Alamat kantor fisik jelas</li>
                  <li>Ada kanal pengaduan resmi</li>
                </ul>
              </div>
              <div className="flex-1 bg-[#fadbd8] p-4">
                <h3 className="font-bold text-[#c0392b]">PINJOL ILEGAL</h3>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>Tidak terdaftar di OJK</li>
                  <li>Bunga sangat tinggi & tidak transparan</li>
                  <li>Biaya tersembunyi, tidak ada kepastian tenor</li>
                  <li>Debt collector kasar, ancaman & intimidasi</li>
                  <li>Minta akses semua data di HP (kontak, foto)</li>
                  <li>Tidak ada alamat atau kantor fiktif</li>
                  <li>Tidak ada mekanisme pengaduan</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Ciri-Ciri Pinjol Ilegal */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Ciri-Ciri Pinjol Ilegal</h2>
            <p className="mt-2 text-sm">Kenali 8 ciri utama pinjol ilegal berikut ini:</p>
            <div className="mt-4 overflow-x-auto rounded-md border border-border">
              <table className="w-full text-left text-sm text-slate-800">
                <thead className="bg-[#c0392b] text-white">
                  <tr>
                    <th className="p-3 text-center w-12">No</th>
                    <th className="p-3 w-1/3">Ciri</th>
                    <th className="p-3">Penjelasan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-[#fadbd8]/30">
                  <tr>
                    <td className="p-3 text-center font-bold text-[#c0392b]">1</td>
                    <td className="p-3 font-bold">Tidak terdaftar di OJK</td>
                    <td className="p-3">Tidak memiliki izin resmi. Cek di ojk.go.id atau kontak 157.</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-center font-bold text-[#c0392b]">2</td>
                    <td className="p-3 font-bold">Penawaran lewat SMS/WA spam</td>
                    <td className="p-3">Pinjol legal tidak boleh menawarkan langsung melalui pesan pribadi.</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-center font-bold text-[#c0392b]">3</td>
                    <td className="p-3 font-bold">Bunga sangat tinggi</td>
                    <td className="p-3">Bunga harian bisa mencapai 1-5%, jauh di atas batas OJK (0,4%/hari untuk konsumtif).</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-center font-bold text-[#c0392b]">4</td>
                    <td className="p-3 font-bold">Akses semua kontak HP</td>
                    <td className="p-3">Meminta izin akses kontak untuk menekan peminjam yang menunggak.</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-center font-bold text-[#c0392b]">5</td>
                    <td className="p-3 font-bold">Proses pencairan sangat cepat tanpa verifikasi</td>
                    <td className="p-3">Tidak ada analisis kredit; uang diberikan tanpa persyaratan wajar.</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-center font-bold text-[#c0392b]">6</td>
                    <td className="p-3 font-bold">Syarat pinjaman tidak jelas</td>
                    <td className="p-3">Bunga, biaya, dan tenor tidak dijelaskan sebelum pencairan.</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-center font-bold text-[#c0392b]">7</td>
                    <td className="p-3 font-bold">Penagihan kasar dan mengancam</td>
                    <td className="p-3">Debt collector virtual mengirim ancaman, foto memalukan, ke kontak peminjam.</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-center font-bold text-[#c0392b]">8</td>
                    <td className="p-3 font-bold">Tidak ada alamat fisik yang jelas</td>
                    <td className="p-3">Kantor tidak dapat ditemukan, hanya beroperasi via aplikasi.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Cara Cek Legalitas Pinjol */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Cara Cek Legalitas Pinjol</h2>
            <p className="mt-2 text-sm">Selalu verifikasi legalitas sebelum menggunakan layanan pinjol:</p>
            <ol className="mt-2 list-inside list-decimal space-y-1 text-sm">
              <li>Kunjungi website resmi OJK: www.ojk.go.id - buka menu 'IKNB' {'>'} 'Fintech' {'>'} 'Daftar Penyelenggara'</li>
              <li>Hubungi Call Center OJK di nomor 157 (bebas pulsa)</li>
              <li>Kirim email ke konsumen@ojk.go.id dengan menyertakan nama aplikasi/platform</li>
              <li>Gunakan aplikasi APPK (Aplikasi Portal Perlindungan Konsumen) di appk.ojk.go.id</li>
              <li>Cek melalui media sosial resmi OJK (@ojkindonesia)</li>
            </ol>

            {/* Tips Aman Alert */}
            <div className="mt-4 rounded border-l-4 border-[#27ae60] bg-[#2ecc71] p-4 text-white">
              <div className="font-bold flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Tips Aman</div>
              <p className="mt-1 text-sm">
                Ingat: Jika ragu, JANGAN pinjam dulu! Verifikasi legalitas adalah langkah pertama yang wajib dilakukan. Lebih baik menunggu beberapa menit untuk verifikasi daripada terjebak dalam pinjol ilegal.
              </p>
            </div>
          </section>

          {/* Regulasi */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Regulasi yang Mengatur Pinjol</h2>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
              <li>POJK No. 10/POJK.05/2022 tentang Layanan Pendanaan Bersama Berbasis Teknologi Informasi (LPBBTI)</li>
              <li>POJK No. 22/POJK.07/2020 tentang Perlindungan Konsumen Sektor Jasa Keuangan</li>
              <li>UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi</li>
              <li>SE OJK No. 19/SEOJK.06/2023 tentang Penyelenggaraan LPBBTI</li>
            </ul>
          </section>

          {/* Ringkasan */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Ringkasan Modul 1</h2>
            <div className="mt-2 rounded-md border border-[#9ac2db] bg-[#eef5fa] p-4">
              <div className="font-bold text-[#1f4e79]">Poin Kunci</div>
              <p className="mt-1 text-sm text-slate-700">
                Pinjol legal wajib terdaftar/berizin OJK, transparan soal bunga dan biaya, serta menjaga privasi data. Pinjol ilegal tidak memiliki izin, menerapkan bunga mencekik, dan menggunakan cara penagihan yang kasar. Selalu cek legalitas di ojk.go.id atau hubungi 157 sebelum meminjam.
              </p>
            </div>
          </section>

          {/* Mini Quiz */}
          <div className="mt-12 rounded-xl border-2 border-[#1f4e79] overflow-hidden bg-white">
            <div className="bg-[#1f4e79] p-4 text-center text-white">
              <h2 className="font-bold">MINI-QUIZ MODUL 1</h2>
              <div className="text-xs italic text-white/80 mt-1">3 Soal · Skor lulus: ≥2 benar · +50 poin jika lulus</div>
            </div>

            <div className="p-6 space-y-8">
              {moduleData.miniQuiz?.map((quiz: any, index: number) => {
                const correctIndex = quiz.answer.charCodeAt(0) - 65;
                const answeredIndex = quizAnswers[quiz.id];

                return (
                  <div key={quiz.id} className="rounded-md border bg-[#eef5fa]/30 p-4">
                    <h3 className="font-bold text-[#1f4e79]">Soal {quiz.id}: {quiz.question}</h3>
                    <div className="mt-4 space-y-2">
                      {quiz.options.map((opt: string, i: number) => {
                        const isPicked = answeredIndex === i;
                        const isCorrect = showResults && correctIndex === i;
                        const isWrongPicked = showResults && isPicked && correctIndex !== i;

                        let btnClass = "border-border bg-white text-slate-800 text-left hover:border-primary/50";
                        if (isCorrect) btnClass = "border-[#27ae60] bg-[#27ae60]/10 text-[#27ae60] font-medium";
                        else if (isWrongPicked) btnClass = "border-[#c0392b] bg-[#c0392b]/10 text-[#c0392b] font-medium";
                        else if (isPicked && !showResults) btnClass = "border-[#1f4e79] bg-[#1f4e79]/10 text-[#1f4e79] font-medium";

                        return (
                          <button
                            key={i}
                            onClick={() => handleAnswer(quiz.id, i)}
                            className={`w-full rounded-md border p-3 text-sm transition-colors ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {showResults && (
                      <div className="mt-4 rounded-md bg-[#e8f4f8] p-3 text-sm border-l-4 border-[#1f4e79]">
                        <div className="font-bold text-[#27ae60]">Jawaban Benar: {quiz.answer}</div>
                        <div className="mt-1 text-slate-700 italic">Pembahasan: {quiz.explanation}</div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 flex justify-center">
                {!showResults ? (
                  <Button
                    onClick={checkQuiz}
                    className="w-full max-w-sm bg-[#1f4e79] hover:bg-[#1a4266]"
                    disabled={Object.keys(quizAnswers).length < (moduleData.miniQuiz?.length || 0)}
                  >
                    Kumpulkan Jawaban
                  </Button>
                ) : (
                  <div className="w-full">
                    <div className="rounded-md border border-[#b2ebf2] bg-[#e0f7fa] p-4 text-center">
                      <div className="font-bold text-[#006064]">Modul 1 Selesai! Modul 2 Terbuka.</div>
                      <p className="mt-1 text-sm text-[#00838f]">
                        Lanjut ke Modul 2 untuk memahami risiko nyata yang bisa terjadi jika terjebak pinjol ilegal — termasuk jebakan bunga, intimidasi debt collector, dan penyalahgunaan data pribadi.
                      </p>
                    </div>
                    <Button onClick={finishModule} className="mt-6 w-full bg-[#1f4e79] hover:bg-[#1a4266]" size="lg">
                      Selesai & Lanjut ke Modul 2
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (moduleId === 2 && pathId === "pinjol") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
        {/* Header */}
        <div className="bg-[#c0392b] px-6 py-8 text-center text-white">
          <Link to={`/app/paths/${pathId}` as any} className="absolute left-4 top-6 flex items-center text-white/80 hover:text-white">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <div className="text-sm font-bold tracking-widest text-white/80 uppercase">MODUL 2</div>
          <h1 className="mt-2 text-2xl font-bold leading-tight">{moduleData.title}</h1>
          <div className="mt-2 text-sm text-white/80 italic">Durasi: {moduleData.duration}</div>
        </div>

        <div className="mx-auto max-w-3xl space-y-8 px-6 py-8">
          {/* Tujuan Pembelajaran */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Tujuan Pembelajaran</h2>
            <p className="mt-2 text-sm">Setelah menyelesaikan modul ini, pengguna mampu:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
              {moduleData.objectives?.map((obj: string, i: number) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </section>

          {/* Risiko 1 */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Risiko 1: Bunga dan Biaya yang Mencekik</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Pinjol ilegal seringkali menerapkan bunga yang sangat tinggi dan biaya tersembunyi yang tidak diinformasikan di awal peminjaman.
            </p>

            <div className="mt-4 flex flex-col overflow-hidden rounded-md border border-border sm:flex-row">
              <div className="flex-1 bg-[#e8f4f8]">
                <h3 className="bg-[#1f4e79] p-3 font-bold text-white">Pinjol Legal (Batas OJK)</h3>
                <ul className="p-4 space-y-1 text-sm">
                  <li>Bunga max 0,4%/hari (konsumtif)</li>
                  <li>Biaya admin transparan</li>
                  <li>Total biaya max 0,4% x tenor hari</li>
                  <li>Tidak ada biaya tersembunyi</li>
                </ul>
              </div>
              <div className="flex-1 bg-[#fadbd8]">
                <h3 className="bg-[#c0392b] p-3 font-bold text-white">Pinjol Ilegal (Kenyataan)</h3>
                <ul className="p-4 space-y-1 text-sm">
                  <li>Bunga bisa 1-5%/hari atau lebih</li>
                  <li>Biaya admin dipotong di awal (besar)</li>
                  <li>Bunga berbunga (compounding)</li>
                  <li>Denda keterlambatan tidak wajar</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 rounded border border-[#f5b041] bg-[#fcf3cf] p-4 text-[#7e5109]">
              <div className="font-bold">Contoh Nyata Jebakan Bunga</div>
              <p className="mt-1 text-sm">
                Contoh Perhitungan: Pinjam Rp 1.000.000 selama 30 hari.
                <br /><strong>Pinjol Legal:</strong> Bunga 0,4%/hari x 30 = 12% = Rp 120.000. Total kembalikan: Rp 1.120.000.
                <br /><strong>Pinjol Ilegal:</strong> Bunga 1%/hari x 30 = 30% + biaya admin Rp 300.000 (dipotong di awal, hanya terima Rp 700.000). Total kembalikan: Rp 1.300.000 padahal hanya menerima Rp 700.000!
              </p>
            </div>
          </section>

          {/* Risiko 2 */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Risiko 2: Debt Collector Kasar dan Intimidasi</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Pinjol ilegal menggunakan taktik penagihan yang melanggar hukum dan sangat merugikan peminjam secara psikologis.
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
              <li>Mengirim pesan ancaman ke nomor-nomor di daftar kontak HP peminjam</li>
              <li>Menyebarkan foto memalukan atau data pribadi ke teman, keluarga, dan rekan kerja</li>
              <li>Menghubungi atasan di tempat kerja peminjam</li>
              <li>Menggunakan kata-kata kasar, pelecehan verbal, dan ancaman fisik melalui pesan/telepon</li>
              <li>Membuat rekayasa pesan seolah-olah dari pihak berwenang (polisi, pengadilan)</li>
              <li>Meminta peminjam mengajukan pinjaman di pinjol lain untuk membayar hutang</li>
            </ul>

            <div className="mt-4 rounded bg-[#8e44ad] p-4 text-white">
              <div className="font-bold">Hak Hukum Konsumen</div>
              <p className="mt-1 text-sm">
                Penting: Penagihan utang yang melanggar norma kesopanan dan menyebarkan data pribadi adalah TINDAK PIDANA. Ini diatur dalam UU ITE dan KUHP. Korban berhak melaporkan ke Polri.
              </p>
            </div>
          </section>

          {/* Risiko 3 */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Risiko 3: Penyalahgunaan Data Pribadi</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Pinjol ilegal biasanya meminta izin akses yang berlebihan ke perangkat pengguna:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
              <li>Akses seluruh daftar kontak telepon - untuk mengancam peminjam yang menunggak</li>
              <li>Akses galeri foto - untuk mengancam menyebarkan foto pribadi</li>
              <li>Akses kamera dan mikrofon - potensi penyadapan</li>
              <li>Akses SMS - bisa mencuri kode OTP perbankan</li>
              <li>Akses lokasi real-time - untuk memantau keberadaan peminjam</li>
            </ul>

            <div className="mt-4 rounded bg-[#d5f5e3] p-4 text-[#1e8449]">
              <div className="font-bold">Aturan Akses Data</div>
              <p className="mt-1 text-sm">
                UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi melarang pengumpulan dan penggunaan data pribadi tanpa persetujuan sah. Pinjol legal hanya boleh mengakses kamera, mikrofon, dan lokasi - bukan seluruh kontak dan galeri.
              </p>
            </div>
          </section>

          {/* Risiko 4 */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Risiko 4: Jebakan Utang (Debt Trap)</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Pola jebakan utang pinjol ilegal biasanya mengikuti siklus berbahaya ini:
            </p>
            <ol className="mt-2 list-inside list-decimal space-y-1 text-sm">
              <li>Peminjam meminjam dalam jumlah kecil dengan janji proses cepat</li>
              <li>Dana yang diterima lebih kecil dari yang dipinjam (setelah dipotong biaya admin besar)</li>
              <li>Bunga tinggi membuat sulit membayar saat jatuh tempo</li>
              <li>Pinjol ilegal menawarkan 'rollover' atau menawarkan pinjol lain untuk menutup</li>
              <li>Hutang berlipat ganda, peminjam terjebak dalam spiral utang</li>
              <li>Intimidasi dan tekanan psikologis memperburuk kondisi korban</li>
            </ol>
          </section>

          {/* Ringkasan */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Ringkasan Modul 2</h2>
            <div className="mt-2 rounded-md border border-[#f5b7b1] bg-[#fadbd8] p-4">
              <div className="font-bold text-[#c0392b]">Poin Kunci</div>
              <p className="mt-1 text-sm text-slate-700">
                Pinjol ilegal membawa 3 risiko utama: bunga mencekik yang bisa ratusan persen per tahun, intimidasi dan pelecehan dari debt collector virtual, serta penyalahgunaan data pribadi. Hindari pinjol ilegal apapun kondisinya - cari alternatif yang lebih aman.
              </p>
            </div>
          </section>

          {/* Mini Quiz */}
          <div className="mt-12 rounded-xl border-2 border-[#c0392b] overflow-hidden bg-white">
            <div className="bg-[#c0392b] p-4 text-center text-white">
              <h2 className="font-bold">MINI-QUIZ MODUL 2</h2>
              <div className="text-xs italic text-white/80 mt-1">3 Soal · Skor lulus: ≥2 benar · +50 poin jika lulus</div>
            </div>

            <div className="p-6 space-y-8">
              {moduleData.miniQuiz?.map((quiz: any, index: number) => {
                const correctIndex = quiz.answer.charCodeAt(0) - 65;
                const answeredIndex = quizAnswers[quiz.id];

                return (
                  <div key={quiz.id} className="rounded-md border bg-[#eef5fa]/30 p-4">
                    <h3 className="font-bold text-[#1f4e79]">Soal {quiz.id}: {quiz.question}</h3>
                    <div className="mt-4 space-y-2">
                      {quiz.options.map((opt: string, i: number) => {
                        const isPicked = answeredIndex === i;
                        const isCorrect = showResults && correctIndex === i;
                        const isWrongPicked = showResults && isPicked && correctIndex !== i;

                        let btnClass = "border-border bg-white text-slate-800 text-left hover:border-[#c0392b]/50";
                        if (isCorrect) btnClass = "border-[#27ae60] bg-[#27ae60]/10 text-[#27ae60] font-medium";
                        else if (isWrongPicked) btnClass = "border-[#c0392b] bg-[#c0392b]/10 text-[#c0392b] font-medium";
                        else if (isPicked && !showResults) btnClass = "border-[#c0392b] bg-[#c0392b]/10 text-[#c0392b] font-medium";

                        return (
                          <button
                            key={i}
                            onClick={() => handleAnswer(quiz.id, i)}
                            className={`w-full rounded-md border p-3 text-sm transition-colors ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {showResults && (
                      <div className="mt-4 rounded-md bg-[#e8f4f8] p-3 text-sm border-l-4 border-[#1f4e79]">
                        <div className="font-bold text-[#27ae60]">Jawaban Benar: {quiz.answer}</div>
                        <div className="mt-1 text-slate-700 italic">Pembahasan: {quiz.explanation}</div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 flex justify-center">
                {!showResults ? (
                  <Button
                    onClick={checkQuiz}
                    className="w-full max-w-sm bg-[#c0392b] hover:bg-[#a93226]"
                    disabled={Object.keys(quizAnswers).length < (moduleData.miniQuiz?.length || 0)}
                  >
                    Kumpulkan Jawaban
                  </Button>
                ) : (
                  <div className="w-full">
                    <div className="rounded-md border border-[#fadbd8] bg-[#fdedec] p-4 text-center">
                      <div className="font-bold text-[#c0392b]">Modul 2 Selesai! Modul 3 Terbuka.</div>
                      <p className="mt-1 text-sm text-[#922b21]">
                        Sekarang kamu memahami mengapa pinjol ilegal sangat berbahaya. Di Modul 3, kamu akan belajar langkah konkret yang bisa diambil jika kamu atau orang di sekitarmu sudah terlanjur menjadi korban.
                      </p>
                    </div>
                    <Button onClick={finishModule} className="mt-6 w-full bg-[#c0392b] hover:bg-[#a93226]" size="lg">
                      Selesai & Lanjut ke Modul 3
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (moduleId === 3 && pathId === "pinjol") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
        {/* Header */}
        <div className="bg-[#27ae60] px-6 py-8 text-center text-white">
          <Link to={`/app/paths/${pathId}` as any} className="absolute left-4 top-6 flex items-center text-white/80 hover:text-white">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <div className="text-sm font-bold tracking-widest text-white/80 uppercase">MODUL 3</div>
          <h1 className="mt-2 text-2xl font-bold leading-tight">{moduleData.title}</h1>
          <div className="mt-2 text-sm text-white/80 italic">Durasi: {moduleData.duration}</div>
        </div>

        <div className="mx-auto max-w-3xl space-y-8 px-6 py-8">
          {/* Tujuan Pembelajaran */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Tujuan Pembelajaran</h2>
            <p className="mt-2 text-sm">Setelah menyelesaikan modul ini, pengguna mampu:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
              {moduleData.objectives?.map((obj: string, i: number) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </section>

          {/* Kanal Pengaduan Resmi */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Kanal Pengaduan Resmi</h2>
            <div className="mt-4 overflow-x-auto rounded-md border border-border">
              <table className="w-full text-left text-sm text-slate-800">
                <thead className="bg-[#1e8449] text-white">
                  <tr>
                    <th className="p-3 w-1/4">Kanal</th>
                    <th className="p-3 w-1/3">Kontak/Alamat</th>
                    <th className="p-3">Untuk Masalah</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#a9dfbf]">
                  <tr className="bg-[#e8f8f5]">
                    <td className="p-3 font-bold text-[#27ae60]">APPK OJK</td>
                    <td className="p-3">appk.ojk.go.id</td>
                    <td className="p-3">Semua pengaduan terkait PUJK (termasuk pinjol)</td>
                  </tr>
                  <tr className="bg-[#d4efdf]">
                    <td className="p-3 font-bold text-[#27ae60]">Call Center OJK</td>
                    <td className="p-3">157 (bebas pulsa)</td>
                    <td className="p-3">Konsultasi cepat, panduan pengaduan</td>
                  </tr>
                  <tr className="bg-[#e8f8f5]">
                    <td className="p-3 font-bold text-[#27ae60]">Email OJK</td>
                    <td className="p-3">konsumen@ojk.go.id</td>
                    <td className="p-3">Pengaduan tertulis dengan lampiran bukti</td>
                  </tr>
                  <tr className="bg-[#d4efdf]">
                    <td className="p-3 font-bold text-[#27ae60]">Satgas PASTI</td>
                    <td className="p-3">kontak.pasti@ojk.go.id</td>
                    <td className="p-3">Pinjol ilegal, investasi ilegal, scam keuangan</td>
                  </tr>
                  <tr className="bg-[#e8f8f5]">
                    <td className="p-3 font-bold text-[#27ae60]">Bareskrim Polri</td>
                    <td className="p-3">www.patrolisiber.id</td>
                    <td className="p-3">Pelaporan pidana: ancaman, penyebaran data, penipuan</td>
                  </tr>
                  <tr className="bg-[#d4efdf]">
                    <td className="p-3 font-bold text-[#27ae60]">KOMINFO</td>
                    <td className="p-3">aduankonten.id</td>
                    <td className="p-3">Pemblokiran aplikasi/website pinjol ilegal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Langkah-Langkah Melapor ke OJK */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Langkah-Langkah Melapor ke OJK via APPK</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Ikuti prosedur berikut untuk mengajukan pengaduan ke OJK melalui portal APPK:
            </p>

            <div className="mt-4 rounded bg-[#e67e22] p-3 text-white text-center font-bold shadow-md">
              SEBELUM MELAPOR: Kumpulkan semua bukti terlebih dahulu!
            </div>

            <h3 className="mt-6 font-bold text-[#1f4e79]">Bukti yang Perlu Disiapkan:</h3>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
              <li>Screenshot percakapan/chat dengan pihak pinjol (termasuk ancaman)</li>
              <li>Screenshot kontrak pinjaman atau syarat & ketentuan</li>
              <li>Bukti transfer dana yang masuk ke rekening</li>
              <li>Bukti pembayaran yang sudah dilakukan</li>
              <li>Screenshot atau rekaman penagihan yang kasar/mengancam</li>
              <li>Identitas diri (KTP) dan data pribadi yang dirugikan</li>
              <li>Nama aplikasi pinjol, nomor telepon, dan informasi kontak</li>
            </ul>

            <h3 className="mt-6 font-bold text-[#1f4e79]">Prosedur Pengaduan APPK:</h3>
            <ol className="mt-2 list-inside list-decimal space-y-1 text-sm">
              <li>Buka browser dan kunjungi https://appk.ojk.go.id</li>
              <li>Klik menu 'Pengaduan' pada halaman utama</li>
              <li>Pilih jenis layanan: 'Fintech/Pinjaman Online'</li>
              <li>Isi formulir pengaduan: nama, nomor identitas, jenis masalah, kronologi kejadian</li>
              <li>Unggah bukti-bukti yang telah disiapkan (format JPG, PNG, atau PDF)</li>
              <li>Masukkan nama perusahaan/aplikasi pinjol yang diadukan</li>
              <li>Klik 'Kirim Pengaduan' dan simpan nomor tiket pengaduan</li>
              <li>OJK akan menghubungi dalam 5-20 hari kerja untuk proses lanjutan</li>
            </ol>
          </section>

          {/* Alur Penanganan */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Alur Penanganan Pengaduan</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Secara umum, alur penanganan pengaduan pinjol ilegal adalah sebagai berikut:
            </p>

            <div className="mt-4 flex flex-col overflow-hidden rounded-md border border-border">
              <div className="border-b border-border p-4 bg-white">
                <div className="font-bold text-[#1f4e79]">LANGKAH 1 - Lapor ke PUJK (jika pinjol terdaftar)</div>
                <div className="text-sm">Ajukan pengaduan langsung ke perusahaan pinjol legal. Beri waktu 5 hari kerja untuk merespons.</div>
              </div>
              <div className="border-b border-border p-4 bg-[#f4f6f7]">
                <div className="font-bold text-[#2980b9]">LANGKAH 2 - Lapor ke OJK via APPK (jika tidak ditanggapi)</div>
                <div className="text-sm">Jika PUJK tidak merespons atau pinjol ilegal, langsung ke OJK. APPK: appk.ojk.go.id atau 157.</div>
              </div>
              <div className="border-b border-border p-4 bg-white">
                <div className="font-bold text-[#8e44ad]">LANGKAH 3 - Satgas PASTI untuk pinjol ilegal</div>
                <div className="text-sm">Khusus untuk pinjol yang tidak terdaftar OJK. Satgas akan proses pemblokiran dan penindakan.</div>
              </div>
              <div className="p-4 bg-[#fdf2e9]">
                <div className="font-bold text-[#c0392b]">LANGKAH 4 - Lapor ke Polri (jika ada tindak pidana)</div>
                <div className="text-sm">Ancaman, penyebaran data, penipuan adalah tindak pidana. Lapor ke www.patrolisiber.id.</div>
              </div>
            </div>
          </section>

          {/* Ringkasan */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Ringkasan Modul 3</h2>
            <div className="mt-2 rounded-md border border-[#a9dfbf] bg-[#e8f8f5] p-4">
              <div className="font-bold text-[#27ae60]">Poin Kunci</div>
              <p className="mt-1 text-sm text-slate-700">
                Ada 3 kanal utama pengaduan: APPK OJK (appk.ojk.go.id), Call Center 157, dan Satgas PASTI untuk pinjol ilegal. Selalu siapkan bukti sebelum melapor. Jika ada ancaman atau penyebaran data, jangan ragu lapor ke Polri melalui patrolisiber.id.
              </p>
            </div>
          </section>

          {/* Mini Quiz */}
          <div className="mt-12 rounded-xl border-2 border-[#27ae60] overflow-hidden bg-white">
            <div className="bg-[#27ae60] p-4 text-center text-white">
              <h2 className="font-bold">MINI-QUIZ MODUL 3</h2>
              <div className="text-xs italic text-white/80 mt-1">3 Soal · Skor lulus: ≥2 benar · +50 poin jika lulus</div>
            </div>

            <div className="p-6 space-y-8">
              {moduleData.miniQuiz?.map((quiz: any, index: number) => {
                const correctIndex = quiz.answer.charCodeAt(0) - 65;
                const answeredIndex = quizAnswers[quiz.id];

                return (
                  <div key={quiz.id} className="rounded-md border bg-[#e8f8f5]/50 p-4">
                    <h3 className="font-bold text-[#1f4e79]">Soal {quiz.id}: {quiz.question}</h3>
                    <div className="mt-4 space-y-2">
                      {quiz.options.map((opt: string, i: number) => {
                        const isPicked = answeredIndex === i;
                        const isCorrect = showResults && correctIndex === i;
                        const isWrongPicked = showResults && isPicked && correctIndex !== i;

                        let btnClass = "border-border bg-white text-slate-800 text-left hover:border-[#27ae60]/50";
                        if (isCorrect) btnClass = "border-[#27ae60] bg-[#27ae60]/10 text-[#27ae60] font-medium";
                        else if (isWrongPicked) btnClass = "border-[#c0392b] bg-[#c0392b]/10 text-[#c0392b] font-medium";
                        else if (isPicked && !showResults) btnClass = "border-[#27ae60] bg-[#27ae60]/10 text-[#27ae60] font-medium";

                        return (
                          <button
                            key={i}
                            onClick={() => handleAnswer(quiz.id, i)}
                            className={`w-full rounded-md border p-3 text-sm transition-colors ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {showResults && (
                      <div className="mt-4 rounded-md bg-[#e8f4f8] p-3 text-sm border-l-4 border-[#1f4e79]">
                        <div className="font-bold text-[#27ae60]">Jawaban Benar: {quiz.answer}</div>
                        <div className="mt-1 text-slate-700 italic">Pembahasan: {quiz.explanation}</div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 flex justify-center">
                {!showResults ? (
                  <Button
                    onClick={checkQuiz}
                    className="w-full max-w-sm bg-[#27ae60] hover:bg-[#1e8449]"
                    disabled={Object.keys(quizAnswers).length < (moduleData.miniQuiz?.length || 0)}
                  >
                    Kumpulkan Jawaban
                  </Button>
                ) : (
                  <div className="w-full">
                    <div className="rounded-md border border-[#a9dfbf] bg-[#d4efdf] p-4 text-center">
                      <div className="font-bold text-[#1e8449]">Modul 3 Selesai! Modul 4 Terbuka.</div>
                      <p className="mt-1 text-sm text-[#145a32]">
                        Modul 3 selesai! Kamu kini tahu cara melindungi diri dan melapor dengan benar. Di Modul 4, kita akan belajar dari kisah nyata korban pinjol ilegal — agar kita semua tidak mengalami hal yang sama.
                      </p>
                    </div>
                    <Button onClick={finishModule} className="mt-6 w-full bg-[#27ae60] hover:bg-[#1e8449]" size="lg">
                      Selesai & Lanjut ke Modul 4
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (moduleId === 4 && pathId === "pinjol") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
        {/* Header */}
        <div className="bg-[#873e23] px-6 py-8 text-center text-white">
          <Link to={`/app/paths/${pathId}` as any} className="absolute left-4 top-6 flex items-center text-white/80 hover:text-white">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <div className="text-sm font-bold tracking-widest text-white/80 uppercase">MODUL 4</div>
          <h1 className="mt-2 text-2xl font-bold leading-tight">{moduleData.title}</h1>
          <div className="mt-2 text-sm text-white/80 italic">Durasi: {moduleData.duration}</div>
        </div>

        <div className="mx-auto max-w-3xl space-y-8 px-6 py-8">
          {/* Tujuan Pembelajaran */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Tujuan Pembelajaran</h2>
            <p className="mt-2 text-sm">Setelah menyelesaikan modul ini, pengguna mampu:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
              {moduleData.objectives?.map((obj: string, i: number) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </section>

          {/* Kasus 1 */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Kasus 1: Karyawan Swasta Terjebak Spiral Utang</h2>
            <div className="mt-4 rounded border border-[#f5b041] bg-[#fdebd0] p-4 text-[#7e5109]">
              Profil Korban: Budi (nama samaran), 32 tahun, karyawan swasta di Jakarta, gaji Rp 3,5 juta/bulan.
            </div>

            <h3 className="mt-6 font-bold text-[#1f4e79]">Kronologi:</h3>
            <ol className="mt-2 list-inside list-decimal space-y-2 text-sm">
              <li>Budi membutuhkan uang mendesak Rp 2 juta untuk biaya berobat. Ia menemukan iklan pinjol di media sosial yang menjanjikan 'cair dalam 5 menit, tanpa jaminan'.</li>
              <li>Budi mengunduh aplikasi dan mengajukan pinjaman Rp 2 juta. Namun setelah disetujui, ia hanya menerima Rp 1,4 juta (dipotong biaya admin Rp 600.000 atau 30%).</li>
              <li>Tenor pinjaman 14 hari dengan bunga 2%/hari. Total yang harus dikembalikan: Rp 2 juta + bunga Rp 560.000 = Rp 2.560.000 dalam 14 hari.</li>
              <li>Budi tidak mampu membayar saat jatuh tempo. Pinjol menawarkan 'perpanjangan' dengan biaya tambahan Rp 500.000.</li>
              <li>Debt collector mulai menghubungi seluruh kontak di HP Budi - termasuk orang tua, saudara, dan atasan di kantor - menyebut Budi sebagai 'penipu'.</li>
              <li>Demi menutup utang, Budi mengajukan pinjaman di 5 pinjol ilegal lain. Total utang membengkak menjadi Rp 15 juta dalam 2 bulan.</li>
            </ol>

            <h3 className="mt-6 font-bold text-[#1f4e79]">Resolusi:</h3>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
              <li>Budi melaporkan ke OJK melalui APPK dan Satgas PASTI</li>
              <li>OJK dan Satgas PASTI berkoordinasi untuk memblokir aplikasi pinjol ilegal tersebut</li>
              <li>Budi mendapat pendampingan hukum dari LBH Jakarta</li>
              <li>Karena ancaman dilaporkan ke Polri, beberapa operator debt collector ditangkap</li>
            </ul>

            <div className="mt-4 rounded border border-[#e67e22] bg-[#fef5e7] p-4">
              <div className="font-bold text-[#d35400]">Pelajaran dari Kasus Budi</div>
              <p className="mt-1 text-sm text-slate-700">
                1. Verifikasi legalitas SEBELUM mengunduh dan menggunakan aplikasi pinjol.<br />
                2. Biaya admin yang besar di awal adalah tanda bahaya.<br />
                3. Jangan pinjam di pinjol lain untuk menutup utang pinjol - ini hanya memperbesar masalah.<br />
                4. Segera lapor ke OJK dan Polri jika mengalami ancaman.
              </p>
            </div>
          </section>

          {/* Kasus 2 */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Kasus 2: Mahasiswi Diancam Foto Memalukan</h2>
            <div className="mt-4 rounded border border-[#f1948a] bg-[#fadbd8] p-4 text-[#922b21]">
              Profil Korban: Siti (nama samaran), 21 tahun, mahasiswi, membutuhkan uang untuk biaya semester.
            </div>

            <h3 className="mt-6 font-bold text-[#1f4e79]">Kronologi:</h3>
            <ol className="mt-2 list-inside list-decimal space-y-2 text-sm">
              <li>Siti menerima SMS yang menawarkan pinjaman cepat. Ia mengunjungi link yang tertera dan mengunduh aplikasi.</li>
              <li>Saat proses verifikasi, aplikasi meminta foto selfie dan foto KTP. Tanpa disadari, aplikasi juga mengakses seluruh galeri foto Siti.</li>
              <li>Setelah meminjam Rp 1,5 juta dan tidak mampu melunasi tepat waktu, Siti menerima pesan mengancam akan menyebarkan foto-fotonya ke seluruh kontak.</li>
              <li>Siti merasa malu dan takut, sehingga terus membayar meskipun uang habis, bahkan meminjam dari teman.</li>
            </ol>

            <h3 className="mt-6 font-bold text-[#1f4e79]">Resolusi:</h3>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
              <li>Siti melapor ke Polisi dengan bukti screenshot ancaman</li>
              <li>Polri memproses laporan berdasarkan UU ITE Pasal 27 ayat (3) tentang konten yang mengandung unsur pengancaman</li>
              <li>Satgas PASTI menutup aplikasi pinjol tersebut</li>
            </ul>

            <div className="mt-4 rounded bg-[#8e44ad] p-4 text-white">
              <div className="font-bold">Pesan Penting</div>
              <p className="mt-1 text-sm">
                Pengancaman dengan foto/data pribadi adalah TINDAK PIDANA berdasarkan UU ITE. Segera lapor ke Polri di patrolisiber.id. Jangan tunduk pada ancaman - ini justru akan membuat pelaku semakin berani.
              </p>
            </div>
          </section>

          {/* Tindakan OJK dan Satgas PASTI */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Tindakan OJK dan Satgas PASTI</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Pemerintah melalui OJK dan Satgas PASTI (Pencegahan dan Penanganan Aktivitas Keuangan Ilegal) telah melakukan berbagai tindakan:
            </p>
            <div className="mt-4 overflow-x-auto rounded-md border border-border">
              <table className="w-full text-left text-sm text-slate-800">
                <thead className="bg-[#1f4e79] text-white">
                  <tr>
                    <th className="p-3 w-1/4">Tindakan</th>
                    <th className="p-3">Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d4e6f1]">
                  <tr className="bg-[#eaf2f8]">
                    <td className="p-3 font-bold text-[#2980b9]">Pemblokiran</td>
                    <td className="p-3">Ribuan aplikasi dan website pinjol ilegal telah diblokir bersama KOMINFO sejak 2018</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 font-bold text-[#2980b9]">Penindakan Hukum</td>
                    <td className="p-3">Koordinasi dengan Bareskrim Polri untuk penangkapan operator pinjol ilegal</td>
                  </tr>
                  <tr className="bg-[#eaf2f8]">
                    <td className="p-3 font-bold text-[#2980b9]">Edukasi Publik</td>
                    <td className="p-3">Kampanye nasional anti-pinjol ilegal melalui media sosial, website, dan kerjasama pemda</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 font-bold text-[#2980b9]">Satgas PASTI</td>
                    <td className="p-3">Dibentuk 2023, menangani pinjol ilegal, investasi ilegal, dan aktivitas keuangan ilegal lainnya</td>
                  </tr>
                  <tr className="bg-[#eaf2f8]">
                    <td className="p-3 font-bold text-[#2980b9]">APPK</td>
                    <td className="p-3">Portal pengaduan terintegrasi dengan lebih dari 48.000 aduan per November 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Ringkasan */}
          <section>
            <h2 className="text-xl font-bold text-[#1f4e79]">Ringkasan Modul 4</h2>
            <div className="mt-2 rounded-md border border-[#f5cba7] bg-[#fdedec] p-4">
              <div className="font-bold text-[#d35400]">Poin Kunci</div>
              <p className="mt-1 text-sm text-slate-700">
                Pinjol ilegal nyata adanya dan korbannya bisa siapa saja. Kasus-kasus nyata menunjukkan pola yang sama: jebakan bunga, akses data ilegal, dan intimidasi. Pemerintah terus bergerak memberantas pinjol ilegal - bantu dengan melapor jika menemukan atau mengalaminya.
              </p>
            </div>
          </section>

          {/* Mini Quiz */}
          <div className="mt-12 rounded-xl border-2 border-[#873e23] overflow-hidden bg-white">
            <div className="bg-[#873e23] p-4 text-center text-white">
              <h2 className="font-bold">MINI-QUIZ MODUL 4</h2>
              <div className="text-xs italic text-white/80 mt-1">3 Soal Skenario · Skor lulus: ≥2 benar · +50 poin jika lulus</div>
            </div>

            <div className="p-6 space-y-8">
              {moduleData.miniQuiz?.map((quiz: any, index: number) => {
                const correctIndex = quiz.answer.charCodeAt(0) - 65;
                const answeredIndex = quizAnswers[quiz.id];

                return (
                  <div key={quiz.id} className="rounded-md border bg-[#eaf2f8]/50 p-4">
                    <h3 className="font-bold text-[#1f4e79]">Soal {quiz.id}: {quiz.question}</h3>
                    <div className="mt-4 space-y-2">
                      {quiz.options.map((opt: string, i: number) => {
                        const isPicked = answeredIndex === i;
                        const isCorrect = showResults && correctIndex === i;
                        const isWrongPicked = showResults && isPicked && correctIndex !== i;

                        let btnClass = "border-border bg-white text-slate-800 text-left hover:border-[#873e23]/50";
                        if (isCorrect) btnClass = "border-[#27ae60] bg-[#27ae60]/10 text-[#27ae60] font-medium";
                        else if (isWrongPicked) btnClass = "border-[#c0392b] bg-[#c0392b]/10 text-[#c0392b] font-medium";
                        else if (isPicked && !showResults) btnClass = "border-[#873e23] bg-[#873e23]/10 text-[#873e23] font-medium";

                        return (
                          <button
                            key={i}
                            onClick={() => handleAnswer(quiz.id, i)}
                            className={`w-full rounded-md border p-3 text-sm transition-colors ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {showResults && (
                      <div className="mt-4 rounded-md bg-[#eaf2f8] p-3 text-sm border-l-4 border-[#1f4e79]">
                        <div className="font-bold text-[#27ae60]">Jawaban Benar: {quiz.answer}</div>
                        <div className="mt-1 text-slate-700 italic">Pembahasan: {quiz.explanation}</div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 flex justify-center">
                {!showResults ? (
                  <Button
                    onClick={checkQuiz}
                    className="w-full max-w-sm bg-[#873e23] hover:bg-[#6e321c]"
                    disabled={Object.keys(quizAnswers).length < (moduleData.miniQuiz?.length || 0)}
                  >
                    Kumpulkan Jawaban
                  </Button>
                ) : (
                  <div className="w-full">
                    <div className="rounded-md border border-[#f5cba7] bg-[#fdf2e9] p-4 text-center">
                      <div className="font-bold text-[#d35400]">Modul 4 Selesai! Quiz Akhir Terbuka.</div>
                      <p className="mt-1 text-sm text-[#ba4a00]">
                        Luar biasa! Kamu telah menyelesaikan semua 4 modul. Sekarang saatnya menguji pemahaman komprehensifmu dengan Quiz Akhir. Jawab 10 soal untuk mendapatkan badge 'Anti-Pinjol' dan bandingkan hasilmu dengan Pre-Quiz di awal!
                      </p>
                    </div>
                    <Button onClick={finishModule} className="mt-6 w-full bg-[#873e23] hover:bg-[#6e321c]" size="lg">
                      Selesai & Menuju Quiz Akhir
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (moduleId === 1 && pathId === "penipuan") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
        {/* Header */}
        <div className="bg-[#1f4e79] px-6 py-8 text-center text-white">
          <Link to={`/app/paths/${pathId}` as any} className="absolute left-4 top-6 flex items-center text-white/80 hover:text-white">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <div className="text-sm font-bold tracking-widest text-white/80 uppercase">MODUL 1</div>
          <h1 className="mt-2 text-2xl font-bold leading-tight">{moduleData.title}</h1>
          <div className="mt-2 text-sm text-white/80 italic">Durasi: {moduleData.duration}</div>
        </div>

        <div className="mx-auto max-w-3xl space-y-8 px-6 py-8">
          {/* Top Table */}
          <div className="overflow-x-auto rounded-md border border-border">
            <table className="w-full text-left text-sm text-slate-800">
              <tbody className="divide-y divide-border">
                <tr className="bg-white">
                  <td className="p-3 font-bold bg-[#d4e6f1] w-1/4">Modul</td>
                  <td className="p-3">Modul 1 dari 5</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-bold bg-[#d4e6f1]">Topik</td>
                  <td className="p-3">Jenis-Jenis Scam Digital: Phishing, Fake Call, Social Engineering</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-bold bg-[#d4e6f1]">Durasi</td>
                  <td className="p-3">3-5 menit baca + 3 soal mini quiz</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-bold bg-[#d4e6f1]">Tujuan</td>
                  <td className="p-3">
                    <ul className="list-inside list-disc">
                      {moduleData.objectives?.map((obj: string, i: number) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Apa Itu Scam Digital? */}
          <section>
            <h2 className="bg-[#2980b9] p-2 text-lg font-bold text-white">Apa Itu Scam Digital?</h2>
            <p className="mt-4 text-sm leading-relaxed">
              Scam digital adalah tindakan penipuan yang dilakukan secara online dengan memanfaatkan teknologi untuk mencuri uang, data pribadi, atau akses akun korban. Di Indonesia, kasus scam digital terus meningkat seiring meningkatnya pengguna internet dan layanan keuangan digital.
            </p>

            <div className="mt-6 rounded border border-[#2980b9] bg-[#d4e6f1] p-4 text-[#1f4e79]">
              <div className="font-bold">Fakta Penting:</div>
              <p className="mt-1 text-sm">
                Menurut OJK, sepanjang 2024 terdapat puluhan ribu laporan penipuan digital yang masuk melalui kanal APPK. Mayoritas korban adalah usia produktif 20-45 tahun.
              </p>
            </div>
          </section>

          {/* Jenis-Jenis Scam Digital */}
          <section>
            <h2 className="bg-[#2980b9] p-2 text-lg font-bold text-white">Jenis-Jenis Scam Digital yang Wajib Kamu Tahu</h2>

            <div className="mt-6">
              <h3 className="text-lg font-bold text-[#1f4e79]">1. Phishing</h3>
              <p className="mt-2 text-sm">
                Phishing adalah upaya penipuan dengan berpura-pura menjadi pihak terpercaya (bank, OJK, marketplace) untuk mencuri data sensitif seperti username, password, PIN, atau OTP.
              </p>

              <h4 className="mt-4 font-bold text-[#2980b9]">Modus Phishing yang Umum:</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                <li><span className="font-semibold">Email palsu:</span> Mengirim email seolah-olah dari bank atau marketplace, meminta korban klik link untuk 'verifikasi akun'</li>
                <li><span className="font-semibold">SMS phishing (smishing):</span> SMS berisi link berbahaya dengan pesan seperti 'Akun Anda diblokir, segera klik link ini'</li>
                <li><span className="font-semibold">WhatsApp phishing:</span> Pesan WA dari nomor tidak dikenal mengaku CS bank, meminta data OTP</li>
                <li><span className="font-semibold">Fake website:</span> Website palsu yang tampilannya mirip dengan website resmi bank/marketplace</li>
              </ul>

              <div className="mt-4 rounded bg-[#fadbd8] p-4 text-[#922b21]">
                <div className="font-bold">Contoh Kasus Nyata:</div>
                <p className="mt-1 text-sm">
                  Rina menerima email yang terlihat dari BRI, memintanya mengklik link untuk 'update data keamanan'. Setelah mengisi username dan password, saldo rekeningnya dikuras habis dalam hitungan menit. Ternyata link tersebut mengarah ke website palsu yang dibuat penipu.
                </p>
              </div>
            </div>

            <div className="mt-8 border-t pt-8">
              <h3 className="text-lg font-bold text-[#1f4e79]">2. Vishing (Voice Phishing) - Fake Call</h3>
              <p className="mt-2 text-sm">
                Vishing adalah penipuan melalui telepon, di mana penipu berpura-pura menjadi petugas bank, OJK, Kominfo, atau bahkan aparat hukum.
              </p>

              <h4 className="mt-4 font-bold text-[#2980b9]">Ciri-Ciri Fake Call:</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                <li>Mengaku dari institusi resmi (OJK, BI, Polri, Bank)</li>
                <li>Menciptakan situasi mendesak: 'Akun Anda terindikasi pencucian uang!'</li>
                <li>Meminta data sensitif: nomor rekening, PIN, OTP, foto KTP</li>
                <li>Mengancam akan memblokir rekening atau menangkap korban jika tidak kooperatif</li>
                <li>Meminta korban transfer ke 'rekening aman' milik penipu</li>
              </ul>

              <div className="mt-4 rounded bg-[#fdebd0] p-4 text-[#7e5109]">
                <div className="font-bold text-[#d35400]">Ingat!</div>
                <p className="mt-1 text-sm">
                  OJK, Bank Indonesia, dan lembaga resmi TIDAK PERNAH meminta data PIN, OTP, atau password melalui telepon. Tutup telepon dan hubungi langsung nomor resmi institusi tersebut.
                </p>
              </div>
            </div>

            <div className="mt-8 border-t pt-8">
              <h3 className="text-lg font-bold text-[#1f4e79]">3. Social Engineering</h3>
              <p className="mt-2 text-sm">
                Social engineering adalah teknik manipulasi psikologis untuk membuat korban secara sukarela memberikan informasi atau melakukan tindakan yang menguntungkan penipu.
              </p>

              <h4 className="mt-4 font-bold text-[#2980b9]">Teknik Social Engineering yang Sering Digunakan:</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                <li><span className="font-semibold">Pretexting:</span> Membuat skenario palsu yang meyakinkan ('Saya dari tim keamanan bank Anda')</li>
                <li><span className="font-semibold">Baiting:</span> Umpan berupa hadiah, diskon, atau konten gratis untuk memancing klik</li>
                <li><span className="font-semibold">Quid pro quo:</span> Menawarkan sesuatu (bantuan teknis, hadiah) dengan imbalan data pribadi</li>
                <li><span className="font-semibold">Urgency/Fear:</span> Menciptakan rasa takut atau urgensi agar korban bertindak cepat tanpa berpikir</li>
                <li><span className="font-semibold">Love scam:</span> Membangun hubungan romantis palsu untuk akhirnya meminta uang</li>
              </ul>
            </div>
          </section>

          {/* Tips Melindungi Diri dari Scam Digital */}
          <section>
            <h2 className="bg-[#2980b9] p-2 text-lg font-bold text-white">Tips Melindungi Diri dari Scam Digital</h2>
            <ol className="mt-4 list-inside list-decimal space-y-2 text-sm font-medium">
              <li>Jangan pernah bagikan OTP, PIN, atau password kepada siapapun, termasuk yang mengaku petugas bank</li>
              <li>Verifikasi selalu identitas penghubung melalui saluran resmi</li>
              <li>Waspadai pesan yang menciptakan urgensi atau ketakutan</li>
              <li>Gunakan autentikasi dua faktor (2FA) untuk semua akun penting</li>
              <li>Cek URL website sebelum memasukkan data — pastikan ada https:// dan nama domain benar</li>
            </ol>
          </section>

          {/* Mini Quiz */}
          <div className="mt-12 rounded-xl border-2 border-[#2980b9] overflow-hidden bg-white">
            <div className="bg-[#2980b9] p-4 text-center text-white">
              <h2 className="font-bold">MINI QUIZ MODUL 1 — Jenis-Jenis Scam Digital</h2>
              <div className="text-xs italic text-white/80 mt-1">Jawab 3 pertanyaan berikut untuk mengecek pemahamanmu tentang Modul 1.</div>
            </div>

            <div className="p-6 space-y-8">
              {moduleData.miniQuiz?.map((quiz: any, index: number) => {
                const correctIndex = quiz.answer.charCodeAt(0) - 65;
                const answeredIndex = quizAnswers[quiz.id];

                return (
                  <div key={quiz.id} className="rounded-md border bg-[#eaf2f8]/50 p-4 text-slate-800">
                    <h3 className="font-bold text-[#1f4e79]">Soal {index + 1}: {quiz.question}</h3>
                    <div className="mt-4 space-y-2">
                      {quiz.options.map((opt: string, i: number) => {
                        const isPicked = answeredIndex === i;
                        const isCorrect = showResults && correctIndex === i;
                        const isWrongPicked = showResults && isPicked && correctIndex !== i;

                        let btnClass = "border-border bg-white text-slate-800 text-left hover:border-[#2980b9]/50";
                        if (isCorrect) btnClass = "border-[#27ae60] bg-[#27ae60]/10 text-[#27ae60] font-medium";
                        else if (isWrongPicked) btnClass = "border-[#c0392b] bg-[#c0392b]/10 text-[#c0392b] font-medium";
                        else if (isPicked && !showResults) btnClass = "border-[#2980b9] bg-[#2980b9]/10 text-[#2980b9] font-medium";

                        return (
                          <button
                            key={i}
                            onClick={() => handleAnswer(quiz.id, i)}
                            className={`w-full rounded-md border p-3 text-sm transition-colors ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {showResults && (
                      <div className="mt-4 rounded-md bg-[#eaf2f8] p-3 text-sm border-l-4 border-[#1f4e79] text-slate-800">
                        <div className="font-bold text-[#27ae60]">Jawaban Benar: {quiz.answer}</div>
                        <div className="mt-1 text-slate-700 italic">Pembahasan: {quiz.explanation}</div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 flex justify-center">
                {!showResults ? (
                  <Button
                    onClick={checkQuiz}
                    className="w-full max-w-sm bg-[#2980b9] hover:bg-[#1a5276]"
                    disabled={Object.keys(quizAnswers).length < (moduleData.miniQuiz?.length || 0)}
                  >
                    Kumpulkan Jawaban
                  </Button>
                ) : (
                  <div className="w-full">
                    <div className="rounded-md border border-[#2980b9]/30 bg-[#ebf5fb] p-4 text-center">
                      <div className="font-bold text-[#2980b9]">Modul 1 Selesai!</div>
                      <p className="mt-1 text-sm text-[#1f4e79]">
                        Kamu berhasil mengenali dasar-dasar scam digital. Lanjutkan ke Modul 2 untuk mempelajari tentang Investasi Bodong Digital.
                      </p>
                    </div>
                    <Button onClick={finishModule} className="mt-6 w-full bg-[#2980b9] hover:bg-[#1a5276]" size="lg">
                      Selesai & Lanjut Modul 2
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (moduleId === 2 && pathId === "penipuan") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
        {/* Header */}
        <div className="bg-[#1f4e79] px-6 py-8 text-center text-white">
          <Link to={`/app/paths/${pathId}` as any} className="absolute left-4 top-6 flex items-center text-white/80 hover:text-white">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <div className="text-sm font-bold tracking-widest text-white/80 uppercase">MODUL 2</div>
          <h1 className="mt-2 text-2xl font-bold leading-tight">{moduleData.title}</h1>
          <div className="mt-2 text-sm text-white/80 italic">Durasi: {moduleData.duration}</div>
        </div>

        <div className="mx-auto max-w-3xl space-y-8 px-6 py-8">
          {/* Top Table */}
          <div className="overflow-x-auto rounded-md border border-border">
            <table className="w-full text-left text-sm text-slate-800">
              <tbody className="divide-y divide-border">
                <tr className="bg-white">
                  <td className="p-3 font-bold bg-[#d4e6f1] w-1/4">Modul</td>
                  <td className="p-3">Modul 2 dari 5</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-bold bg-[#d4e6f1]">Topik</td>
                  <td className="p-3">Investasi Bodong Digital: Robot Trading, Forex Ilegal, Skema Ponzi Online</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-bold bg-[#d4e6f1]">Durasi</td>
                  <td className="p-3">3-5 menit baca + 3 soal mini quiz</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-bold bg-[#d4e6f1]">Tujuan</td>
                  <td className="p-3">
                    <ul className="list-inside list-disc">
                      {moduleData.objectives?.map((obj: string, i: number) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Kenapa Investasi Bodong Masih Marak? */}
          <section>
            <h2 className="bg-[#2980b9] p-2 text-lg font-bold text-white">Kenapa Investasi Bodong Masih Marak?</h2>
            <p className="mt-4 text-sm leading-relaxed">
              Di era digital, penipuan investasi semakin canggih. Penipu menggunakan website profesional, testimoni palsu, endorsement selebriti (asli atau deepfake), dan klaim teknologi AI/robot untuk meyakinkan calon korban. Korbannya bukan hanya orang awam, tetapi juga kalangan berpendidikan.
            </p>

            <div className="mt-6 rounded border border-[#2980b9] bg-[#d4e6f1] p-4 text-[#1f4e79]">
              <div className="font-bold">Data OJK:</div>
              <p className="mt-1 text-sm">
                Satuan Tugas PASTI (Penanganan Aktivitas Keuangan Ilegal) OJK telah menghentikan ribuan entitas investasi ilegal. Kerugian masyarakat dari investasi bodong terus mencapai angka triliunan rupiah setiap tahunnya.
              </p>
            </div>
          </section>

          {/* Jenis Investasi Bodong Digital */}
          <section>
            <h2 className="bg-[#2980b9] p-2 text-lg font-bold text-white">Jenis Investasi Bodong Digital</h2>

            <div className="mt-6">
              <h3 className="text-lg font-bold text-[#1f4e79]">1. Robot Trading Ilegal</h3>
              <p className="mt-2 text-sm">
                Robot trading adalah software otomatis yang mengklaim bisa menghasilkan keuntungan dari trading forex/kripto secara otomatis dengan profit yang 'pasti' dan besar.
              </p>

              <h4 className="mt-4 font-bold text-[#2980b9]">Ciri Robot Trading Ilegal:</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                <li>Menjanjikan profit tetap (misal: 1-5% per hari atau 30-50% per bulan) tanpa risiko</li>
                <li>Tidak terdaftar di Bappebti atau OJK</li>
                <li>Tidak bisa dijelaskan cara kerjanya secara transparan</li>
                <li>Sistem rekrut anggota baru mendapat komisi (ciri MLM)</li>
                <li>Dana investor dikumpulkan di rekening pribadi pengurus</li>
              </ul>
            </div>

            <div className="mt-8 border-t pt-8">
              <h3 className="text-lg font-bold text-[#1f4e79]">2. Forex Ilegal</h3>
              <p className="mt-2 text-sm">
                Trading forex (valuta asing) sebenarnya legal jika dilakukan melalui broker terdaftar di Bappebti. Namun banyak entitas ilegal menawarkan 'jasa trading forex' tanpa izin resmi.
              </p>

              <h4 className="mt-4 font-bold text-[#2980b9]">Cara Membedakan Forex Legal vs Ilegal:</h4>
              <div className="mt-4 overflow-x-auto rounded-md border border-border">
                <table className="w-full text-left text-sm text-slate-800">
                  <thead className="text-white">
                    <tr>
                      <th className="bg-[#27ae60] p-3 w-1/2">Forex LEGAL</th>
                      <th className="bg-[#c0392b] p-3 w-1/2">Forex ILEGAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white">
                    <tr>
                      <td className="bg-[#e8f8f5] p-3">Terdaftar di Bappebti</td>
                      <td className="bg-[#fadbd8] p-3">Tidak punya izin Bappebti</td>
                    </tr>
                    <tr>
                      <td className="bg-[#d4efdf] p-3">Profit tidak dijamin</td>
                      <td className="bg-[#f5b7b1] p-3">Menjanjikan profit pasti</td>
                    </tr>
                    <tr>
                      <td className="bg-[#e8f8f5] p-3">Ada mekanisme pengaduan</td>
                      <td className="bg-[#fadbd8] p-3">Dana masuk ke rekening pribadi</td>
                    </tr>
                    <tr>
                      <td className="bg-[#d4efdf] p-3">Transparan tentang risiko</td>
                      <td className="bg-[#f5b7b1] p-3">Rekrut anggota dapat komisi</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 border-t pt-8">
              <h3 className="text-lg font-bold text-[#1f4e79]">3. Skema Ponzi Online</h3>
              <p className="mt-2 text-sm">
                Skema Ponzi adalah model investasi palsu di mana keuntungan investor lama dibayar menggunakan modal dari investor baru, bukan dari keuntungan bisnis nyata. Ini pasti akan kolaps ketika tidak ada investor baru lagi.
              </p>

              <h4 className="mt-4 font-bold text-[#2980b9]">Ciri Khas Skema Ponzi:</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                <li>Imbal hasil sangat tinggi dan 'pasti'</li>
                <li>Sistem member-get-member / referral wajib</li>
                <li>Keuntungan datang dari merekrut orang baru, bukan bisnis riil</li>
                <li>Sulit atau tidak bisa menarik dana (withdraw)</li>
                <li>Tiba-tiba kabur / website hilang (exit scam)</li>
              </ul>

              <div className="mt-4 rounded border border-[#e67e22] bg-[#fdebd0] p-4 text-[#7e5109]">
                <div className="font-bold text-[#d35400]">Rumus Deteksi Investasi Bodong — 2L:</div>
                <p className="mt-1 text-sm">
                  Legal (cek izin OJK/Bappebti/OJK) + Logis (apakah return-nya masuk akal?). Jika salah satu tidak terpenuhi, JANGAN investasi!
                </p>
              </div>
            </div>
          </section>

          {/* Cara Cek Legalitas Investasi */}
          <section>
            <h2 className="bg-[#2980b9] p-2 text-lg font-bold text-white">Cara Cek Legalitas Investasi</h2>
            <ol className="mt-4 list-inside list-decimal space-y-2 text-sm font-medium">
              <li>Kunjungi website OJK: www.ojk.go.id — bagian 'Cek Legalitas'</li>
              <li>Kunjungi website Bappebti: www.bappebti.go.id untuk produk komoditas/forex</li>
              <li>Hubungi Kontak OJK 157 untuk konfirmasi</li>
              <li>Cek daftar entitas ilegal yang sudah dihentikan Satgas PASTI</li>
            </ol>
          </section>

          {/* Mini Quiz */}
          <div className="mt-12 rounded-xl border-2 border-[#2980b9] overflow-hidden bg-white">
            <div className="bg-[#2980b9] p-4 text-center text-white">
              <h2 className="font-bold">MINI QUIZ MODUL 2 — Investasi Bodong Digital</h2>
              <div className="text-xs italic text-white/80 mt-1">Jawab 3 pertanyaan berikut untuk mengecek pemahamanmu tentang Modul 2.</div>
            </div>

            <div className="p-6 space-y-8">
              {moduleData.miniQuiz?.map((quiz: any, index: number) => {
                const correctIndex = quiz.answer.charCodeAt(0) - 65;
                const answeredIndex = quizAnswers[quiz.id];

                return (
                  <div key={quiz.id} className="rounded-md border bg-[#eaf2f8]/50 p-4 text-slate-800">
                    <h3 className="font-bold text-[#1f4e79]">Soal {index + 1}: {quiz.question}</h3>
                    <div className="mt-4 space-y-2">
                      {quiz.options.map((opt: string, i: number) => {
                        const isPicked = answeredIndex === i;
                        const isCorrect = showResults && correctIndex === i;
                        const isWrongPicked = showResults && isPicked && correctIndex !== i;

                        let btnClass = "border-border bg-white text-slate-800 text-left hover:border-[#2980b9]/50";
                        if (isCorrect) btnClass = "border-[#27ae60] bg-[#27ae60]/10 text-[#27ae60] font-medium";
                        else if (isWrongPicked) btnClass = "border-[#c0392b] bg-[#c0392b]/10 text-[#c0392b] font-medium";
                        else if (isPicked && !showResults) btnClass = "border-[#2980b9] bg-[#2980b9]/10 text-[#2980b9] font-medium";

                        return (
                          <button
                            key={i}
                            onClick={() => handleAnswer(quiz.id, i)}
                            className={`w-full rounded-md border p-3 text-sm transition-colors ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {showResults && (
                      <div className="mt-4 rounded-md bg-[#eaf2f8] p-3 text-sm border-l-4 border-[#1f4e79] text-slate-800">
                        <div className="font-bold text-[#27ae60]">Jawaban Benar: {quiz.answer}</div>
                        <div className="mt-1 text-slate-700 italic">Pembahasan: {quiz.explanation}</div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 flex justify-center">
                {!showResults ? (
                  <Button
                    onClick={checkQuiz}
                    className="w-full max-w-sm bg-[#2980b9] hover:bg-[#1a5276]"
                    disabled={Object.keys(quizAnswers).length < (moduleData.miniQuiz?.length || 0)}
                  >
                    Kumpulkan Jawaban
                  </Button>
                ) : (
                  <div className="w-full">
                    <div className="rounded-md border border-[#2980b9]/30 bg-[#ebf5fb] p-4 text-center">
                      <div className="font-bold text-[#2980b9]">Modul 2 Selesai!</div>
                      <p className="mt-1 text-sm text-[#1f4e79]">
                        Luar biasa! Kamu sudah paham cara mendeteksi dan menghindari investasi bodong berbalut digital. Lanjutkan ke Modul 3 untuk mempelajari Modus Penipuan Belanja Daring.
                      </p>
                    </div>
                    <Button onClick={finishModule} className="mt-6 w-full bg-[#2980b9] hover:bg-[#1a5276]" size="lg">
                      Selesai & Lanjut Modul 3
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (moduleId === 3 && pathId === "penipuan") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
        {/* Header */}
        <div className="bg-[#1f4e79] px-6 py-8 text-center text-white">
          <Link to={`/app/paths/${pathId}` as any} className="absolute left-4 top-6 flex items-center text-white/80 hover:text-white">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <div className="text-sm font-bold tracking-widest text-white/80 uppercase">MODUL 3</div>
          <h1 className="mt-2 text-2xl font-bold leading-tight">{moduleData.title}</h1>
          <div className="mt-2 text-sm text-white/80 italic">Durasi: {moduleData.duration}</div>
        </div>

        <div className="mx-auto max-w-3xl space-y-8 px-6 py-8">
          {/* Top Table */}
          <div className="overflow-x-auto rounded-md border border-border">
            <table className="w-full text-left text-sm text-slate-800">
              <tbody className="divide-y divide-border">
                <tr className="bg-white">
                  <td className="p-3 font-bold bg-[#d4e6f1] w-1/4">Modul</td>
                  <td className="p-3">Modul 3 dari 5</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-bold bg-[#d4e6f1]">Topik</td>
                  <td className="p-3">Fake Marketplace, Phishing Link, Penipuan Transfer, Penipuan E-Wallet</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-bold bg-[#d4e6f1]">Durasi</td>
                  <td className="p-3">3-5 menit baca + 3 soal mini quiz</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-bold bg-[#d4e6f1]">Tujuan</td>
                  <td className="p-3">
                    <ul className="list-inside list-disc">
                      {moduleData.objectives?.map((obj: string, i: number) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Intro */}
          <section>
            <h2 className="bg-[#2980b9] p-2 text-lg font-bold text-white">Belanja Online Makin Mudah, Risiko Makin Besar</h2>
            <p className="mt-4 text-sm leading-relaxed">
              Transaksi digital di Indonesia tumbuh pesat, tapi begitu juga modus penipuannya. Penipu memanfaatkan kepercayaan konsumen terhadap platform digital untuk mengeruk keuntungan.
            </p>
          </section>

          {/* 1. Fake Marketplace */}
          <section>
            <div className="border-t pt-4">
              <h3 className="text-lg font-bold text-[#1f4e79]">1. Fake Marketplace / Toko Online Palsu</h3>
              <p className="mt-2 text-sm">
                Toko online palsu biasanya beroperasi di media sosial (Instagram, Facebook, TikTok) atau membuat website yang meniru marketplace ternama.
              </p>

              <h4 className="mt-4 font-bold text-[#2980b9]">Ciri-Ciri Toko Online Palsu:</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                <li>Harga produk jauh di bawah harga pasaran (lebih dari 30-50% lebih murah)</li>
                <li>Hanya menerima transfer bank / tidak ada payment gateway resmi</li>
                <li>Tidak ada atau sedikit ulasan pembeli, atau ulasan terlihat palsu (bintang 5 semua tanpa foto)</li>
                <li>Tidak ada alamat fisik atau nomor telepon yang bisa dihubungi</li>
                <li>Desain website/toko mirip marketplace resmi tapi URL berbeda</li>
                <li>Meminta bayar lunas terlebih dahulu untuk barang 'pre-order' tanpa jaminan</li>
              </ul>

              <div className="mt-6 rounded border border-[#27ae60] bg-[#d4efdf] p-4 text-[#1e8449]">
                <div className="font-bold">Tips Aman Belanja Online:</div>
                <p className="mt-1 text-sm">
                  Selalu gunakan marketplace resmi (Tokopedia, Shopee, Lazada, dll.) yang punya sistem escrow — uang baru diteruskan ke penjual setelah barang diterima pembeli. Hindari transfer langsung ke rekening pribadi penjual.
                </p>
              </div>
            </div>

            {/* 2. Phishing Link */}
            <div className="mt-8 border-t pt-8">
              <h3 className="text-lg font-bold text-[#1f4e79]">2. Phishing Link di Platform Belanja</h3>
              <p className="mt-2 text-sm">
                Penipu mengirimkan link palsu yang mengklaim sebagai konfirmasi pesanan, notifikasi pengiriman, atau promo eksklusif.
              </p>

              <h4 className="mt-4 font-bold text-[#2980b9]">Modus yang Sering Terjadi:</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                <li>Link palsu 'konfirmasi pembayaran': Meminta login ulang di website palsu yang mencuri kredensial</li>
                <li>Promo palsu: 'Selamat! Kamu menang voucher 1 juta, klik link ini' — setelah klik, diminta data kartu kredit</li>
                <li>Kurir palsu: Chat WA dari 'JNE/J&T/Gosend' meminta klik link untuk lacak paket</li>
                <li>Notifikasi palsu Shopee/Tokopedia di WhatsApp: Mengaku CS marketplace meminta kode OTP</li>
              </ul>
            </div>

            {/* 3. Penipuan Transfer */}
            <div className="mt-8 border-t pt-8">
              <h3 className="text-lg font-bold text-[#1f4e79]">3. Penipuan Transfer & E-Wallet</h3>
              <p className="mt-2 text-sm">
                Modus ini memanfaatkan layanan transfer uang dan dompet digital seperti GoPay, OVO, Dana, dan ShopeePay.
              </p>

              <h4 className="mt-4 font-bold text-[#2980b9]">Modus yang Umum Terjadi:</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                <li>Salah transfer palsu: Penipu mengaku salah transfer dan minta kembalikan, padahal bukti transfer dipalsukan</li>
                <li>Top-up palsu: Penjual online mengklaim membutuhkan 'kode top-up' dari pembeli sebagai verifikasi</li>
                <li>Hack e-wallet: Memancing korban memasukkan data login di website/aplikasi palsu</li>
                <li>Pinjaman dadakan: Meminta pinjaman melalui e-wallet dengan janji 'dibayar besok' kepada kenalan yang akunnya sudah dibobol</li>
              </ul>

              <div className="mt-6 rounded border border-[#e67e22] bg-[#fdebd0] p-4 text-[#7e5109]">
                <div className="font-bold text-[#d35400]">Waspadai Salah Transfer Palsu:</div>
                <p className="mt-1 text-sm">
                  Jika seseorang mengaku salah transfer ke akunmu, JANGAN langsung kembalikan. Verifikasi dulu melalui aplikasi bankmu — apakah benar ada dana masuk? Lapor ke bank jika ada manipulasi.
                </p>
              </div>
            </div>
          </section>

          {/* Langkah Aman Transaksi Digital */}
          <section>
            <h2 className="bg-[#2980b9] p-2 text-lg font-bold text-white">Langkah Aman Transaksi Digital</h2>
            <ol className="mt-4 list-inside list-decimal space-y-2 text-sm font-medium">
              <li>Selalu transaksi melalui platform resmi dengan sistem perlindungan pembeli</li>
              <li>Aktifkan notifikasi real-time untuk setiap transaksi di e-wallet dan rekening bank</li>
              <li>Jangan bagikan kode OTP, PIN, atau password kepada siapapun</li>
              <li>Verifikasi nomor rekening tujuan transfer sebelum mengirim</li>
              <li>Cek URL selalu diawali 'https://' dan nama domain benar sebelum login</li>
              <li>Simpan bukti transaksi digital untuk antisipasi sengketa</li>
            </ol>
          </section>

          {/* Mini Quiz */}
          <div className="mt-12 rounded-xl border-2 border-[#2980b9] overflow-hidden bg-white">
            <div className="bg-[#2980b9] p-4 text-center text-white">
              <h2 className="font-bold">MINI QUIZ MODUL 3 — Belanja Daring & E-Wallet</h2>
              <div className="text-xs italic text-white/80 mt-1">Jawab 3 pertanyaan berikut untuk mengecek pemahamanmu tentang Modul 3.</div>
            </div>

            <div className="p-6 space-y-8">
              {moduleData.miniQuiz?.map((quiz: any, index: number) => {
                const correctIndex = quiz.answer.charCodeAt(0) - 65;
                const answeredIndex = quizAnswers[quiz.id];

                return (
                  <div key={quiz.id} className="rounded-md border bg-[#eaf2f8]/50 p-4 text-slate-800">
                    <h3 className="font-bold text-[#1f4e79]">Soal {index + 1}: {quiz.question}</h3>
                    <div className="mt-4 space-y-2">
                      {quiz.options.map((opt: string, i: number) => {
                        const isPicked = answeredIndex === i;
                        const isCorrect = showResults && correctIndex === i;
                        const isWrongPicked = showResults && isPicked && correctIndex !== i;

                        let btnClass = "border-border bg-white text-slate-800 text-left hover:border-[#2980b9]/50";
                        if (isCorrect) btnClass = "border-[#27ae60] bg-[#27ae60]/10 text-[#27ae60] font-medium";
                        else if (isWrongPicked) btnClass = "border-[#c0392b] bg-[#c0392b]/10 text-[#c0392b] font-medium";
                        else if (isPicked && !showResults) btnClass = "border-[#2980b9] bg-[#2980b9]/10 text-[#2980b9] font-medium";

                        return (
                          <button
                            key={i}
                            onClick={() => handleAnswer(quiz.id, i)}
                            className={`w-full rounded-md border p-3 text-sm transition-colors ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {showResults && (
                      <div className="mt-4 rounded-md bg-[#eaf2f8] p-3 text-sm border-l-4 border-[#1f4e79] text-slate-800">
                        <div className="font-bold text-[#27ae60]">Jawaban Benar: {quiz.answer}</div>
                        <div className="mt-1 text-slate-700 italic">Pembahasan: {quiz.explanation}</div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 flex justify-center">
                {!showResults ? (
                  <Button
                    onClick={checkQuiz}
                    className="w-full max-w-sm bg-[#2980b9] hover:bg-[#1a5276]"
                    disabled={Object.keys(quizAnswers).length < (moduleData.miniQuiz?.length || 0)}
                  >
                    Kumpulkan Jawaban
                  </Button>
                ) : (
                  <div className="w-full">
                    <div className="rounded-md border border-[#2980b9]/30 bg-[#ebf5fb] p-4 text-center">
                      <div className="font-bold text-[#2980b9]">Modul 3 Selesai!</div>
                      <p className="mt-1 text-sm text-[#1f4e79]">
                        Kamu semakin pandai menjaga transaksi digitalmu. Lanjut ke Modul 4 tentang ancaman yang lebih canggih: Deepfake & AI.
                      </p>
                    </div>
                    <Button onClick={finishModule} className="mt-6 w-full bg-[#2980b9] hover:bg-[#1a5276]" size="lg">
                      Selesai & Lanjut Modul 4
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (moduleId === 4 && pathId === "penipuan") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
        {/* Header */}
        <div className="bg-[#1f4e79] px-6 py-8 text-center text-white">
          <Link to={`/app/paths/${pathId}` as any} className="absolute left-4 top-6 flex items-center text-white/80 hover:text-white">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <div className="text-sm font-bold tracking-widest text-white/80 uppercase">MODUL 4</div>
          <h1 className="mt-2 text-2xl font-bold leading-tight">{moduleData.title}</h1>
          <div className="mt-2 text-sm text-white/80 italic">Durasi: {moduleData.duration}</div>
        </div>

        <div className="mx-auto max-w-3xl space-y-8 px-6 py-8">
          {/* Top Table */}
          <div className="overflow-x-auto rounded-md border border-border">
            <table className="w-full text-left text-sm text-slate-800">
              <tbody className="divide-y divide-border">
                <tr className="bg-white">
                  <td className="p-3 font-bold bg-[#d4e6f1] w-1/4">Modul</td>
                  <td className="p-3">Modul 4 dari 5</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-bold bg-[#d4e6f1]">Topik</td>
                  <td className="p-3">Deepfake Video, Suara Palsu, Konten AI untuk Penipuan Keuangan</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-bold bg-[#d4e6f1]">Durasi</td>
                  <td className="p-3">3-5 menit baca + 3 soal mini quiz</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-bold bg-[#d4e6f1]">Tujuan</td>
                  <td className="p-3">
                    <ul className="list-inside list-disc">
                      {moduleData.objectives?.map((obj: string, i: number) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Intro */}
          <section>
            <h2 className="bg-[#2980b9] p-2 text-lg font-bold text-white">Ancaman Baru: Ketika AI Dipakai untuk Menipu</h2>
            <p className="mt-4 text-sm leading-relaxed">
              Perkembangan teknologi kecerdasan buatan (AI) membawa manfaat luar biasa, tapi juga membuka peluang baru bagi penipu. Deepfake dan AI-generated content kini menjadi senjata baru dalam arsenal penipuan keuangan.
            </p>
          </section>

          {/* Apa Itu Deepfake? */}
          <section>
            <div className="border-t pt-4">
              <h3 className="text-lg font-bold text-[#1f4e79]">Apa Itu Deepfake?</h3>
              <p className="mt-2 text-sm">
                Deepfake adalah konten video atau audio yang dibuat atau dimanipulasi menggunakan teknologi AI sehingga menampilkan seseorang seolah-olah melakukan atau mengatakan sesuatu yang tidak pernah dilakukannya.
              </p>

              <div className="mt-4 rounded border border-[#e74c3c] bg-[#fadbd8] p-4 text-[#922b21]">
                <div className="font-bold">Mengapa Deepfake Berbahaya?</div>
                <p className="mt-1 text-sm">
                  Dulu, melihat video berarti 'percaya'. Kini, video pun bisa dipalsukan dengan sangat meyakinkan menggunakan AI. Penipu menggunakan deepfake wajah pejabat, tokoh terkenal, atau bahkan anggota keluarga untuk menipu korban.
                </p>
              </div>
            </div>

            {/* Modus Deepfake */}
            <div className="mt-8 border-t pt-8">
              <h3 className="text-lg font-bold text-[#1f4e79]">Modus Deepfake dalam Penipuan Keuangan</h3>

              <div className="mt-4 space-y-6">
                <div>
                  <h4 className="font-bold text-[#2980b9]">1. Deepfake Pejabat/Selebriti untuk Promosi Investasi</h4>
                  <p className="mt-1 text-sm">Penipu membuat video deepfake yang menampilkan pejabat OJK, menteri keuangan, atau selebriti ternama seolah-olah merekomendasikan investasi atau produk keuangan tertentu.</p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>Video 'testimoni' tokoh terkenal tentang platform investasi ilegal</li>
                    <li>Live streaming palsu menggunakan wajah selebriti untuk promosi kripto</li>
                    <li>Iklan media sosial dengan deepfake figur publik</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-[#2980b9]">2. Voice Cloning (Suara Palsu)</h4>
                  <p className="mt-1 text-sm">Teknologi AI kini bisa meniru suara seseorang hanya dari beberapa detik rekaman suara, dan membuat suara palsu yang sangat mirip.</p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>Telepon dari 'anggota keluarga' yang mengaku dalam masalah dan butuh uang segera</li>
                    <li>Suara 'bos' atau 'atasan' yang meminta transfer uang darurat</li>
                    <li>'CEO fraud': suara palsu direktur perusahaan memerintahkan transfer ke rekening tertentu</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-[#2980b9]">3. Foto & Dokumen Palsu Berbasis AI</h4>
                  <p className="mt-1 text-sm">AI juga digunakan untuk membuat foto, dokumen, atau bukti palsu yang terlihat sangat nyata.</p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>Foto KTP palsu untuk mendaftar pinjaman atas nama orang lain</li>
                    <li>Bukti transfer palsu (screenshot yang diedit dengan AI)</li>
                    <li>Akun media sosial palsu dengan foto profil AI-generated yang tidak bisa di-reverse-search</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Cara Mendeteksi Deepfake */}
          <section>
            <h2 className="bg-[#2980b9] p-2 text-lg font-bold text-white">Cara Mendeteksi Deepfake</h2>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-md border p-4 bg-white">
                <h4 className="font-bold text-[#1f4e79]">Tanda-Tanda Visual Deepfake:</h4>
                <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                  <li>Gerakan wajah tidak sinkron dengan suara</li>
                  <li>Pencahayaan wajah tidak konsisten</li>
                  <li>Kedipan mata tidak natural / terlalu jarang</li>
                  <li>Tepi wajah atau rambut terlihat blur</li>
                  <li>Ekspresi wajah kaku atau tidak natural</li>
                </ul>
              </div>
              <div className="rounded-md border p-4 bg-white">
                <h4 className="font-bold text-[#1f4e79]">Langkah Verifikasi:</h4>
                <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                  <li>Cek sumber aslinya — akun resmi/terverifikasi?</li>
                  <li>Cari berita dari media terpercaya</li>
                  <li>Gunakan tools deteksi deepfake</li>
                  <li>Hubungi langsung melalui nomor yang dikenal sebelumnya</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded border border-[#2980b9] bg-[#eaf2f8] p-4 text-[#1f4e79]">
              <div className="font-bold">Prinsip Penting:</div>
              <p className="mt-1 text-sm italic">
                Di era deepfake, 'Melihat tidak berarti Percaya'. Selalu verifikasi informasi penting sebelum mengambil keputusan keuangan apapun.
              </p>
            </div>
          </section>

          {/* Mini Quiz */}
          <div className="mt-12 rounded-xl border-2 border-[#2980b9] overflow-hidden bg-white">
            <div className="bg-[#2980b9] p-4 text-center text-white">
              <h2 className="font-bold">MINI QUIZ MODUL 4 — Deepfake & AI Scam</h2>
              <div className="text-xs italic text-white/80 mt-1">Jawab 3 pertanyaan berikut untuk mengecek pemahamanmu tentang Modul 4.</div>
            </div>

            <div className="p-6 space-y-8">
              {moduleData.miniQuiz?.map((quiz: any, index: number) => {
                const correctIndex = quiz.answer.charCodeAt(0) - 65;
                const answeredIndex = quizAnswers[quiz.id];

                return (
                  <div key={quiz.id} className="rounded-md border bg-[#eaf2f8]/50 p-4 text-slate-800">
                    <h3 className="font-bold text-[#1f4e79]">Soal {index + 1}: {quiz.question}</h3>
                    <div className="mt-4 space-y-2">
                      {quiz.options.map((opt: string, i: number) => {
                        const isPicked = answeredIndex === i;
                        const isCorrect = showResults && correctIndex === i;
                        const isWrongPicked = showResults && isPicked && correctIndex !== i;

                        let btnClass = "border-border bg-white text-slate-800 text-left hover:border-[#2980b9]/50";
                        if (isCorrect) btnClass = "border-[#27ae60] bg-[#27ae60]/10 text-[#27ae60] font-medium";
                        else if (isWrongPicked) btnClass = "border-[#c0392b] bg-[#c0392b]/10 text-[#c0392b] font-medium";
                        else if (isPicked && !showResults) btnClass = "border-[#2980b9] bg-[#2980b9]/10 text-[#2980b9] font-medium";

                        return (
                          <button
                            key={i}
                            onClick={() => handleAnswer(quiz.id, i)}
                            className={`w-full rounded-md border p-3 text-sm transition-colors ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {showResults && (
                      <div className="mt-4 rounded-md bg-[#eaf2f8] p-3 text-sm border-l-4 border-[#1f4e79] text-slate-800">
                        <div className="font-bold text-[#27ae60]">Jawaban Benar: {quiz.answer}</div>
                        <div className="mt-1 text-slate-700 italic">Pembahasan: {quiz.explanation}</div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 flex justify-center">
                {!showResults ? (
                  <Button
                    onClick={checkQuiz}
                    className="w-full max-w-sm bg-[#2980b9] hover:bg-[#1a5276]"
                    disabled={Object.keys(quizAnswers).length < (moduleData.miniQuiz?.length || 0)}
                  >
                    Kumpulkan Jawaban
                  </Button>
                ) : (
                  <div className="w-full">
                    <div className="rounded-md border border-[#2980b9]/30 bg-[#ebf5fb] p-4 text-center">
                      <div className="font-bold text-[#2980b9]">Modul 4 Selesai!</div>
                      <p className="mt-1 text-sm text-[#1f4e79]">
                        Kamu sudah waspada terhadap ancaman AI yang canggih. Terakhir, mari pelajari cara melaporkan dan melindungi diri di Modul 5.
                      </p>
                    </div>
                    <Button onClick={finishModule} className="mt-6 w-full bg-[#2980b9] hover:bg-[#1a5276]" size="lg">
                      Selesai & Lanjut Modul 5
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (moduleId === 5 && pathId === "penipuan") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
        {/* Header */}
        <div className="bg-[#1f4e79] px-6 py-8 text-center text-white">
          <Link to={`/app/paths/${pathId}` as any} className="absolute left-4 top-6 flex items-center text-white/80 hover:text-white">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <div className="text-sm font-bold tracking-widest text-white/80 uppercase">MODUL 5</div>
          <h1 className="mt-2 text-2xl font-bold leading-tight">{moduleData.title}</h1>
          <div className="mt-2 text-sm text-white/80 italic">Durasi: {moduleData.duration}</div>
        </div>

        <div className="mx-auto max-w-3xl space-y-8 px-6 py-8">
          {/* Top Table */}
          <div className="overflow-x-auto rounded-md border border-border">
            <table className="w-full text-left text-sm text-slate-800">
              <tbody className="divide-y divide-border">
                <tr className="bg-white">
                  <td className="p-3 font-bold bg-[#d4e6f1] w-1/4">Modul</td>
                  <td className="p-3">Modul 5 dari 5</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-bold bg-[#d4e6f1]">Topik</td>
                  <td className="p-3">Cek Legalitas PUJK, Verifikasi Kontak Resmi, Lapor ke OJK/Polri</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-bold bg-[#d4e6f1]">Durasi</td>
                  <td className="p-3">3-5 menit baca + 3 soal mini quiz</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-bold bg-[#d4e6f1]">Tujuan</td>
                  <td className="p-3">
                    <ul className="list-inside list-disc">
                      {moduleData.objectives?.map((obj: string, i: number) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Intro */}
          <section>
            <h2 className="bg-[#2980b9] p-2 text-lg font-bold text-white">Kena Tipu Digital? Ini yang Harus Kamu Lakukan</h2>
            <p className="mt-4 text-sm leading-relaxed">
              Jika kamu atau orang terdekat menjadi korban penipuan digital, jangan panik dan jangan malu untuk melapor. Laporan dari masyarakat sangat penting untuk membantu OJK dan aparat menghentikan pelaku dan melindungi korban lain.
            </p>
          </section>

          {/* Steps */}
          <div className="space-y-12">
            {/* Step 1 */}
            <section>
              <h3 className="text-lg font-bold text-[#1f4e79] border-b-2 border-[#1f4e79] pb-1">Langkah 1: Amankan Akun dan Hentikan Kerugian</h3>
              <ul className="mt-4 list-inside list-decimal text-sm space-y-2 font-medium">
                <li>Segera ganti password semua akun yang mungkin terkompromi (email, bank, e-wallet, media sosial)</li>
                <li>Aktifkan autentikasi dua faktor (2FA) di semua akun penting</li>
                <li>Hubungi bank/e-wallet untuk memblokir kartu atau akun yang terdampak</li>
                <li>Kumpulkan semua bukti: screenshot percakapan, bukti transfer, nomor HP penipu, URL website palsu</li>
              </ul>
            </section>

            {/* Step 2 */}
            <section>
              <h3 className="text-lg font-bold text-[#1f4e79] border-b-2 border-[#1f4e79] pb-1">Langkah 2: Cek Legalitas Produk/Platform</h3>
              <p className="mt-2 text-sm">Sebelum melapor, atau jika kamu belum yakin apakah sudah menjadi korban, cek legalitas platform yang terlibat:</p>

              <div className="mt-4 overflow-x-auto rounded-md border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#1f4e79] text-white">
                    <tr>
                      <th className="p-3">Yang Ingin Dicek</th>
                      <th className="p-3">Cek di Mana</th>
                      <th className="p-3">Kontak</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="bg-white">
                      <td className="p-3 font-medium">Bank, Asuransi, Fintech P2P</td>
                      <td className="p-3 text-blue-600 underline">www.ojk.go.id — Cek PUJK Terdaftar</td>
                      <td className="p-3">Kontak OJK 157</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-3 font-medium">Broker Forex/Komoditas</td>
                      <td className="p-3 text-blue-600 underline">www.bappebti.go.id</td>
                      <td className="p-3">021-3857 9222</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-medium">Kripto (Aset Digital)</td>
                      <td className="p-3 text-blue-600 underline">www.bappebti.go.id — Calon Pedagang Fisik Aset Kripto</td>
                      <td className="p-3">021-3857 9222</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-3 font-medium">Entitas Ilegal (Blacklist)</td>
                      <td className="p-3 text-blue-600 underline">www.ojk.go.id — Satgas PASTI</td>
                      <td className="p-3">Kontak OJK 157</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Step 3 */}
            <section>
              <h3 className="text-lg font-bold text-[#1f4e79] border-b-2 border-[#1f4e79] pb-1">Langkah 3: Lapor ke Kanal yang Tepat</h3>

              <div className="mt-4 overflow-x-auto rounded-md border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#1f4e79] text-white">
                    <tr>
                      <th className="p-3">Jenis Masalah</th>
                      <th className="p-3">Lapor Ke</th>
                      <th className="p-3">Cara Lapor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="bg-white">
                      <td className="p-3">Penipuan produk keuangan ilegal (pinjol, investasi)</td>
                      <td className="p-3 font-bold">OJK via APPK</td>
                      <td className="p-3">www.ojk.go.id/APPK atau 157 (ext 1)</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-3">Pinjol ilegal, investasi bodong</td>
                      <td className="p-3 font-bold">Satgas PASTI OJK</td>
                      <td className="p-3">www.ojk.go.id/satgas-pasti atau WA 081157157157</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3">Penipuan online (transfer, marketplace)</td>
                      <td className="p-3 font-bold">Polisi (Bareskrim Siber)</td>
                      <td className="p-3">patrolisiber.id atau 110</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-3">Konten hoaks/penipuan di internet</td>
                      <td className="p-3 font-bold">Kominfo</td>
                      <td className="p-3">aduankonten.id</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3">Penipuan via platform belanja online</td>
                      <td className="p-3 font-bold">Platform langsung + Polisi</td>
                      <td className="p-3">Pusat bantuan Shopee/Tokopedia + 110</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Step 4 */}
            <section>
              <h3 className="text-lg font-bold text-[#1f4e79] border-b-2 border-[#1f4e79] pb-1">Langkah 4: Verifikasi Nomor & Email Resmi OJK</h3>
              <p className="mt-2 text-sm">Pastikan kamu menggunakan kontak resmi berikut:</p>
              <ul className="mt-4 list-inside list-disc text-sm space-y-1 font-medium text-slate-700">
                <li>Call Center OJK: <span className="text-[#1f4e79]">157</span> (hari kerja 08.00-17.00 WIB)</li>
                <li>WhatsApp OJK: <span className="text-[#1f4e79]">081157157157</span></li>
                <li>Email OJK: <span className="text-[#1f4e79]">konsumen@ojk.go.id</span></li>
                <li>Website resmi: <span className="text-blue-600">www.ojk.go.id</span></li>
                <li>APPK (pengaduan online): <span className="text-blue-600">www.ojk.go.id/id/kanal/appk</span></li>
              </ul>

              <div className="mt-6 rounded border border-[#e74c3c] bg-[#fadbd8] p-4 text-[#922b21]">
                <div className="font-bold">Peringatan:</div>
                <p className="mt-1 text-sm italic">
                  Waspadai nomor atau website yang mengklaim sebagai OJK tapi berbeda dari kontak resmi di atas. Penipu sering membuat akun media sosial atau nomor WA palsu yang mengatasnamakan OJK.
                </p>
              </div>
            </section>
          </div>

          {/* Checklist */}
          <section>
            <h2 className="bg-[#2980b9] p-2 text-lg font-bold text-white">Checklist Perlindungan Diri Digital</h2>
            <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-[#27ae60] shrink-0" />
                <span>Gunakan password unik dan kuat (minimal 12 karakter, kombinasi huruf, angka, simbol)</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-[#27ae60] shrink-0" />
                <span>Aktifkan autentikasi dua faktor (2FA) di semua akun penting</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-[#27ae60] shrink-0" />
                <span>Update aplikasi dan sistem operasi secara rutin untuk menutup celah keamanan</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-[#27ae60] shrink-0" />
                <span>Jangan gunakan WiFi publik untuk transaksi keuangan</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-[#27ae60] shrink-0" />
                <span>Backup data penting secara berkala</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-[#27ae60] shrink-0" />
                <span>Edukasi anggota keluarga, terutama lansia dan anak-anak, tentang modus penipuan digital</span>
              </li>
            </ul>
          </section>

          {/* Mini Quiz */}
          <div className="mt-12 rounded-xl border-2 border-[#2980b9] overflow-hidden bg-white">
            <div className="bg-[#2980b9] p-4 text-center text-white">
              <h2 className="font-bold">MINI QUIZ MODUL 5 — Melaporkan & Melindungi Diri</h2>
              <div className="text-xs italic text-white/80 mt-1">Jawab 3 pertanyaan berikut untuk mengecek pemahamanmu tentang Modul 5.</div>
            </div>

            <div className="p-6 space-y-8">
              {moduleData.miniQuiz?.map((quiz: any, index: number) => {
                const correctIndex = quiz.answer.charCodeAt(0) - 65;
                const answeredIndex = quizAnswers[quiz.id];

                return (
                  <div key={quiz.id} className="rounded-md border bg-[#eaf2f8]/50 p-4 text-slate-800">
                    <h3 className="font-bold text-[#1f4e79]">Soal {index + 1}: {quiz.question}</h3>
                    <div className="mt-4 space-y-2">
                      {quiz.options.map((opt: string, i: number) => {
                        const isPicked = answeredIndex === i;
                        const isCorrect = showResults && correctIndex === i;
                        const isWrongPicked = showResults && isPicked && correctIndex !== i;

                        let btnClass = "border-border bg-white text-slate-800 text-left hover:border-[#2980b9]/50";
                        if (isCorrect) btnClass = "border-[#27ae60] bg-[#27ae60]/10 text-[#27ae60] font-medium";
                        else if (isWrongPicked) btnClass = "border-[#c0392b] bg-[#c0392b]/10 text-[#c0392b] font-medium";
                        else if (isPicked && !showResults) btnClass = "border-[#2980b9] bg-[#2980b9]/10 text-[#2980b9] font-medium";

                        return (
                          <button
                            key={i}
                            onClick={() => handleAnswer(quiz.id, i)}
                            className={`w-full rounded-md border p-3 text-sm transition-colors ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {showResults && (
                      <div className="mt-4 rounded-md bg-[#eaf2f8] p-3 text-sm border-l-4 border-[#1f4e79] text-slate-800">
                        <div className="font-bold text-[#27ae60]">Jawaban Benar: {quiz.answer}</div>
                        <div className="mt-1 text-slate-700 italic">Pembahasan: {quiz.explanation}</div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 flex justify-center">
                {!showResults ? (
                  <Button
                    onClick={checkQuiz}
                    className="w-full max-w-sm bg-[#2980b9] hover:bg-[#1a5276]"
                    disabled={Object.keys(quizAnswers).length < (moduleData.miniQuiz?.length || 0)}
                  >
                    Kumpulkan Jawaban
                  </Button>
                ) : (
                  <div className="w-full">
                    <div className="rounded-md border border-[#2980b9]/30 bg-[#ebf5fb] p-4 text-center">
                      <div className="font-bold text-[#2980b9]">Modul 5 Selesai!</div>
                      <p className="mt-1 text-sm text-[#1f4e79]">
                        Luar biasa! Kamu telah menyelesaikan seluruh modul Penipuan Digital. Kamu kini lebih siap melindungi diri dan orang sekitar. Lanjut ke Final Quiz untuk mendapatkan sertifikatmu!
                      </p>
                    </div>
                    <Button onClick={finishModule} className="mt-6 w-full bg-[#2980b9] hover:bg-[#1a5276]" size="lg">
                      Selesai & Lanjut ke Final Quiz
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for other modules just showing plain text for now
  return (
    <div className="min-h-screen bg-background px-6 py-8 pb-32">
      <div className="mx-auto max-w-2xl">
        <Link to="/app/paths/pinjol" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="mr-1 h-4 w-4" /> Kembali
        </Link>
        <div className="text-sm font-medium uppercase tracking-widest text-primary">
          Modul {moduleId}
        </div>
        <h1 className="mt-2 text-3xl font-bold">{moduleData.title}</h1>
        <div className="mt-2 text-sm text-muted-foreground">Durasi: {moduleData.duration}</div>

        <div className="prose prose-sm mt-8 max-w-none dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: moduleData.content?.replace(/\n/g, '<br/>') || "" }} />
        </div>

        <div className="mt-12 rounded-xl border bg-white p-6 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mt-4 font-bold">Modul Selesai!</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Kamu telah membaca semua materi di modul ini.
          </p>
          <Button className="mt-6 w-full" onClick={finishModule}>
            Tandai Selesai & Lanjut
          </Button>
        </div>
      </div>
    </div>
  );
}
