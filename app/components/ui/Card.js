export default function Card({
  children,
  hoverable = false,
  className = "",
  ...props
}) {
  return (
    <div
      className={`bg-fp-surface border border-fp-border rounded-xl p-4 ${
        hoverable
          ? "hover:border-fp-accent/30 hover:bg-fp-surface-hover transition-all duration-200 cursor-pointer"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
