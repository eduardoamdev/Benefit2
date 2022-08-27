import { useContext, useState } from "react";
import { ContractContext } from "../context/contract";
import { ethers } from "ethers";

const ExtractFunds = () => {
  const contract = useContext(ContractContext);

  let [amount, setAmount] = useState({
    amount: "",
  });

  const extractFunds = async () => {
    await contract.functions.extractFunds(
      ethers.utils.parseEther(amount.amount)
    );
  };

  const handleAmountChange = (event) => {
    event.preventDefault();
    setAmount({
      amount: event.target.value,
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    extractFunds();
  };

  return (
    <div className="d-flex fd-column ai-center padding-t-15">
      <h1 className="fs-2p5 fc-green margin-b-5 dynaFont">Extract to invest</h1>
      <label className="fs-1p6 margin-b-1 fc-white">Amount:</label>
      <input className="fs-1p6 margin-b-2" onChange={handleAmountChange} />
      <button
        className="fs-1p6 padding-button bg-green fc-white green-border-2 border-radius-1-r"
        onClick={handleClick}
      >
        Submit
      </button>
    </div>
  );
};

export default ExtractFunds;
