'use client';

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SolanaTokens = () => {
    const { data, error } = useSWR("/api/getsolanatokens", fetcher);

    //Handle the error state
    if (error) return <div>Failed to load</div>;
    //Handle the loading state
    if (!data) return <div>Loading...</div>;
  
    console.log(data)

    return (
        <div>Solana Tokens</div>
    )
}

export default SolanaTokens;