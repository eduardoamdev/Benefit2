import { useContext, useState } from "react";
import { ContractContext } from "../context/contract";
import { ethers } from "ethers";

const Redeem = () => {
  const contract = useContext(ContractContext);

  let [tokenAmount, setTokenAmount] = useState({
    amount: "",
  });

  const redeem = async () => {
    await contract.functions.redeem(
      ethers.utils.parseEther(tokenAmount.amount)
    );
    setTokenAmount({
      amount: "",
    });
  };

  const handleTokensChange = (event) => {
    event.preventDefault();
    setTokenAmount({
      amount: event.target.value,
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    redeem();
  };

  return (
    <div className="d-flex fd-column ai-center padding-t-15 padding-b-10">
      <h1 className="fs-2p5 fc-green margin-b-5 dynaFont">Redeem BNF</h1>
      <label className="fs-1p6 margin-b-1 fc-white">Tokens amount:</label>
      <input
        className="fs-1p6 margin-b-1p5 padding-0p5"
        onChange={handleTokensChange}
        value={tokenAmount.amount}
      />
      <button
        className="fs-1p6 padding-button bg-green fc-white green-border-2 border-radius-1-r"
        onClick={handleClick}
      >
        Redeem
      </button>
    </div>
  );
};

export default Redeem;
