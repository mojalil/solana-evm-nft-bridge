'use client';
import { useWallet } from "@solana/wallet-adapter-react";
import { useNFTs, useProgram } from "@thirdweb-dev/react/solana";

const SolanaNFTs = () => {
    const wallet = useWallet();
    const walletAddress = wallet?.publicKey?.toBase58();
    const { program } = useProgram("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA","nft-collection");
    const nfts = useNFTs(program);

    // console.log("nfts", nfts)

    return(
        <div>
            Solana NFTs
        </div>
    )
}

export default SolanaNFTs;