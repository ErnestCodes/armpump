import { ethers } from "ethers";

export function shortenAddress(address) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatEth(wei, decimals = 4) {
  if (!wei) return "0";
  return parseFloat(ethers.formatEther(wei)).toFixed(decimals);
}

export function calcProgress(sold, raised) {
  const TOKEN_LIMIT = ethers.parseUnits("500000", 18);
  const TARGET = ethers.parseUnits("3", 18);
  const soldPct = (Number(sold) / Number(TOKEN_LIMIT)) * 100;
  const raisedPct = (Number(raised) / Number(TARGET)) * 100;
  return Math.min(Math.max(soldPct, raisedPct), 100);
}

export function getBondingPrice(sold) {
  const floor = 0.0001;
  const step = 0.0001;
  const increment = 10000;
  const soldNum = parseFloat(ethers.formatEther(sold));
  return floor + step * Math.floor(soldNum / increment);
}

export function generateBondingCurveData() {
  const points = [];
  const totalSteps = 50;
  for (let i = 0; i <= totalSteps; i++) {
    const sold = i * 10000;
    const price = 0.0001 + 0.0001 * i;
    points.push({ sold, price });
  }
  return points;
}
