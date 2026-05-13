import { Shield } from "lucide-react";

export function Logo({ subtitle = false, short = false }: { subtitle?: boolean; short?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {short && <Shield className="h-6 w-6 text-primary" fill="currentColor" fillOpacity={0.15} />}
      <div className="leading-none">
        <div className="font-display text-lg font-extrabold tracking-tight">
          {short ? "FINLIT" : "Financial Literacy"}
        </div>
        {subtitle && (
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Financial Sanctuary
          </div>
        )}
      </div>
    </div>
  );
}
