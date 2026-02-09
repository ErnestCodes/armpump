export default function Badge({ children, variant = "default" }) {
  const styles = {
    default: "bg-fp-surface border-fp-border text-fp-text-dim",
    live: "bg-fp-accent/10 border-fp-accent/20 text-fp-accent",
    graduated: "bg-fp-success/10 border-fp-success/20 text-fp-success",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${styles[variant]}`}
    >
      {variant === "live" && (
        <span className="w-1.5 h-1.5 rounded-full bg-fp-accent mr-1.5 animate-pulse" />
      )}
      {children}
    </span>
  );
}
