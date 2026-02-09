export default function SearchBar({
  value,
  onChange,
  placeholder = "Search tokens...",
}) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fp-text-dim"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-fp-surface border border-fp-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-fp-text placeholder-fp-text-dim focus:outline-none focus:border-fp-accent/50 transition-colors"
      />
    </div>
  );
}
