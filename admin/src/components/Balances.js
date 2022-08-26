import { useState, useContext } from "react";
import { ContractContext } from "../context/contract";
import { formatEther } from "ethers/lib/utils";

const Balances = () => {
  const contract = useContext(ContractContext);

  let [account, setAccount] = useState({
    account: "",
  });

  let [balance, setBalance] = useState({
    balance: "",
  });

  const getAccountBalance = async () => {
    const accountBalance = await contract.functions.balanceOf(account.account);
    const formatedBalance = formatEther(accountBalance[0]);
    setBalance({
      balance: formatedBalance,
    });
  };

  const handleAccountChange = (event) => {
    event.preventDefault();
    setAccount({
      account: event.target.value,
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    getAccountBalance();
  };

  return (
    <div className="d-flex fd-column ai-center padding-t-15">
      <label className="fs-1p6 margin-b-1 fc-white">Account:</label>
      <input className="fs-1p6 margin-b-1p5" onChange={handleAccountChange} />
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
              <span className="fs-1p6 fc-white">{balance.balance}</span>
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
