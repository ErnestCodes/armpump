"use client";

import { useWeb3 } from "../../context/Web3Context";

export default function NetworkBadge() {
  const { chainId, networkName, isSupported } = useWeb3();

  if (!chainId) return null;

  const color = isSupported ? "bg-fp-success" : "bg-fp-danger";

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-fp-surface border border-fp-border rounded-full text-xs">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-fp-text-dim">{networkName}</span>
    </div>
  );
}
