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
      <SolanaNFTs />
    </div>
  );
};

export default SolanaTokens;
