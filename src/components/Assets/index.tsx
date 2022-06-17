import React, { useState } from "react";
import { useWeb3Modal } from "../../providers/Web3/hooks";

const Assets: React.FC = () => {
  // CONTEXT
  const { address } = useWeb3Modal();

  // ASSETS
  const [assets, setAssets] = useState<any[] | null>([]);

  // NFT
  const [selectedNft, setSelectedNft] = useState<string>("");

  // GET ASSESTS
  const fetchAssets = () => {
    if (address.length) {
      setAssets(null);
      fetch(`http://localhost:4000/v1/assets?address=${address}`)
        .then((res) => res.json())
        .then((data) => setAssets(data.ownedNfts));
    }
  };

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

  return (
    <div>
      <button style={{ width: 300 }} onClick={fetchAssets}>
        Get assets
      </button>
      <button style={{ width: 300 }} onClick={printAsset}>
        Pay and Print
      </button>
      <div style={{ width: "1000px", height: "400px", overflow: "scroll" }}>
        <div style={{ width: "max-content", display: "flex" }}>
          {assets ? (
            assets.map((nft: any) => (
              <button
                key={nft.id.tokenId}
                style={{
                  appearance: "none",
                  height: "400px",
                  padding: "20px",
                  marginLeft: "20px",
                  background: selectedNft === nft.id.tokenId ? "#777" : "white",
                }}
                onClick={selectNft(nft.id.tokenId)}
              >
                <img
                  height="100%"
                  style={{ objectFit: "cover" }}
                  src={nft.media?.[0]?.gateway ?? ""}
                  alt={nft.id.tokenId}
                />
              </button>
            ))
          ) : (
            <span>Loading ...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assets;
