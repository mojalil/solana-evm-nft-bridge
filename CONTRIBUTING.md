# Contributions FAQ

## Table Of Content
- [Contributions FAQ](#contributions-faq)
  - [Table Of Content](#table-of-content)
  - [Todos](#todos)
  - [Wallet Considerations](#wallet-considerations)
  - [Tech Stack](#tech-stack)
  - [Mechanism](#mechanism)
  - [Resources](#resources)

## Todos
- Complete Sidebar ✅
- Add Sign In ✅
- Add MobileSidebar ✅ 
- Create dashboard 
  - History component
  - Create burn page
  - Create mint page
- UI improvements 
  - Add skeletons for loading elements


## Wallet Considerations
- Plain javascript, check for ethereum object
- https://viem.sh/
- https://wagmi.sh/
- https://thirdweb.com/
- https://moralis.io/
- https://github.com/ethers-io/ethers.js
- https://github.com/web3/web3.js

## Tech Stack
We've decided on 

1. NextJs
2. Shadcn - Tailwind
3. Thirdweb - Blockchain integrations, wallet connect, smart contract deployment

Smart Contracts (See backend Repo)
1. Foundry
2. Thirdweb

## Mechanism
The way that we will bridge assets.

Burn:
1. Check users wallet for elibible tokens
2. If eligible, allow users to burn nfts (send them to burn address)
3. Add list of NFTs user is allowed to mint on new chain. 
4. Ask user to input Eth wallet address to mint new NFTs

Mint:
1. User connects eth account
2. Show user interface to mint new NFTs on chain

## Resources

[Migrating from solana to BSC](https://docs.bnbchain.org/docs/migration/non-evm-chains/solana/token-migration)
