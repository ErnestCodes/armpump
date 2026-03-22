"use client";

import Link from "next/link";
import { useWeb3 } from "../../context/Web3Context";
import Button from "../ui/Button";

export default function Header() {
  const { account, isSupported } = useWeb3();

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-display tracking-widest text-2xl text-fp-accent drop-shadow-[0_0_8px_rgba(0,212,170,0.5)]">
              Rauly Dealflow
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a href="https://cal.com/rauly-dealflow/30min" target="_blank" rel="noopener noreferrer">
              <Button size="sm">
                Contact Us
              </Button>
            </a>
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
