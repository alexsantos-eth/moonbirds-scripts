import { useEffect } from "react";
import { useWeb3Modal } from "../../providers/Web3/hooks";

/**
 * "When the user clicks the button, if they have a wallet connected,
 * disconnect it, otherwise connect it."
 * The first thing we do is get the `address` and
 * `connectWallet` and `disconnectWallet` functions from the `useWeb3Modal` hook
 */
const useConnectWalletBtn = () => {
  // CONTEXT
  const { address, connectWallet, disconnectWallet } = useWeb3Modal();
  const path = window.location.pathname;

  useEffect(() => {
    // FIND BUTTON
    const button = document.querySelector(
      "a.action_button[href='https://abscissalabs.xyz/connect-wallet/']"
    );

    const event = (e: MouseEvent) => {
      e.preventDefault();
      if (!address.length) {
        if (connectWallet) connectWallet();
      } else {
        if (disconnectWallet) disconnectWallet();
      }
      return false;
    };

    if (path.startsWith("/connect-wallet")) {
      // SET BUTTON EVENTS AND TEXT
      if (button) {
        (button as HTMLAnchorElement).href =
          "https://abscissalabs.xyz/connect-wallet/#open";

        (button as HTMLAnchorElement).addEventListener("click", event);
        button!.textContent = address.length
          ? `${address.substring(0, 5)} ... ${address.substring(5, 10)}`
          : "CONNECT WALLET";
      }
    }

    // REMOVE LISTENERS
    return () => {
      if (button)
        (button as HTMLAnchorElement).removeEventListener("click", event);
    };
  }, [connectWallet, disconnectWallet, address, path]);
};

export default useConnectWalletBtn;
