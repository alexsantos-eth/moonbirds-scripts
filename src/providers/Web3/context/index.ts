import { createContext } from "react";

export interface Web3ProviderProps {
  address: string;
  connectWallet?: () => Promise<void>;
  disconnectWallet?: () => Promise<void>;
}

const defaultContext: Web3ProviderProps = {
  address: "",
  connectWallet: undefined,
  disconnectWallet: undefined,
};

const Web3Context = createContext(defaultContext);
export default Web3Context;
