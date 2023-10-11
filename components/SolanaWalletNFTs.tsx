import React, { useEffect, useState } from "react";
import type { Metadata} from "@metaplex-foundation/js";
import { checkIfSolanaTokens, fetcher, getSolanaTokenAddresses } from "@/lib/utils";
import useSWR from "swr";
import NFTPreview from "./NFTPreview";
import {SolanaToken} from "@/lib/utils";

interface SolanaWalletNFTsProps {
  walletAddress: string;
}

const SolanaWalletNFTs: React.FC<SolanaWalletNFTsProps> = ({ walletAddress }) => {
  const [nfts, setNfts] = useState<(Metadata)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data, error } = useSWR("/api/getsolanatokens", fetcher);
  const foundingFrensData: SolanaToken[] = data;

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

    if (foundingFrensData) {
      // filter and get the tokens addresses from the data
      const tokens = getSolanaTokenAddresses(foundingFrensData);
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
  let walletFoundingFrens: any[] = [];
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
    walletFoundingFrens = checkIfSolanaTokens(userNftsAsStrings, foundingFrensTokens)

  }




  if (loading) return <div>Loading...</div>;

  return (
    <div>
    <div>
      {nfts.length === 0 ? (
        <p>No NFTs found in wallet.</p>
      ) : (
       <p>Found {nfts.length} NFTs in wallet.</p>
      )}
    </div>
    <div>
      {walletFoundingFrens.length > 0 && (
        <div>
          <h1>You have {walletFoundingFrens.length} founding frens</h1>
          <ul>
            {walletFoundingFrens.map((nft, index) => (
              <div key={nft}>
              <NFTPreview imageUrl={"https://i.seadn.io/gae/NTVKH8YA-1W5RuJOzhNfoQf_II9gbgZ44WZes8bissgIijqo8ak4ofmzYMqs5wikFFEqDaF9NI4HZlnLC8IWpHp73elO1jfp99-x?w=500&auto=format"} tokenAddress={nft} />
              </div>
            ))}
          </ul>
          </div>
      ) 
      }
      </div>
    </div>
  );
};

export default SolanaWalletNFTs;
