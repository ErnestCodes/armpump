"use client";

import { useEffect, useState, use } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import Link from "next/link";
import { useWeb3 } from "../../context/Web3Context";
import BuyTokenForm from "../../components/forms/BuyTokenForm";
import BondingCurveChart from "../../components/token/BondingCurveChart";
import GraduationProgress from "../../components/token/GraduationProgress";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { shortenAddress, formatEth } from "../../lib/utils";
import { TARGET_ETH, TOKEN_LIMIT, TOTAL_SUPPLY } from "../../lib/constants";
import { getTokenImage } from "../../lib/pinata";
import { DEMO_TOKENS } from "../../lib/demo-data";
import { projects } from "../../lib/dealflow-data";

export default function TokenDetailPage({ params }) {
  const { address } = use(params);
  const { factory, signer, account, explorerUrl } = useWeb3();
  const [token, setToken] = useState(null);
  const [cost, setCost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function fetchToken() {
      // Check for portfolio data first
      const portfolioProject = projects.find(p => p.address?.toLowerCase() === address.toLowerCase());
      if (portfolioProject) {
        setToken({
          ...portfolioProject,
          isPortfolio: true,
          isOpen: false, // Portfolio projects aren't "live" on-chain tokens
        });
        setImage(portfolioProject.image);
        setLoading(false);
        return;
      }

      // Check for demo data
      const demoToken = DEMO_TOKENS.find(t => t.token.toLowerCase() === address.toLowerCase());
      if (demoToken) {
        setToken(demoToken);
        setImage(demoToken.image);
        setCost(ethers.parseEther("0.0001"));
        setLoading(false);
        return;
      }

      if (!factory) return;
      try {
        const sale = await factory.tokenToSale(address);
        setToken({
          token: sale.token,
          name: sale.name,
          creator: sale.creator,
          sold: sale.sold,
          raised: sale.raised,
          isOpen: sale.isOpen,
        });
        const currentCost = await factory.getCost(sale.sold);
        setCost(currentCost);

        const storedImage = getTokenImage(address);
        if (storedImage) setImage(storedImage);
      } catch (err) {
        console.error("Token fetch error:", err);
        toast.error("Failed to load token data");
      } finally {
        setLoading(false);
      }
    }
    fetchToken();
  }, [factory, address]);

  async function handleBuy(amount) {
    if (token?.isDemo) {
      toast.error("Buying is disabled for demo tokens");
      return;
    }
    if (!signer || !factory) return;

    const toastId = toast.loading("Preparing transaction...");
    try {
      const currentCost = await factory.getCost(token.sold);
      const totalCost = currentCost * BigInt(amount);

      toast.loading("Confirm in your wallet...", { id: toastId });
      const tx = await factory.connect(signer).buy(
        address,
        ethers.parseUnits(String(amount), 18),
        { value: totalCost }
      );

      toast.loading("Transaction pending...", { id: toastId });
      await tx.wait();

      toast.success(`Successfully bought ${amount} tokens!`, { id: toastId });

      // Refresh token data
      const sale = await factory.tokenToSale(address);
      setToken({
        token: sale.token,
        name: sale.name,
        creator: sale.creator,
        sold: sale.sold,
        raised: sale.raised,
        isOpen: sale.isOpen,
      });
      const newCost = await factory.getCost(sale.sold);
      setCost(newCost);
    } catch (err) {
      const msg = err.reason || err.message || "Transaction failed";
      toast.error(msg, { id: toastId });
    }
  }

  if (loading) {
    return (
      <div className="text-center py-16 text-fp-text-dim">
        Loading token...
      </div>
    );
  }

  if (!token || token.token === ethers.ZeroAddress) {
    return (
      <div className="text-center py-16">
        <p className="text-fp-text-dim text-lg">Token not found</p>
        <Link href="/">
          <Button variant="secondary" className="mt-4">
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const soldNum = token.sold ? parseFloat(ethers.formatEther(token.sold)) : 0;
  const raisedNum = token.raised && typeof token.raised !== 'string' ? parseFloat(ethers.formatEther(token.raised)) : 0;

  return (
    <div>
      <Link
        href="/"
        className="text-fp-text-dim hover:text-fp-text text-sm mb-6 inline-block transition-colors"
      >
        &larr; Back to all tokens
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Token info + chart */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-start gap-4">
              {/* Token image */}
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-fp-bg flex-shrink-0">
                {image ? (
                  <img
                    src={image}
                    alt={token.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-display text-fp-accent/30">
                    {token.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold truncate">{token.name}</h1>
                  <Badge variant={token.isPortfolio ? "graduated" : (token.isOpen ? "live" : "graduated")}>
                    {token.isPortfolio ? "Portfolio" : (token.isOpen ? "Live" : "Graduated")}
                  </Badge>
                </div>
                {token.creator && (
                  <p className="text-fp-text-dim text-sm mt-1">
                    Created by{" "}
                    {explorerUrl ? (
                      <a
                        href={`${explorerUrl}/address/${token.creator}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fp-accent hover:underline"
                      >
                        {shortenAddress(token.creator)}
                      </a>
                    ) : (
                      <span className="text-fp-accent">
                        {shortenAddress(token.creator)}
                      </span>
                    )}
                  </p>
                )}
                <p className="text-fp-text-dim text-xs mt-1 font-mono truncate">
                  {explorerUrl && !token.isPortfolio ? (
                    <a
                      href={`${explorerUrl}/address/${address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-fp-accent transition-colors"
                    >
                      {address}
                    </a>
                  ) : (
                    address
                  )}
                </p>
              </div>
            </div>
            {token.isPortfolio && (
              <div className="mt-8 pt-8 border-t border-white/5">
                <h3 className="text-sm font-bold uppercase tracking-widest text-fp-accent mb-4">About Project</h3>
                <p className="text-fp-text-dim leading-relaxed whitespace-pre-wrap">
                  {token.description}
                </p>
              </div>
            )}
          </Card>

          {!token.isPortfolio && (
            <>
              <Card>
                <h2 className="font-semibold mb-4">Bonding Curve</h2>
                <BondingCurveChart currentSold={soldNum} />
              </Card>

              <Card>
                <h2 className="font-semibold mb-4">Graduation Progress</h2>
                <GraduationProgress sold={token.sold} raised={token.raised} />
              </Card>
            </>
          )}

          {token.isPortfolio && (
            <Card>
              <h2 className="font-semibold mb-4">Project Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-fp-text-dim uppercase tracking-wider mb-1">Status</p>
                  <p className="font-bold text-fp-accent">High Conviction</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-fp-text-dim uppercase tracking-wider mb-1">Tier</p>
                  <p className="font-bold text-white">Dealflow Alpha</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right column: Buy form + stats */}
        <div className="space-y-6">
          <Card>
            <h2 className="font-semibold mb-4">{token.isPortfolio ? "Invest" : "Buy Tokens"}</h2>
            {token.isPortfolio ? (
              <div className="space-y-6">
                <p className="text-fp-text-dim text-sm leading-relaxed">
                  This is a curated portfolio project. Contact Rauly directly to discuss investment opportunities and dealflow details.
                </p>
                <a 
                  href="https://cal.com/rauly-dealflow/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full py-6 text-lg">
                    Contact to Invest
                  </Button>
                </a>
                <div className="flex items-center justify-center gap-4 pt-4">
                  <div className="h-[1px] flex-grow bg-white/5"></div>
                  <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">Inquiries</span>
                  <div className="h-[1px] flex-grow bg-white/5"></div>
                </div>
              </div>
            ) : !account ? (
              <p className="text-fp-text-dim text-sm">
                Connect your wallet to buy tokens.
              </p>
            ) : !token.isOpen ? (
              <div className="text-center py-6">
                <p className="text-fp-success font-semibold text-lg">
                  Target reached!
                </p>
                <p className="text-fp-text-dim text-sm mt-2">
                  This token has graduated.
                </p>
              </div>
            ) : (
              <BuyTokenForm cost={cost} onBuy={handleBuy} />
            )}
          </Card>

          <Card>
            <h2 className="font-semibold mb-4">Project Stats</h2>
            <div className="space-y-3 text-sm">
              {token.isPortfolio ? (
                <>
                  <StatRow
                    label="Current Round"
                    value="Strategic"
                  />
                  <StatRow
                    label="Funds Raised"
                    value={token.raised || "N/A"}
                  />
                  <StatRow
                    label="Ticker"
                    value={token.ticker}
                  />
                  <StatRow
                    label="Portfolio Status"
                    value="Active"
                  />
                </>
              ) : (
                <>
                  <StatRow
                    label="Total Supply"
                    value={`${TOTAL_SUPPLY.toLocaleString()} tokens`}
                  />
                  <StatRow
                    label="Sold"
                    value={`${soldNum.toLocaleString()} / ${TOKEN_LIMIT.toLocaleString()}`}
                  />
                  <StatRow
                    label="ETH Raised"
                    value={`${formatEth(token.raised)} / ${TARGET_ETH} ETH`}
                  />
                  <StatRow
                    label="Current Price"
                    value={cost ? `${formatEth(cost)} ETH / token` : "--"}
                  />
                  <StatRow
                    label="Status"
                    value={token.isOpen ? "Active" : "Graduated"}
                  />
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-fp-text-dim">{label}</span>
      <span className="text-fp-text font-mono text-right">{value}</span>
    </div>
  );
}
