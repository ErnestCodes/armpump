"use client";

import Link from "next/link";
import { useWeb3 } from "../../context/Web3Context";
import { shortenAddress, formatEth } from "../../lib/utils";
import Button from "../ui/Button";
import NetworkBadge from "../ui/NetworkBadge";

export default function Header() {
  const { account, balance, isConnecting, connect, isSupported } = useWeb3();

  return (
    <header className="sticky top-0 z-50 bg-fp-bg/80 backdrop-blur-xl border-b border-fp-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-display text-2xl text-fp-accent">
              fun.pump
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm text-fp-text-dim hover:text-fp-text transition-colors"
              >
                Explore
              </Link>
              <Link
                href="/create"
                className="text-sm text-fp-text-dim hover:text-fp-text transition-colors"
              >
                Create
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <NetworkBadge />
            {account ? (
              <div className="flex items-center gap-2 bg-fp-surface border border-fp-border rounded-lg px-3 py-2">
                <span className="text-xs text-fp-text-dim">
                  {formatEth(balance)} ETH
                </span>
                <span className="text-xs text-fp-text font-mono">
                  {shortenAddress(account)}
                </span>
              </div>
            ) : (
              <Button onClick={connect} loading={isConnecting} size="sm">
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>

      {account && !isSupported && (
        <div className="bg-fp-danger/10 border-b border-fp-danger/20 px-4 py-2 text-center text-sm text-fp-danger">
          Unsupported network. Please switch to Base or Base Sepolia.
        </div>
      )}
    </header>
  );
}
