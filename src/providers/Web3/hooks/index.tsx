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
      import("web3modal").then((w3m) => {
        import("walletlink").then((wlink) => {
          const WalletConnectProvider = wc.default;
          const Web3Modal = w3m.default;
          const WalletLink = wlink.default;
          const isDev = import.meta.env.VITE_DEV === "true";
          const prodKeys = import.meta.env.VITE_API_KEY_PROD;
          const devKeys = import.meta.env.VITE_API_KEY_DEV;
          const alchemyKey = isDev ? devKeys : prodKeys;

          // PROVIDER
          const providerOptions = {
            "custom-walletlink": {
              display: {
                logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
                name: "Coinbase",
                description: "Connect to Coinbase Wallet (not Coinbase App)",
              },
              options: {
                appName: "Moonbirds",
                networkUrl: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyKey}`,
                chainId: 1,
              },
              package: WalletLink,
              connector: async (_: any, options: any) => {
                const { appName, networkUrl, chainId } = options;
                const walletLink = new WalletLink({ appName });
                const provider = walletLink.makeWeb3Provider(
                  networkUrl,
                  chainId
                );
                await provider.enable();
                return provider;
              },
            },
            walletconnect: {
              package: WalletConnectProvider,
              options: {
                rpc: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyKey}`,
              },
            },
          };

          // NEW MODAL
          const newWeb3Modal = new Web3Modal({
            disableInjectedProvider: false,
            cacheProvider: true,
            network: "mainnet",
            providerOptions,
            theme: "dark",
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
