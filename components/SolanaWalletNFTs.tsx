import React, { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import type { Metadata, Nft, Sft } from "@metaplex-foundation/js";
import { checkIfSolanaTokens, fetcher, getSolanaTokenAddresses } from "@/lib/utils";
import useSWR from "swr";
import { AbsoluteString } from "next/dist/lib/metadata/types/metadata-types";

interface SolanaWalletNFTsProps {
  walletAddress: string;
}

const SolanaWalletNFTs: React.FC<SolanaWalletNFTsProps> = ({ walletAddress }) => {
  const [nfts, setNfts] = useState<(Metadata)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data, error } = useSWR("/api/getsolanatokens", fetcher);

  const [foundingFrensTokens, setFoundingFrensTokens] = useState<(string)[]>([]);

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

    if (data) {
      // filter and get the tokens addresses from the data
      const tokens = getSolanaTokenAddresses(data);
      // get unique token addresses from solanaTokens
      // get unique token addresses from tokens
      const uniqueTokens = tokens.filter((token, index, self) => {
        return self.indexOf(token) === index;
      });
      setFoundingFrensTokens(() => {
        return uniqueTokens;
      });
    }

  }, [walletAddress]);



  // If the user has nfts, then check if the NFTs belongs to founding frens collection
  // If it does, then display the nft
  // If it doesn't, then display a message saying that the user doesn't have any nfts from the collection
  // If the user doesn't have any nfts, then display a message saying that the user doesn't have any nfts
  if(nfts.length > 0 && foundingFrensTokens.length > 0) {
    // Check if the nfts belong to the founding frens collection
    const userNftsAsStrings = nfts.map((nft) => {
      //  return the mint address as a string
      const mintAddress = nft.mintAddress.toString();
      return mintAddress
    }
  )

    console.log("userNftsAsStrings", userNftsAsStrings.length)
    userNftsAsStrings.push('2Benya9HDJpVtDCjxNdhJ977TowCwyeknsdjEDeVQfVq')
    console.log("userNftsAsStrings", userNftsAsStrings.length)
    const walletFoundingFrens = checkIfSolanaTokens(userNftsAsStrings, foundingFrensTokens)
    console.log("walletFoundingFrens", walletFoundingFrens)
  }



  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Your NFTs</h1>
      {nfts.length === 0 ? (
        <p>No NFTs found in wallet.</p>
      ) : (
        <ul>
          {nfts.map((nft, index) => (
            <li key={index}>{`Mint: ${nft.mintAddress}, Amount: ${nft.name}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SolanaWalletNFTs;
