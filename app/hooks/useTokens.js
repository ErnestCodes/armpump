"use client";

import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "../context/Web3Context";
import { getTokenImage } from "../lib/pinata";
import { DEMO_TOKENS } from "../lib/demo-data";

const TOKENS_PER_PAGE = 12;

export function useTokens() {
  const { factory } = useWeb3();
  const [tokens, setTokens] = useState(DEMO_TOKENS);
  const [totalCount, setTotalCount] = useState(DEMO_TOKENS.length);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const fetchTokens = useCallback(async () => {
    if (!factory) {
      setTokens(DEMO_TOKENS);
      setTotalCount(DEMO_TOKENS.length);
      return;
    }
    setLoading(true);

    try {
      const total = await factory.totalTokens();
      const count = Number(total);
      
      if (count === 0) {
        setTokens(DEMO_TOKENS);
        setTotalCount(DEMO_TOKENS.length);
        setLoading(false);
        return;
      }

      setTotalCount(count);

      const allTokens = [];
      for (let i = 0; i < count; i++) {
        const sale = await factory.getTokenSale(i);
        const image = typeof window !== "undefined" ? getTokenImage(sale.token) : null;
        allTokens.push({
          index: i,
          token: sale.token,
          name: sale.name,
          creator: sale.creator,
          sold: sale.sold,
          raised: sale.raised,
          isOpen: sale.isOpen,
          image,
        });
      }
      setTokens(allTokens);
    } catch (err) {
      console.error("Failed to fetch tokens:", err);
      // Fallback to demo data on error
      setTokens(DEMO_TOKENS);
      setTotalCount(DEMO_TOKENS.length);
    } finally {
      setLoading(false);
    }
  }, [factory]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  const filtered = tokens
    .filter(
      (t) =>
        searchQuery === "" ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") return b.index - a.index;
      if (sortBy === "raised") return Number(b.raised - a.raised);
      if (sortBy === "progress") return Number(b.sold - a.sold);
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / TOKENS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * TOKENS_PER_PAGE,
    page * TOKENS_PER_PAGE
  );

  return {
    tokens: paginated,
    allTokens: filtered,
    totalCount,
    totalPages,
    page,
    setPage,
    loading,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    refetch: fetchTokens,
  };
}
