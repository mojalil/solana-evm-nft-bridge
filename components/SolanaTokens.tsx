"use client";

import { fetcher, getSolanaTokenAddresses } from "@/lib/utils";
import { Wallet } from "ethers";
import { useEffect, useState } from "react";
import useSWR from "swr";
import WalletMultiButtonDynamic from "@/components/WalletMultiButtonDynamic";
import WalletDisconnectButtonDynamic from "./WalletDisconnectButtonDynamic";
import SolanaNFTs from "./SolanaNFTs";

const SolanaTokens = () => {
  const { data, error } = useSWR("/api/getsolanatokens", fetcher);

  const [solanaTokens, setSolanaTokens] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      // filter and get the tokens addresses from the data
      const tokens = getSolanaTokenAddresses(data);
      // get unique token addresses from solanaTokens
      // get unique token addresses from tokens
      const uniqueTokens = tokens.filter((token, index, self) => {
        return self.indexOf(token) === index;
      });
      setSolanaTokens((prevTokens) => {
        return uniqueTokens;
      });
    }
  }, [data]);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  const buttonStyles = {
    marginTop: "1.5rem",
    display: "flex",
    gap: "2rem",
  };
  return (
    <div>
      Solana Tokens
      <div>{`Total number of tokens - ${solanaTokens.length}`}</div>
      <div style={buttonStyles}></div>
      <WalletMultiButtonDynamic />
      <WalletDisconnectButtonDynamic />
      <SolanaNFTs />
    </div>
  );
};

export default SolanaTokens;
