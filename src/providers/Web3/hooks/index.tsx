import React, { useContext, useEffect } from "react";

// WEB3
import type Web3Modal from "web3modal";

// PROPS
import Web3Context, { Web3ProviderProps } from "../context";

/**
 * It starts a new web3modal provider and sets it to the state of the web3modal
 * @param {Web3Modal | null} web3Modal - This is the web3modal object that we created in the previous
 * @param connectWallet - A function that is used to connect to a wallet.
 */
const useAutoConnect = (
  web3Modal: Web3Modal | null,
  connectWallet: () => Promise<void>
) => {
  useEffect(() => {
    // CONNECT AUTO
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [web3Modal]);
};

/**
 * Creating a new web3modal object and setting it to the state of the web3modal
 * @param {React.Dispatch<React.SetStateAction<Web3Modal | null>>} setWeb3Modal
 */
export const useWalletProvider = (
  setWeb3Modal: React.Dispatch<React.SetStateAction<Web3Modal | null>>
) => {
  useEffect(() => {
    import("@walletconnect/web3-provider").then((wc) => {
      import("@coinbase/wallet-sdk").then((cc) => {
        import("web3modal").then((w3m) => {
          const WalletConnectProvider = wc.default;
          const CoinbaseWalletSDK = cc.default;
          const Web3Modal = w3m.default;

          // PROVIDER
          const providerOptions = {
            coinbasewallet: {
              package: CoinbaseWalletSDK,
              options: {
                appName: "MoonBirds",
                infuraId: "INFURA_ID",
                rpc: "",
              },
            },
            walletconnect: {
              package: WalletConnectProvider,
              options: {
                infuraId: "",
              },
            },
          };

          // NEW MODAL
          const newWeb3Modal = new Web3Modal({
            cacheProvider: true,
            network: "mainnet",
            providerOptions,
          });

          // UPDATE MODAL
          setWeb3Modal(newWeb3Modal);
        });
      });
    });
  }, []);
};

/**
 * React hook that returns the web3Context object from the Web3Context React context.
 * @returns {Web3ProviderProps} The web3Context object.
 */
export const useWeb3Modal = (): Web3ProviderProps => {
  const web3Context = useContext(Web3Context);
  return web3Context;
};

export default useAutoConnect;
