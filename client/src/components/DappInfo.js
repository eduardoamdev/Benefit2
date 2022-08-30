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
    const toFixedSoldTokens = parseFloat(formatedSoldTokens).toFixed(1);
    const toFixedStrSoldTokens = toFixedSoldTokens.toString();
    setSoldTokens({
      amount: toFixedStrSoldTokens,
    });
  };

  const getPrice = async () => {
    const price = await contract.functions.getPrice();
    const formatedPrice = ethers.utils.formatEther(price[0]);
    const toFixedPrice = parseFloat(formatedPrice).toFixed(4);
    const toFixedStrPrice = toFixedPrice.toString();
    setPrice({
      price: toFixedStrPrice,
    });
  };

  const getContractEthBalance = async () => {
    const balance = await contract.functions.getContractEthBalance();
    const formatedBalance = ethers.utils.formatEther(balance[0]);
    const toFixedBalance = parseFloat(formatedBalance).toFixed(4);
    const toFixedStrBalance = toFixedBalance.toString();
    setContractEthBalance({
      amount: toFixedStrBalance,
    });
  };

  useEffect(() => {
    getTotalSupply();
    getSoldTokens();
    getPrice();
    getContractEthBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex fd-column ai-center padding-t-15 padding-b-10">
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
            <td className="padding-1 white-border-2">
              <p className="fs-2 fc-white">Sold tokens:</p>
            </td>
            <td className="padding-1 fc-white white-border-2">
              <p className="fs-2 d-flex jc-end">{soldTokens.amount} BNF</p>
            </td>
          </tr>
          <tr>
            <td className="padding-1 fc-white  white-border-2">
              <p className="fs-2">Token price:</p>
            </td>
            <td className="padding-1 fc-white white-border-2">
              <p className="fs-2 d-flex jc-end">{price.price} MATIC</p>
            </td>
          </tr>
          <tr>
            <td className="padding-1 fc-white white-border-2">
              <p className="fs-2">Contract balance:</p>
            </td>
            <td className="padding-1 fc-white white-border-2">
              <p className="fs-2 d-flex jc-end">
                {contractEthBalance.amount} MATIC
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DappInfo;
