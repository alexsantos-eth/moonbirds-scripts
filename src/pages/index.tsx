import Assets from "../components/Assets";
import useConnectWalletBtn from "../hooks/connectWallet";
import useSuccessPayment from "./success";

const IndexPage = () => {
  // HOOKS
  useSuccessPayment();
  useConnectWalletBtn();

  return (
    <div>
      <Assets />
    </div>
  );
};

export default IndexPage;
