import { useContext, useState, useEffect } from "react";
import { ContractContext } from "../context/contract";
import { ethers } from "ethers";

const DappInfo = () => {
  const contract = useContext(ContractContext);

  let [price, setPrice] = useState({
    price: 0,
  });

  let [totalSupply, setTotalSupply] = useState({
    amount: 0,
  });

  let [contractEthBalance, setContractEthBalance] = useState({
    amount: 0,
  });

  const getTotalSupply = async () => {
    const totalSupply = await contract.functions.totalSupply();
    const formatedSupply = ethers.utils.formatEther(totalSupply[0]);
    setTotalSupply({
      amount: formatedSupply,
    });
  };

  const getContractEthBalance = async () => {
    const balance = await contract.functions.getContractEthBalance();
    const formatedBalance = ethers.utils.formatEther(balance[0]);
    setContractEthBalance({
      amount: formatedBalance,
    });
  };

  const getPrice = async () => {
    const price = await contract.functions.getPrice();
    const formatedPrice = ethers.utils.formatEther(price[0]);
    setPrice({
      price: formatedPrice,
    });
  };

  useEffect(() => {
    getTotalSupply();
    getPrice();
    getContractEthBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex fd-column ai-center padding-t-15">
      <h1 className="fs-2p5 fc-green margin-b-5 dynaFont">State of Benefit</h1>
      <table className="white-border-4">
        <tbody>
          <tr>
            <td className="padding-1 white-border-2">
              <p className="fs-2 fc-white">Total supply:</p>
            </td>
            <td className="padding-1 fc-white white-border-2">
              <p className="fs-2 d-flex jc-end">{totalSupply.amount} BNF</p>
            </td>
          </tr>
          <tr>
            <td className="padding-1 fc-white  white-border-2">
              <p className="fs-2">Token price:</p>
            </td>
            <td className="padding-1 fc-white white-border-2">
              <p className="fs-2 d-flex jc-end">{price.price} ETH</p>
            </td>
          </tr>
          <tr>
            <td className="padding-1 fc-white white-border-2">
              <p className="fs-2">Contract balance:</p>
            </td>
            <td className="padding-1 fc-white white-border-2">
              <p className="fs-2 d-flex jc-end">
                {contractEthBalance.amount} ETH
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DappInfo;
