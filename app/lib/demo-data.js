import { ethers } from "ethers";
import { projects } from "./dealflow-data";

// Realistic dummy data for tokens
export const DEMO_TOKENS = [
  {
    index: 9991,
    token: "0x1111111111111111111111111111111111111111",
    name: "Pepe Base",
    creator: "0x1234567890123456789012345678901234567890",
    sold: ethers.parseEther("100000"), // 100k tokens
    raised: ethers.parseEther("2.5"), // 2.5 ETH
    isOpen: true,
    image: "https://i.ibb.co/vzR0yFh/pepe.png", // Example image placeholder
    isDemo: true
  },
  {
    index: 9992,
    token: "0x2222222222222222222222222222222222222222",
    name: "Base Rocket",
    creator: "0x0987654321098765432109876543210987654321",
    sold: ethers.parseEther("400000"), // 400k tokens
    raised: ethers.parseEther("1.2"), // 1.2 ETH
    isOpen: true,
    image: null,
    isDemo: true
  },
  {
    index: 9993,
    token: "0x3333333333333333333333333333333333333333",
    name: "Golden Doge",
    creator: "0x5555555555555555555555555555555555555555",
    sold: ethers.parseEther("500000"), // 500k tokens
    raised: ethers.parseEther("3.0"), // 3.0 ETH
    isOpen: false, // Graduated
    image: null,
    isDemo: true
  },
  {
    index: 9994,
    token: "0x4444444444444444444444444444444444444444",
    name: "Moon Bird",
    creator: "0x7777777777777777777777777777777777777777",
    sold: ethers.parseEther("50000"), // 50k tokens
    raised: ethers.parseEther("0.8"), // 0.8 ETH
    isOpen: true,
    image: null,
    isDemo: true
  },
  {
    index: 9995,
    token: "0x5555555555555555555555555555555555555555",
    name: "Cyber Punk",
    creator: "0x9999999999999999999999999999999999999999",
    sold: ethers.parseEther("250000"), // 250k tokens
    raised: ethers.parseEther("1.7"), // 1.7 ETH
    isOpen: true,
    image: null,
    isDemo: true
  },
  {
    index: 9996,
    token: "0x6666666666666666666666666666666666666666",
    name: "Ether Whale",
    creator: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    sold: ethers.parseEther("450000"), // 450k tokens
    raised: ethers.parseEther("2.8"), // 2.8 ETH
    isOpen: true,
    image: null,
    isDemo: true
  },
  {
    index: 9997,
    token: "0x7777777777777777777777777777777777777777",
    name: "Base Chad",
    creator: "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    sold: ethers.parseEther("120000"), // 120k tokens
    raised: ethers.parseEther("0.4"), // 0.4 ETH
    isOpen: true,
    image: null,
    isDemo: true
  },
  {
    index: 9998,
    token: "0x8888888888888888888888888888888888888888",
    name: "DeFi King",
    creator: "0xcccccccccccccccccccccccccccccccccccccccc",
    sold: ethers.parseEther("300000"), // 300k tokens
    raised: ethers.parseEther("2.1"), // 2.1 ETH
    isOpen: true,
    image: null,
    isDemo: true
  },
  // Add projects from dealflow-data
  ...projects.map((p, i) => ({
    index: 10000 + i,
    token: p.address,
    name: p.name,
    creator: "0x1111111111111111111111111111111111111111", // Default creator
    sold: ethers.parseEther("600000"), // Mock sold amount
    raised: ethers.parseEther(p.raised.replace(/[^0-9.]/g, '') || "1.0"), // Convert raised string to ETH if possible, else default 1.0
    isOpen: true, // Most seem to be active
    image: p.image || null,
    isDemo: true
  }))
];
