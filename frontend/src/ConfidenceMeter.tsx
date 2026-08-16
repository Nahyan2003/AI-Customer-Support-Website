export function ConfidenceMeter({ value }: { value: number }) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);

  return (
    <span className="glass-chip flex items-center gap-2 rounded-full px-3 py-1 text-[0.7rem] font-medium text-muted-foreground">
      Confidence
      <span className="relative h-1.5 w-16 overflow-hidden rounded-full bg-foreground/10">
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-confidence transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className="tabular-nums text-foreground/80">{pct}%</span>
    </span>
  );
}
