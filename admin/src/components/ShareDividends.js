import { useContext, useState } from "react";
import { ContractContext } from "../context/contract";
import { ethers } from "ethers";

const ShareDividends = () => {
  const contract = useContext(ContractContext);

  let [amount, setAmount] = useState({
    amount: "",
  });

  const shareDividends = async () => {
    await contract.functions.shareDividends(
      ethers.utils.parseEther(amount.amount)
    );
    setAmount({
      amount: "",
    });
  };

  const handleAmountChange = (event) => {
    event.preventDefault();
    setAmount({
      amount: event.target.value,
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    shareDividends();
  };

  return (
    <div className="d-flex fd-column ai-center padding-t-15 padding-b-10">
      <h1 className="fs-2p5 fc-orange margin-b-5 dynaFont">Share dividends</h1>
      <label className="fs-1p6 margin-b-1 fc-white">Amount:</label>
      <input
        className="fs-1p6 margin-b-2 padding-0p5"
        onChange={handleAmountChange}
        value={amount.amount}
      />
      <button
        className="fs-1p6 padding-button bg-orange fc-white orange-border-2 border-radius-1-r"
        onClick={handleClick}
      >
        Submit
      </button>
    </div>
  );
};

export default ShareDividends;
