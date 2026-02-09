"use client";

import Link from "next/link";
import { useWeb3 } from "./context/Web3Context";
import { useTokens } from "./hooks/useTokens";
import TokenGrid from "./components/token/TokenGrid";
import SearchBar from "./components/ui/SearchBar";
import Pagination from "./components/ui/Pagination";
import Button from "./components/ui/Button";

export default function Home() {
  const { account, factory } = useWeb3();
  const {
    tokens,
    totalCount,
    loading,
    page,
    setPage,
    totalPages,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  } = useTokens();

  return (
    <div>
      {/* Hero */}
      <section className="text-center py-16 sm:py-24">
        <h1 className="font-display text-4xl sm:text-6xl text-fp-accent mb-4">
          fun.pump
        </h1>
        <p className="text-fp-text-dim text-lg max-w-2xl mx-auto mb-8">
          Launch your token on Base in seconds. Fair bonding curve pricing.
          Graduate at 3 ETH and tokens transfer to the creator.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/create">
            <Button size="lg">Create Token</Button>
          </Link>
          <Button
            variant="secondary"
            size="lg"
            onClick={() =>
              document
                .getElementById("explore")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore
          </Button>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-12 mt-12">
          <div>
            <p className="text-2xl font-bold text-fp-text">{totalCount}</p>
            <p className="text-xs text-fp-text-dim">Tokens Created</p>
          </div>
        </div>
      </section>

      {/* Explore */}
      <section id="explore">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold">Explore Tokens</h2>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-fp-surface border border-fp-border rounded-lg px-3 py-2.5 text-sm text-fp-text focus:outline-none focus:border-fp-accent/50"
            >
              <option value="newest">Newest</option>
              <option value="raised">Most Raised</option>
              <option value="progress">Most Progress</option>
            </select>
          </div>
        </div>

        <TokenGrid tokens={tokens} loading={loading} />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </section>
    </div>
  );
}
