import React from "react";

// WEB3
import type Web3Modal from "web3modal";

/**
 * It adds event listeners to the web3ModalProvider object
 * @param {any} web3ModalProvider - The provider object returned by the web3Modal library.
 */
const addListeners = (web3ModalProvider: any) => {
  web3ModalProvider.on("accountsChanged", () => {
    window.location.reload();
  });

  web3ModalProvider.on("chainChanged", () => {
    window.location.reload();
  });
};

/**
 * It connects to a wallet provider, adds listeners to the provider,
 * creates an ethers provider, and then gets the user's address
 * @param {Web3Modal | null} web3Modal - This is the web3Modal object that we created in the previous
 * @param {React.Dispatch<React.SetStateAction<string>>} setAddress
 */
const connectWallet = async (
  web3Modal: Web3Modal | null,
  setAddress: React.Dispatch<React.SetStateAction<string>>
) => {
  if (web3Modal) {
    import("ethers").then(async (eth) => {
      const { providers } = eth;
      const provider = await web3Modal.connect();
      addListeners(provider);
      const ethersProvider = new providers.Web3Provider(provider);
      const userAddress = await ethersProvider.getSigner().getAddress();
      setAddress(userAddress);
    });
  }
};

/**
 * It clears the cached provider and sets the address to an empty string
 * @param {Web3Modal | null} web3Modal - Web3Modal | null
 * @param {React.Dispatch<React.SetStateAction<string>>} setAddress - This is the function that sets the address in the state.
 */
export const disconnectWallet = async (
  web3Modal: Web3Modal | null,
  setAddress: React.Dispatch<React.SetStateAction<string>>
) => {
  if (web3Modal) {
    web3Modal.clearCachedProvider();
    setAddress("");
  }
};

export default connectWallet;
