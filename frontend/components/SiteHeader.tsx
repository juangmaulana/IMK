import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export function SiteHeader({ signedIn = false }: { signedIn?: boolean }) {
  return (
    <header className="flex items-center justify-between border-b border-border/60 bg-background/60 px-6 py-4 backdrop-blur">
      <Link href="/"><Logo /></Link>
      {signedIn ? (
        <Link href="/app/profile" className="rounded-full p-2 hover:bg-secondary">
          <User className="h-5 w-5" />
        </Link>
      ) : (
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm"><Link href="/login">Login</Link></Button>
          <Button asChild size="sm"><Link href="/signup">Sign Up</Link></Button>
        </div>
      )}
    </header>
  );
}
