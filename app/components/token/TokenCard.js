"use client";

import Link from "next/link";
import { ethers } from "ethers";
import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";
import Badge from "../ui/Badge";
import { shortenAddress, formatEth } from "../../lib/utils";
import { TARGET_ETH } from "../../lib/constants";

export default function TokenCard({ token }) {
  const raisedEth = parseFloat(ethers.formatEther(token.raised));

  return (
    <Link href={`/token/${token.token}`}>
      <Card hoverable className="group h-full">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3 bg-fp-bg">
          {token.image ? (
            <img
              src={token.image}
              alt={token.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl font-display text-fp-accent/30">
              {token.name?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Badge variant={token.isOpen ? "live" : "graduated"}>
              {token.isOpen ? "Live" : "Graduated"}
            </Badge>
          </div>
        </div>

        <h3 className="font-semibold text-fp-text group-hover:text-fp-accent transition-colors truncate">
          {token.name}
        </h3>
        <p className="text-xs text-fp-text-dim mt-1">
          by {shortenAddress(token.creator)}
        </p>

        <div className="mt-3">
          <ProgressBar value={raisedEth} max={TARGET_ETH} />
        </div>

        <div className="flex justify-between mt-2 text-xs text-fp-text-dim">
          <span>{formatEth(token.raised)} ETH raised</span>
        </div>
      </Card>
    </Link>
  );
}
