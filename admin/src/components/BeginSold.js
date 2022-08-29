import { useContext, useState, useEffect } from "react";
import { ContractContext } from "../context/contract";
import { ethers } from "ethers";
import getWallet from "../resources/getWallet";

const BeginSold = () => {
  const contract = useContext(ContractContext);

  let [wallet, setWallet] = useState({
    account: "",
  });

  let [info, setInfo] = useState({
    amount: "",
    balance: "",
  });

  const getAccount = async () => {
    const account = await getWallet();
    setWallet({
      account,
    });
  };

  const beginSold = async () => {
    await contract.functions.beginSold(ethers.utils.parseEther(info.amount), {
      from: wallet.account,
      value: ethers.utils.parseEther(info.balance),
    });
    setInfo({
      amount: "",
      balance: "",
    });
  };

  const handleTokensChange = (event) => {
    event.preventDefault();
    setInfo({
      ...info,
      amount: event.target.value,
    });
  };

  const handleBalanceChange = (event) => {
    event.preventDefault();
    setInfo({
      ...info,
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
    <div className="d-flex fd-column ai-center padding-t-15 padding-b-10">
      <h1 className="fs-2p5 fc-orange margin-b-5 dynaFont">Turn on Benefit</h1>
      <label className="fs-1p6 margin-b-1 fc-white">Set token's amount:</label>
      <input
        className="fs-1p6 margin-b-1p5 padding-0p5"
        onChange={handleTokensChange}
        value={info.amount}
      />
      <label className="fs-1p6 margin-b-1 fc-white">Set initial balance:</label>
      <input
        className="fs-1p6 margin-b-2 padding-0p5"
        onChange={handleBalanceChange}
        value={info.balance}
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

export default BeginSold;
