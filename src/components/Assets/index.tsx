import React, { useEffect, useState } from "react";
import { useWeb3Modal } from "../../providers/Web3/hooks";

const Assets: React.FC = () => {
  // CONTEXT
  const { address } = useWeb3Modal();

  // NFT
  const [selectedNft, setSelectedNft] = useState<string>("");

  // SELECT
  const selectNft = (nftAddress: string) => () => setSelectedNft(nftAddress);

  // PRINT
  const printAsset = () => {
    if (address.length && selectedNft.length) {
      fetch(`http://localhost:4000/v1/print/validateAndPay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          nftAddress: selectedNft,
          successURL: "http://localhost:3000/payment/success",
          cancelURL: "http://localhost:3000/payment/canceled",
        }),
      })
        .then((data) => data.json())
        .then((json) => {
          if (json.ok) window.location.replace(json.url);
        });
    }
  };

  const path = window.location.pathname;
  useEffect(() => {
    if (path.startsWith("/shop")) {
      const container = document.querySelector(
        "div.section_wrapper.clearfix.default-woo-list"
      );

      if (container) {
        const loadingText = document.createElement("p");
        container.innerHTML = "";
        container.appendChild(loadingText);

        if (!address.length) {
          loadingText.textContent = "You must connect your wallet first";
          return;
        } else {
          loadingText.textContent = "Loading ...";
          fetch(`http://localhost:4000/v1/assets?address=${address}`)
            .then((res) => res.json())
            .then((data) => {
              const grid = document.createElement("div");
              container.innerHTML = "";
              container.appendChild(grid);
              grid.style.cssText =
                "display:grid;grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));column-gap:20px;row-gap:20px";
              const nfts = data.ownedNfts;

              // ADD
              nfts.map((nft: any) => {
                const button = document.createElement("button");
                const image = document.createElement("img");

                button.style.cssText = `appearance: "none";height: "400px";padding: "20px";marginLeft: "20px";background: ${
                  selectedNft === nft.id.tokenId ? "#777" : "white"
                }`;

                image.src = nft.media?.[0]?.gateway ?? "";
                image.style.height = "200px";
                image.style.objectFit = "cover";
                image.alt = nft.id.tokenId;
                button.appendChild(image);
                grid.appendChild(button);
              });
            });
        }
      }
    }
  }, [address, path]);

  return (
    <div>
      <button style={{ width: 300 }} onClick={printAsset}>
        Pay and Print
      </button>
    </div>
  );
};

export default Assets;
