import { useState, useContext } from "react";
import { ContractContext } from "../context/contract";
import { ethers } from "ethers";

const Balances = () => {
  const contract = useContext(ContractContext);

  let [info, setInfo] = useState({
    account: "",
    balance: "",
  });

  const getAccountBalance = async () => {
    const accountBalance = await contract.functions.balanceOf(info.account);
    const formatedBalance = ethers.utils.formatEther(accountBalance[0]);
    setInfo({
      account: "",
      balance: formatedBalance,
    });
  };

  const handleAccountChange = (event) => {
    event.preventDefault();
    setInfo({
      ...info,
      account: event.target.value,
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    getAccountBalance();
  };

  return (
    <div className="d-flex fd-column ai-center padding-t-15 padding-b-10">
      <h1 className="fs-2p5 fc-green margin-b-5 dynaFont">Get the balance</h1>
      <label className="fs-1p6 margin-b-1 fc-white">Account:</label>
      <input
        className="fs-1p6 margin-b-1p5 padding-0p5"
        onChange={handleAccountChange}
        value={info.account}
      />
      <button
        className="fs-1p6 padding-button margin-b-1p5 bg-green fc-white green-border-2 border-radius-1-r"
        onClick={handleClick}
      >
        Get balance
      </button>
      <table>
        <tbody>
          <tr>
            <td className="padding-1">
              <span className="fs-1p6 fc-white">Balance: </span>
            </td>
            <td className="min-w-2p5">
              <span className="fs-1p6 fc-white">{info.balance}</span>
            </td>
            <td>
              <span className="fs-1p6 fc-white">BNF</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Balances;
