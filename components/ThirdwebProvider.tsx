"use client";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import {
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  phantomWallet,
} from "@thirdweb-dev/react";

type ThirdwebProviderProps = {
  children: React.ReactNode;
};

const ThirdwebProviderWrapper = ({ children }: ThirdwebProviderProps) => {
  return (
    <ThirdwebProvider
      activeChain="localhost"
      supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect(), phantomWallet()]}
    >
      {children}
    </ThirdwebProvider>
  );
};

export default ThirdwebProviderWrapper;
