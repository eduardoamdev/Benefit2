import { useContext, useState, useEffect } from "react";
import { ContractContext } from "../context/contract";
import { formatEther } from "ethers/lib/utils";

const Info = () => {
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
    const formatedSupply = formatEther(totalSupply[0]);
    setTotalSupply({
      amount: formatedSupply,
    });
  };

  const getContractEthBalance = async () => {
    const balance = await contract.functions.getContractEthBalance();
    const formatedBalance = formatEther(balance[0]);
    setContractEthBalance({
      amount: formatedBalance,
    });
  };

  const getPrice = async () => {
    const price = await contract.functions.getPrice();
    const formatedPrice = formatEther(price[0]);
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
    <div className="d-flex fd-column ai-center padding-t-25">
      <span className="fs-2">Total supply: {totalSupply.amount} BNF</span>
      <span className="fs-2">Token price: {price.price} MATIC</span>
      <span className="fs-2">
        Contract balance: {contractEthBalance.amount} MATIC
      </span>
    </div>
  );
};

export default Info;
