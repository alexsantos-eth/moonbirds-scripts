import React, { useEffect, useState } from "react";
import { useWeb3Modal } from "../../providers/Web3/hooks";

const Assets: React.FC = () => {
  // CONTEXT
  const { address } = useWeb3Modal();

  // ASSETS
  const [assets, setAssets] = useState<any[] | null>(null);

  // NFT
  const [selectedNft, setSelectedNft] = useState<string>("");

  // SELECT
  const selectNft = (nftAddress: string) => () => setSelectedNft(nftAddress);

  const path = window.location.pathname;
  const host = window.location.origin;

  // GET ASSESTS
  const fetchAssets = () => {
    if (address.length) {
      setAssets(null);
      fetch(`${import.meta.env.VITE_API_ENDPOINT}/assets?address=${address}`)
        .then((res) => res.json())
        .then((data) => setAssets(data.ownedNfts));
    }
  };

  // PRINT
  const printAsset = () => {
    if (address.length && selectedNft.length) {
      fetch(`${import.meta.env.VITE_API_ENDPOINT}/print/validateAndPay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          nftAddress: selectedNft,
          successURL: `${host}/connect-wallet/#success`,
          cancelURL: `${host}/connect-wallet/#canceled`,
        }),
      })
        .then((data) => data.json())
        .then((json) => {
          if (json.ok) window.location.replace(json.url);
        });
    }
  };

  useEffect(() => {
    if (path.startsWith("/connect-wallet")) {
      if (address.length) {
        fetchAssets();
      }
    }
  }, [address, path]);

  return (
    <div>
      <h4>Select NFT, then click on the button Proceed to Checkout</h4>
      <div
        style={{
          gap: "20px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr) )",
        }}
      >
        {assets ? (
          assets.map((nft: any) => (
            <button
              key={nft.id.tokenId}
              style={{
                appearance: "none",
                height: "250px",
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                transition: "background 0.2s ease-in",
                background: selectedNft === nft.id.tokenId ? "white" : "#000",
              }}
              onClick={selectNft(nft.id.tokenId)}
            >
              <img
                width="100%"
                height="100%"
                style={{ objectFit: "cover" }}
                src={nft.media?.[0]?.gateway ?? ""}
                alt={nft.id.tokenId}
              />
            </button>
          ))
        ) : (
          <h5>Loading collection...</h5>
        )}

        {assets?.length === 0 && (
          <h5>
            You currently do not have any NFTs from our collection to print.
          </h5>
        )}
      </div>
      <button style={{ width: 300 }} onClick={printAsset}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Assets;
