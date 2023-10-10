import React, { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import type { Metadata, Nft, Sft } from "@metaplex-foundation/js";
import { checkIfSolanaTokens, fetcher, getSolanaTokenAddresses } from "@/lib/utils";
import useSWR from "swr";
import { AbsoluteString } from "next/dist/lib/metadata/types/metadata-types";
import NFTPreview from "./NFTPreview";
import {SolanaToken} from "@/lib/utils";

interface SolanaWalletNFTsProps {
  walletAddress: string;
}

// convert this json into a type that typescript can understand
// {
//   "identifier": "2Benya9HDJpVtDCjxNdhJ977TowCwyeknsdjEDeVQfVq",
//   "collection": "foundingfrens",
//   "contract": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
//   "token_standard": "metaplex",
//   "name": "Founding Frens Lawyer #46",
//   "description": "The Founding Frens collection contains 1700 handcrafted NFTs of investors & lawyers in the OpenFren ecosystem. Want to know more? Checkout nft.openfren.com",
//   "image_url": "https://i.seadn.io/gae/NTVKH8YA-1W5RuJOzhNfoQf_II9gbgZ44WZes8bissgIijqo8ak4ofmzYMqs5wikFFEqDaF9NI4HZlnLC8IWpHp73elO1jfp99-x?w=500&auto=format",
//   "metadata_url": "https://arweave.net/ykKqGopFO1PtMuN9EWlyCg70dTmQqGzcXATPjJ5T7ek",
//   "created_at": "",
//   "updated_at": "2022-09-16T16:20:31.876993",
//   "is_disabled": false,
//   "is_nsfw": false
// },



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
    <div>
      {walletFoundingFrens.length > 0 && (
        <div>
          <h1>Founding Frens NFTs</h1>
          <ul>
            {walletFoundingFrens.map((nft, index) => (
              <div key={nft}>
              <h1>Found NFT</h1>
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
