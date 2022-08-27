import { useContext, useState, useEffect } from "react";
import { ContractContext } from "../context/contract";
import { ethers } from "ethers";
import getWallet from "../resources/getWallet";

const AddFunds = () => {
  const contract = useContext(ContractContext);

  let [wallet, setWallet] = useState({
    account: "",
  });

  let [amount, setAmount] = useState({
    amount: "",
  });

  const getAccount = async () => {
    const account = await getWallet();
    setWallet({
      account,
    });
  };

  const addFunds = async () => {
    await contract.functions.addFunds(ethers.utils.parseEther(amount.amount), {
      from: wallet.account,
      value: ethers.utils.parseEther(amount.amount),
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
    addFunds();
  };

  useEffect(() => {
    getAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex fd-column ai-center padding-t-15">
      <h1 className="fs-2p5 fc-green margin-b-5 dynaFont">Inject liquidity</h1>
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

export default AddFunds;
