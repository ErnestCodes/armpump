"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import FactoryABI from "../abis/Factory.json";
import config from "../config.json";

const Web3Context = createContext(null);

const SUPPORTED_CHAINS = {
  31337: "Hardhat",
  84532: "Base Sepolia",
  8453: "Base",
};

export function Web3Provider({ children }) {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [factory, setFactory] = useState(null);
  const [fee, setFee] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const isSupported = chainId && !!SUPPORTED_CHAINS[chainId];
  const networkName = chainId ? (SUPPORTED_CHAINS[chainId] || "Unsupported") : null;
  const explorerUrl = chainId && config[chainId] ? config[chainId].explorer : "";

  const connect = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      setError("Please install MetaMask");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await browserProvider.send("eth_requestAccounts", []);
      const walletSigner = await browserProvider.getSigner();
      const network = await browserProvider.getNetwork();
      const id = Number(network.chainId);

      setProvider(browserProvider);
      setSigner(walletSigner);
      setAccount(ethers.getAddress(accounts[0]));
      setChainId(id);

      if (config[id] && config[id].factory.address) {
        const factoryContract = new ethers.Contract(
          config[id].factory.address,
          FactoryABI,
          browserProvider
        );
        setFactory(factoryContract);

        const contractFee = await factoryContract.fee();
        setFee(contractFee);
      } else {
        setFactory(null);
        setFee(null);
      }

      const bal = await browserProvider.getBalance(accounts[0]);
      setBalance(bal);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setAccount(null);
        setSigner(null);
        setFactory(null);
      } else {
        connect();
      }
    };

    const handleChainChanged = () => {
      connect();
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, [connect]);

  const value = {
    provider,
    signer,
    account,
    chainId,
    factory,
    fee,
    balance,
    isConnecting,
    error,
    isSupported,
    networkName,
    explorerUrl,
    connect,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export function useWeb3() {
  const ctx = useContext(Web3Context);
  if (!ctx) throw new Error("useWeb3 must be used within Web3Provider");
  return ctx;
}
