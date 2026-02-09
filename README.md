# fun.pump

A token launchpad on Base. Create tokens, buy on a bonding curve, and graduate at 3 ETH.

## Technology Stack

- **Smart Contracts**: Solidity 0.8.27 + OpenZeppelin
- **Framework**: Hardhat
- **Frontend**: Next.js 15 + React 18 + Tailwind CSS
- **Blockchain**: Ethers.js v6
- **Notifications**: react-hot-toast
- **Images**: IPFS via Pinata

## Requirements

- [Node.js](https://nodejs.org/) LTS (recommended via [NVM](https://github.com/nvm-sh/nvm))
- MetaMask browser extension

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Tests

```bash
npx hardhat test
```

### 3. Start Local Blockchain

```bash
npx hardhat node
```

### 4. Deploy Contracts (separate terminal)

```bash
npx hardhat ignition deploy ignition/modules/Factory.js --network localhost
```

To redeploy, append `--reset`:

```bash
npx hardhat ignition deploy ignition/modules/Factory.js --network localhost --reset
```

### 5. Start Frontend

```bash
npm run dev
```

Open http://localhost:3000. Connect MetaMask to `localhost:8545` (chain ID 31337).

## Deploying to Base

### 1. Configure Environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `PRIVATE_KEY` — deployer wallet private key
- `BASESCAN_API_KEY` — for contract verification (get from basescan.org)

Optional:
- `NEXT_PUBLIC_PINATA_JWT` — for image uploads to IPFS
- `NEXT_PUBLIC_PINATA_GATEWAY` — your Pinata gateway domain

### 2. Deploy to Base Sepolia (testnet)

Get testnet ETH from the [Base Sepolia faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet).

```bash
npx hardhat ignition deploy ignition/modules/Factory.js --network baseSepolia
```

### 3. Update Config

Copy the deployed Factory address into `app/config.json` under the `"84532"` entry.

### 4. Verify Contract (optional)

```bash
npx hardhat verify --network baseSepolia <FACTORY_ADDRESS> 10000000000000000
```

### 5. Deploy to Base Mainnet

```bash
npx hardhat ignition deploy ignition/modules/Factory.js --network base
```

Update `app/config.json` under `"8453"` with the mainnet Factory address.

## Project Structure

```
contracts/
  Factory.sol          — Main launchpad contract (create, buy, deposit, withdraw)
  Token.sol            — ERC-20 token template
test/
  Factory.js           — Test suite (13 tests)
ignition/
  modules/Factory.js   — Deployment script
app/
  page.js              — Home page (hero + token grid)
  create/page.js       — Create token page
  token/[address]/     — Token detail + buy page
  context/             — Web3 context provider
  hooks/               — useTokens hook
  lib/                 — Utils, constants, Pinata helper
  components/
    ui/                — Button, Card, ProgressBar, Skeleton, etc.
    layout/            — Header
    token/             — TokenCard, TokenGrid, BondingCurveChart
    forms/             — BuyTokenForm
```
