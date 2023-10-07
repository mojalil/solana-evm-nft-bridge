import React, { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import type { Metadata, Nft, Sft } from "@metaplex-foundation/js";

interface SolanaWalletNFTsProps {
  userAddress: string;
}

// Load environment variables from .env

const QUICKNODE_URI_SOLANA_MAINNET = process.env.QUICKNODE_URI_SOLANA_MAINNET || "";


const SolanaWalletNFTs: React.FC<SolanaWalletNFTsProps> = ({ userAddress }) => {
  const [nfts, setNfts] = useState<(Metadata | Nft | Sft)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const connection = new Connection(
            QUICKNODE_URI_SOLANA_MAINNET,
            
        );
        const publicKey = new PublicKey(userAddress);

        const metaplex = new Metaplex(connection);

        const nftData = await metaplex
          .nfts()
          .findAllByOwner({ owner: publicKey });

        nftData.forEach((nft) => {
          console.log('nft data from metaplex',nft);
        });

        setNfts(nftData);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [userAddress]);

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
