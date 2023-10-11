"use client";
import SolanaTokens from "@/components/SolanaTokens";
import SolanaWalletNFTs from "@/components/SolanaWalletNFTs";
import WalletDisconnectButtonDynamic from "@/components/WalletDisconnectButtonDynamic";
import WalletMultiButtonDynamic from "@/components/WalletMultiButtonDynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { ThirdwebSDKProvider } from "@thirdweb-dev/react/solana";
import { useProgram } from "@thirdweb-dev/react/solana";

const SolanaPage = () => {
  const wallet = useWallet();
  const walletAddress = wallet?.publicKey?.toBase58();
  const buttonStyles = {
    marginTop: "",
    display: "flex",
    gap: "2rem",
  };

  return (
    <ThirdwebSDKProvider network={"mainnet-beta"} wallet={wallet}>
      <div className="h-full p-4 space-y-2">
        Dashboard {wallet && walletAddress}
        <div>
          <div style={buttonStyles}>
            <WalletMultiButtonDynamic />
          </div>
          <SolanaTokens />
          {walletAddress && <SolanaWalletNFTs walletAddress={walletAddress} />}
        </div>
      </div>
    </ThirdwebSDKProvider>
  );
};

export default SolanaPage;
