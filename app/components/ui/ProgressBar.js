export default function ProgressBar({
  value,
  max = 100,
  showLabel = true,
  className = "",
}) {
  const pct = Math.min((value / max) * 100, 100);
  const color =
    pct >= 100 ? "bg-fp-success" : pct >= 75 ? "bg-fp-warning" : "bg-fp-accent";

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-xs text-fp-text-dim mb-1">
          <span>{pct.toFixed(1)}% funded</span>
          <span>
            {pct >= 100
              ? "Graduated!"
              : `${(max - value).toFixed(4)} ETH to go`}
          </span>
        </div>
      )}
      <div className="w-full h-2 bg-fp-bg rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
