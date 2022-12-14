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

  let [soldTokens, setSoldTokens] = useState({
    amount: 0,
  });

  let [contractEthBalance, setContractEthBalance] = useState({
    amount: 0,
  });

  const getTotalSupply = async () => {
    const totalSupply = await contract.functions.totalSupply();
    const formatedSupply = ethers.utils.formatEther(totalSupply[0]);
    const parsedSupply = parseInt(formatedSupply);
    const toStrSupply = parsedSupply.toString();
    setTotalSupply({
      amount: toStrSupply,
    });
  };

  const getSoldTokens = async () => {
    const soldTokens = await contract.functions.soldTokens();
    const formatedSoldTokens = ethers.utils.formatEther(soldTokens[0]);
    const toFixedSoldTokens = parseFloat(formatedSoldTokens).toFixed(2);
    const toFixedStrSoldTokens = toFixedSoldTokens.toString();
    setSoldTokens({
      amount: toFixedStrSoldTokens,
    });
  };

  const getInitialPrice = async () => {
    const price = await contract.functions.getInitialPrice();
    const formatedPrice = ethers.utils.formatEther(price[0]);
    const toFixedPrice = parseFloat(formatedPrice);
    const toFixedStrPrice = toFixedPrice.toString();
    setPrice({
      price: toFixedStrPrice,
    });
  };

  const getContractEthBalance = async () => {
    const balance = await contract.functions.getContractEthBalance();
    const formatedBalance = ethers.utils.formatEther(balance[0]);
    const toFixedBalance = parseFloat(formatedBalance);
    const toFixedStrBalance = toFixedBalance.toString();
    setContractEthBalance({
      amount: toFixedStrBalance,
    });
  };

  useEffect(() => {
    getTotalSupply();
    getSoldTokens();
    getInitialPrice();
    getContractEthBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex fd-column ai-center padding-t-15 padding-b-10">
      <h1 className="fs-2p5 fc-green margin-b-5 dynaFont">State of Benefit</h1>
      <table className="border-collapse-separate green-border-4 border-radius-2">
        <tbody>
          <tr>
            <td className="padding-1">
              <p className="fs-2 fc-white">Total supply:</p>
            </td>
            <td className="padding-1 fc-white">
              <p className="fs-2 d-flex jc-end">{totalSupply.amount} BNF</p>
            </td>
          </tr>
          <tr>
            <td className="padding-1">
              <p className="fs-2 fc-white">Sold tokens:</p>
            </td>
            <td className="padding-1 fc-white">
              <p className="fs-2 d-flex jc-end">{soldTokens.amount} BNF</p>
            </td>
          </tr>
          <tr>
            <td className="padding-1 fc-white ">
              <p className="fs-2">Token price:</p>
            </td>
            <td className="padding-1 fc-white">
              <p className="fs-2 d-flex jc-end">{price.price} ETH</p>
            </td>
          </tr>
          <tr>
            <td className="padding-1 fc-white">
              <p className="fs-2">Contract balance:</p>
            </td>
            <td className="padding-1 fc-white">
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
