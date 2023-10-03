"use client";

import { fetcher, getSolanaTokenAddresses } from "@/lib/utils";
import { useEffect, useState } from "react";
import useSWR from "swr";

const SolanaTokens = () => {
  const { data, error } = useSWR("/api/getsolanatokens", fetcher);

  const [solanaTokens, setSolanaTokens] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      // filter and get the tokens addresses from the data
      const tokens = getSolanaTokenAddresses(data);
      // get unique token addresses from solanaTokens
      const uniqueTokens = tokens.filter((token, index) => {
        return solanaTokens.indexOf(token) === index;
      });
      setSolanaTokens(uniqueTokens);
    }
  }, [data, solanaTokens]);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      Solana Tokens
      <div>{`Total number of tokens - ${solanaTokens.length}`}</div>
    </div>
  );
};

export default SolanaTokens;
