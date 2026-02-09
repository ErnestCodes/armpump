"use client";

import { useState } from "react";
import { ethers } from "ethers";
import Button from "../ui/Button";
import { formatEth } from "../../lib/utils";
import { BUY_MIN, BUY_MAX } from "../../lib/constants";

export default function BuyTokenForm({ cost, onBuy }) {
  const [amount, setAmount] = useState("");
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState("");

  const numAmount = parseInt(amount) || 0;
  const totalCost = cost && numAmount > 0 ? cost * BigInt(numAmount) : BigInt(0);

  function validate(val) {
    const n = parseInt(val);
    if (isNaN(n) || n < BUY_MIN) return `Minimum ${BUY_MIN} token`;
    if (n > BUY_MAX) return `Maximum ${BUY_MAX} tokens per transaction`;
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate(amount);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setBuying(true);
    try {
      await onBuy(numAmount);
      setAmount("");
    } finally {
      setBuying(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-xs text-fp-text-dim mb-1 block">
          Amount ({BUY_MIN.toLocaleString()} - {BUY_MAX.toLocaleString()})
        </label>
        <input
          type="number"
          min={BUY_MIN}
          max={BUY_MAX}
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setError("");
          }}
          placeholder="Enter amount"
          className="w-full bg-fp-bg border border-fp-border rounded-lg px-4 py-3 text-fp-text focus:outline-none focus:border-fp-accent/50 transition-colors"
        />
        {error && <p className="text-fp-danger text-xs mt-1">{error}</p>}
      </div>

      {numAmount > 0 && cost && (
        <div className="bg-fp-bg rounded-lg p-3 text-sm">
          <div className="flex justify-between text-fp-text-dim">
            <span>Price per token</span>
            <span>{formatEth(cost)} ETH</span>
          </div>
          <div className="flex justify-between text-fp-text font-semibold mt-1">
            <span>Total cost</span>
            <span>{formatEth(totalCost)} ETH</span>
          </div>
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        loading={buying}
        disabled={!amount || buying}
      >
        {buying ? "Buying..." : "Buy Tokens"}
      </Button>
    </form>
  );
}
