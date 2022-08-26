import { useContext, useState, useEffect } from "react";
import { ContractContext } from "../context/contract";
import { parseEther } from "ethers/lib/utils";
import getWallet from "../resources/getWallet";

const BeginSold = () => {
  const contract = useContext(ContractContext);

  let [wallet, setWallet] = useState({
    account: "",
  });

  let [tokenAmount, setTokenAmount] = useState({
    amount: "",
  });

  let [balance, setBalance] = useState({
    balance: "",
  });

  const getAccount = async () => {
    const account = await getWallet();
    setWallet({
      account,
    });
  };

  const beginSold = async () => {
    await contract.functions.beginSold(parseEther(tokenAmount.amount), {
      from: wallet.account,
      value: parseEther(balance.balance),
    });
  };

  const handleTokensChange = (event) => {
    event.preventDefault();
    setTokenAmount({
      amount: event.target.value,
    });
  };

  const handleBalanceChange = (event) => {
    event.preventDefault();
    setBalance({
      balance: event.target.value,
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    beginSold();
  };

  useEffect(() => {
    getAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex fd-column ai-center padding-t-15">
      <label className="fs-1p6 margin-b-1 fc-white">Set token's amount:</label>
      <input className="fs-1p6 margin-b-1p5" onChange={handleTokensChange} />
      <label className="fs-1p6 margin-b-1 fc-white">Set initial balance:</label>
      <input className="fs-1p6 margin-b-2" onChange={handleBalanceChange} />
      <button
        className="fs-1p6 padding-button bg-green fc-white green-border-2 border-radius-1-r"
        onClick={handleClick}
      >
        Submit
      </button>
    </div>
  );
};

export default BeginSold;
