import { useState } from "react";

// WEB3
import type Web3Modal from "web3modal";

// CONTEXT
import useAutoConnect, { useWalletProvider } from "./hooks";
import connectWallet, { disconnectWallet } from "./events";
import Web3Context from "./context";

const Web3Provider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  // WEB3
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);

  // LOCAL ADRESS
  const [address, setAddress] = useState<string>("");

  // OPEN MODAL
  const connectWalletEvent = () => connectWallet(web3Modal, setAddress);

  // CLEAR AND LOGOUT
  const disconnectWalletEvent = () => disconnectWallet(web3Modal, setAddress);

  // AUTO CONNECT HOOK
  useAutoConnect(web3Modal, connectWalletEvent);

  // START MODAL
  useWalletProvider(setWeb3Modal);

  return (
    <Web3Context.Provider
      value={{
        address,
        connectWallet: connectWalletEvent,
        disconnectWallet: disconnectWalletEvent,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
