'use client';
import { useWallet } from "@solana/wallet-adapter-react";
import SolanaWalletNFTs from "./SolanaWalletNFTs";

const SolanaNFTs = () => {
    const wallet = useWallet();
    const walletPublicKey = wallet?.publicKey;
    const walletAddress = wallet?.publicKey?.toBase58();


    return(
        <div>
            Solana NFTs
            {/* {
                (walletAddress && <SolanaWalletNFTs walletAddress={walletAddress} />)
            } */}
        </div>
    )
}

export default SolanaNFTs;