"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import Link from "next/link";
import { useWeb3 } from "../context/Web3Context";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { formatEth } from "../lib/utils";
import { uploadToPinata, saveTokenImage } from "../lib/pinata";

export default function CreatePage() {
  const { factory, signer, fee, account } = useWeb3();
  const router = useRouter();
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [creating, setCreating] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (name.length > 32) e.name = "Name must be 32 characters or less";
    if (!ticker.trim()) e.ticker = "Ticker is required";
    if (ticker.length > 10) e.ticker = "Ticker must be 10 characters or less";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    if (!signer || !factory) {
      toast.error("Please connect your wallet");
      return;
    }

    setCreating(true);
    const toastId = toast.loading("Creating token...");

    try {
      // Upload image to Pinata if provided
      let imageUrl = null;
      if (imageFile) {
        toast.loading("Uploading image...", { id: toastId });
        try {
          imageUrl = await uploadToPinata(imageFile, name, ticker);
        } catch {
          // Image upload failure is non-fatal
          toast.loading("Image upload skipped. Creating token...", {
            id: toastId,
          });
        }
      }

      toast.loading("Confirm in your wallet...", { id: toastId });
      const tx = await factory
        .connect(signer)
        .create(name, ticker.toUpperCase(), { value: fee });

      toast.loading("Transaction pending...", { id: toastId });
      const receipt = await tx.wait();

      // Extract token address from Created event
      let tokenAddress = null;
      for (const log of receipt.logs) {
        try {
          const parsed = factory.interface.parseLog(log);
          if (parsed?.name === "Created") {
            tokenAddress = parsed.args[0];
            break;
          }
        } catch {
          // Skip non-matching logs
        }
      }

      // Save image mapping if we got both
      if (tokenAddress && imageUrl) {
        saveTokenImage(tokenAddress, imageUrl);
      }

      toast.success("Token created successfully!", { id: toastId });

      if (tokenAddress) {
        router.push(`/token/${tokenAddress}`);
      } else {
        router.push("/");
      }
    } catch (err) {
      const msg = err.reason || err.message || "Failed to create token";
      toast.error(msg, { id: toastId });
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <Link
        href="/"
        className="text-fp-text-dim hover:text-fp-text text-sm mb-6 inline-block transition-colors"
      >
        &larr; Back to all tokens
      </Link>

      <h1 className="text-2xl font-bold mb-2">Create a New Token</h1>
      <p className="text-fp-text-dim text-sm mb-6">
        Launch your token on the bonding curve. Costs{" "}
        {fee ? formatEth(fee) : "0.01"} ETH listing fee.
      </p>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Token image upload */}
          <div>
            <label className="text-sm text-fp-text-dim block mb-2">
              Token Image (optional)
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-fp-bg border border-fp-border flex items-center justify-center overflow-hidden flex-shrink-0">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-fp-text-dim text-xs">No image</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm text-fp-text-dim file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-fp-border file:text-fp-text file:bg-fp-surface file:cursor-pointer hover:file:bg-fp-surface-hover"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-sm text-fp-text-dim block mb-1">
              Token Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My Cool Token"
              maxLength={32}
              className="w-full bg-fp-bg border border-fp-border rounded-lg px-4 py-3 text-fp-text placeholder-fp-text-dim focus:outline-none focus:border-fp-accent/50 transition-colors"
            />
            {errors.name && (
              <p className="text-fp-danger text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Ticker */}
          <div>
            <label className="text-sm text-fp-text-dim block mb-1">
              Ticker Symbol
            </label>
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              placeholder="e.g. MCT"
              maxLength={10}
              className="w-full bg-fp-bg border border-fp-border rounded-lg px-4 py-3 text-fp-text uppercase placeholder-fp-text-dim focus:outline-none focus:border-fp-accent/50 transition-colors"
            />
            {errors.ticker && (
              <p className="text-fp-danger text-xs mt-1">{errors.ticker}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            loading={creating}
            disabled={!account || creating}
          >
            {!account
              ? "Connect Wallet First"
              : creating
              ? "Creating..."
              : `Create Token (${fee ? formatEth(fee) : "0.01"} ETH)`}
          </Button>
        </form>
      </Card>
    </div>
  );
}
