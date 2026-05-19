"use client";

import type { ComponentType, InputHTMLAttributes } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, User, Mail, Lock, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest, saveAuthSession, getEffectivePathProgress, syncUserToLocalStorage, type ApiUser } from "@/lib/api";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: ComponentType<{ className?: string }>;
  placeholder: string;
};

function Field({ label, icon: Icon, type = "text", placeholder, ...props }: FieldProps) {
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

export default function SignupPage() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] px-6 py-12 text-[#f1eeee]">
      <div className="w-full max-w-md rounded-2xl border border-[#242020] bg-[#161313] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#201b1a]">
            <Shield className="h-6 w-6 text-primary" fill="currentColor" fillOpacity={0.15} />
          </div>
          <h1 className="text-2xl font-bold">Daftar ke Finlit</h1>
          <p className="mt-1 text-sm text-muted-foreground">Langkah pertama menuju kemandirian finansial yang aman.</p>
          <div className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-primary" />
        </div>

        <form
          className="space-y-5"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = String(formData.get("name") || "").trim();
            const email = formData.get("email") as string;
            const password = String(formData.get("password") || "");
            const passwordConfirmation = String(formData.get("passwordConfirmation") || "");

            if (!name || !email || !password) return;
            if (password !== passwordConfirmation) {
              setError("Konfirmasi kata sandi tidak sama.");
              setSuccess(false);
              return;
            }

            setSubmitting(true);
            try {
              const localPoints = Number(localStorage.getItem("totalPoints") || 0);
              const localProgress = {
                pinjol: getEffectivePathProgress("pinjol"),
                penipuan: getEffectivePathProgress("penipuan"),
              };
              const { token, user } = await apiRequest<{ token: string; user: ApiUser }>("/auth/register", {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
              });
              saveAuthSession(token, user);
              localStorage.setItem("hasSignedUp", "true");
              if (localPoints > 0 || localProgress.pinjol > 0 || localProgress.penipuan > 0) {
                try {
                  const synced = await apiRequest<{ user: ApiUser }>("/sync", {
                    method: "POST",
                    body: JSON.stringify({ points: localPoints, progress: localProgress }),
                  });
                  syncUserToLocalStorage(synced.user);
                } catch {
                  // sync gagal, data lokal tetap dipakai
                }
              }
              setError("");
              setSuccess(true);
              router.push("/home");
            } catch (err) {
              setError(err instanceof Error ? err.message : "Gagal membuat akun.");
              setSuccess(false);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {error && <div className="rounded-md bg-red-500/10 p-2 text-center text-sm font-medium text-red-600">{error}</div>}
          {success && <div className="rounded-md bg-green-500/10 p-2 text-center text-sm font-medium text-green-600">Akun berhasil dibuat! Mengarah ke beranda</div>}
          <Field label="Nama Lengkap" icon={User} placeholder="Masukkan nama Anda" name="name" required />
          <Field label="Email" icon={Mail} type="email" placeholder="alamat@email.com" name="email" required />
          <Field label="Kata Sandi" icon={Lock} type="password" placeholder="Minimal 8 karakter" name="password" required />
          <Field label="Konfirmasi Kata Sandi" icon={KeyRound} type="password" placeholder="Ulangi kata sandi" name="passwordConfirmation" required />
          <Button className="w-full shadow-glow" size="lg" disabled={submitting}>
            {submitting ? "Mendaftarkan..." : "Daftar →"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-medium text-foreground hover:text-primary">Masuk</Link>
        </p>
        <p className="mt-6 text-center text-[11px] leading-relaxed text-muted-foreground">
          Data Anda dilindungi enkripsi tingkat industri. Kami berkomitmen untuk tidak membagikan data Anda kepada pihak ketiga tanpa izin.
        </p>
      </div>
    </div>
  );
}
