import TokenCard from "./TokenCard";
import { TokenCardSkeleton } from "../ui/Skeleton";

export default function TokenGrid({ tokens, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <TokenCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!tokens || tokens.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-fp-text-dim text-lg">No tokens found</p>
        <p className="text-fp-text-dim text-sm mt-2">
          Be the first to create one!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {tokens.map((token) => (
        <TokenCard key={token.token} token={token} />
      ))}
    </div>
  );
}
