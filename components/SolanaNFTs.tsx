'use client';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useNFTs, useProgram } from "@thirdweb-dev/react/solana";
import { use, useEffect } from "react";
import SolanaWalletNFTs from "./SolanaWalletNFTs";

const SolanaNFTs = () => {
    const wallet = useWallet();
    const walletPublicKey = wallet?.publicKey;
    const walletAddress = wallet?.publicKey?.toBase58();
    const { program } = useProgram(walletAddress,"nft-collection");
    const nfts = useNFTs(program);

    const {connection} = useConnection();

    const getNFTs = async () => {
        if(!walletPublicKey) return;
        const balances = await connection.getBalanceAndContext(walletPublicKey);
        console.log("balances", balances);
    }

    console.log('calling getNFTs')
    getNFTs();

    // useEffect(() => {
    //     getNFTs();
    // }
    // , []);


    console.log("nfts", nfts.data)

    return(
        <div>
            Solana NFTs
            {
                (walletAddress && <SolanaWalletNFTs userAddress={walletAddress} />)
            }
        </div>
    )
}

export default SolanaNFTs;