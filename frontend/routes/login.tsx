import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Shield, Mail, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Masuk — FINLIT" }] }),
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();
  const [error, setError] = useState("");
  return (
    <div className="flex min-h-screen items-center justify-center bg-hero px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-card">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
            <Shield className="h-6 w-6 text-primary" fill="currentColor" fillOpacity={0.15} />
          </div>
          <h1 className="text-2xl font-bold">Masuk ke Finlit</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Akses aman ke edukasi dan perlindungan finansial Anda.
          </p>
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => { 
            e.preventDefault(); 
            if (localStorage.getItem("hasSignedUp") !== "true") {
              setError("Akun belum terdaftar. Silakan daftar terlebih dahulu.");
              return;
            }
            nav({ to: "/home" }); 
          }}
        >
          {error && <div className="text-sm text-red-500 text-center font-medium bg-red-500/10 p-2 rounded-md">{error}</div>}
          <div className="space-y-2">
            <Label>Email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="email" placeholder="Alamat email Anda" className="bg-input pl-9" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Kata Sandi</Label>
              <a className="text-xs text-primary hover:underline" href="#">Lupa Kata Sandi?</a>
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="password" placeholder="••••••••" className="bg-input pl-9" />
            </div>
          </div>
          <Button className="w-full shadow-glow" size="lg">Masuk</Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Belum punya akun?{" "}
          <Link to="/signup" className="font-medium text-primary hover:underline">Daftar Sekarang</Link>
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" />
          Data Anda dilindungi oleh enkripsi standar industri.
        </div>
      </div>
    </div>
  );
}
