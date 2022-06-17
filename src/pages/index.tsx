import Assets from "../components/Assets";
import useConnectWalletBtn from "../hooks/connectWallet";

const IndexPage = () => {
  // HOOKS
  useConnectWalletBtn();

  return (
    <div>
      <Assets />
    </div>
  );
};

export default IndexPage;
