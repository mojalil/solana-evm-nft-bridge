"use client";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import {
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";

type ThirdwebProviderProps = {
  children: React.ReactNode;
};

const ThirdwebProviderWrapper = ({ children }: ThirdwebProviderProps) => {
  return (
    <ThirdwebProvider
      activeChain="localhost"
      supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect()]}
    >
      {children}
    </ThirdwebProvider>
  );
};

export default ThirdwebProviderWrapper;
