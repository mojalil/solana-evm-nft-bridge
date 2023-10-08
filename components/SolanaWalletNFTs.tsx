import React, { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import type { Metadata, Nft, Sft } from "@metaplex-foundation/js";

interface SolanaWalletNFTsProps {
  walletAddress: string;
}

const SolanaWalletNFTs: React.FC<SolanaWalletNFTsProps> = ({ walletAddress }) => {
  const [nfts, setNfts] = useState<(Metadata | Nft | Sft)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNFTs = async () => {
        // get nfts from api endpoint, that takes query params of userAddress
        const res = await fetch(`/api/getwalletnfts?walletAddress=${walletAddress}`);
        const data = await res.json();
        console.log("data", data);
        setNfts(data);
        setLoading(false);
      
    };

    fetchNFTs();
  }, [walletAddress]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Your NFTs</h1>
      {nfts.length === 0 ? (
        <p>No NFTs found in wallet.</p>
      ) : (
        <ul>
          {nfts.map((nft, index) => (
            <li key={index}>{`Mint: ${nft.address}, Amount: ${nft.name}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SolanaWalletNFTs;
