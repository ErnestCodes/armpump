export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse bg-fp-border/50 rounded ${className}`} />;
}

export function TokenCardSkeleton() {
  return (
    <div className="bg-fp-surface border border-fp-border rounded-xl p-4">
      <Skeleton className="w-full aspect-square rounded-lg mb-3" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-3 w-1/2 mb-3" />
      <Skeleton className="h-2 w-full rounded-full" />
    </div>
  );
}
