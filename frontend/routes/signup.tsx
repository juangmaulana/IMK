import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Shield, User, Mail, Lock, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Daftar — FINLIT" }] }),
  component: SignupPage,
});

function Field({ label, icon: Icon, type = "text", placeholder, ...props }: any) {
  return (
    <div className="space-y-2">
      <Label className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</Label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input type={type} placeholder={placeholder} className="bg-input pl-9" {...props} />
      </div>
    </div>
  );
}

function SignupPage() {
  const nav = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  return (
    <div className="flex min-h-screen items-center justify-center bg-hero px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-card">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
            <Shield className="h-6 w-6 text-primary" fill="currentColor" fillOpacity={0.15} />
          </div>
          <h1 className="text-2xl font-bold">Daftar ke Finlit</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Langkah pertama menuju kemandirian finansial yang aman.
          </p>
          <div className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-primary" />
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email") as string;
            
            if (!email) return;

            const registeredEmails = JSON.parse(localStorage.getItem("registeredEmails") || "[]");
            if (registeredEmails.includes(email)) {
              setError("Alamat email ini sudah terdaftar. Silakan gunakan email lain atau masuk.");
              setSuccess(false);
              return;
            }

            registeredEmails.push(email);
            localStorage.setItem("registeredEmails", JSON.stringify(registeredEmails));
            localStorage.setItem("hasSignedUp", "true");
            
            setError("");
            setSuccess(true);
            setTimeout(() => {
              nav({ to: "/login" });
            }, 2000);
          }}
        >
          {error && (
            <div className="text-sm text-red-600 text-center font-medium bg-red-500/10 p-2 rounded-md">
              {error}
            </div>
          )}
          {success && (
            <div className="text-sm text-green-600 text-center font-medium bg-green-500/10 p-2 rounded-md">
              Akun berhasil dibuat! Mengarahkan ke halaman login
            </div>
          )}
          <Field label="Nama Lengkap" icon={User} placeholder="Masukkan nama Anda" required />
          <Field label="Email" icon={Mail} type="email" placeholder="alamat@email.com" name="email" required />
          <Field label="Kata Sandi" icon={Lock} type="password" placeholder="Minimal 8 karakter" required />
          <Field label="Konfirmasi Kata Sandi" icon={KeyRound} type="password" placeholder="Ulangi kata sandi" required />
          <Button className="w-full shadow-glow" size="lg">Daftar →</Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Sudah punya akun?{" "}
          <Link to="/login" className="font-medium text-foreground hover:text-primary">Masuk</Link>
        </p>
        <p className="mt-6 text-center text-[11px] leading-relaxed text-muted-foreground">
          Data Anda dilindungi enkripsi tingkat industri. Kami berkomitmen untuk tidak membagikan data Anda kepada pihak ketiga tanpa izin.
        </p>
      </div>
    </div>
  );
}
