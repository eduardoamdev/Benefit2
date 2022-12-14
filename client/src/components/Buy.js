import { useContext, useState, useEffect } from "react";
import { ContractContext } from "../context/contract";
import getWallet from "../resources/getWallet";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";

const Buy = () => {
  const contract = useContext(ContractContext);

  let [wallet, setWallet] = useState({
    account: "",
  });

  let [tokenAmount, setTokenAmount] = useState({
    amount: "",
  });

  let [price, setPrice] = useState({
    price: 0,
  });

  const getInitialPrice = async () => {
    const price = await contract.functions.getInitialPrice();
    const formatedPrice = ethers.utils.formatEther(price[0]);
    setPrice({
      price: formatedPrice,
    });
  };

  const getAccount = async () => {
    const account = await getWallet();
    setWallet({
      account,
    });
  };

  const buy = async () => {
    const bigNumberTokenAmount = new BigNumber(tokenAmount.amount);
    const bigNumberPrice = new BigNumber(price.price);
    const totalPrice = new BigNumber(
      bigNumberTokenAmount.multipliedBy(bigNumberPrice)
    );
    const totalPriceString = totalPrice.toString();
    await contract.functions.buy(ethers.utils.parseEther(tokenAmount.amount), {
      from: wallet.account,
      value: ethers.utils.parseEther(totalPriceString),
      gasLimit: 3000000,
    });
    setTokenAmount({
      amount: "",
    });
  };

  const handleTokensChange = (event) => {
    event.preventDefault();
    setTokenAmount({
      amount: event.target.value,
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    buy();
  };

  useEffect(() => {
    getAccount();
    getInitialPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex fd-column ai-center padding-t-15 padding-b-10">
      <h1 className="fs-2p5 fc-green margin-b-5 dynaFont">Buy BNF</h1>
      <label className="fs-1p6 margin-b-1 fc-white">Tokens amount:</label>
      <input
        className="fs-1p6 margin-b-1p5 padding-0p5"
        onChange={handleTokensChange}
        value={tokenAmount.amount}
      />
      <button
        className="fs-1p6 padding-button bg-green fc-white green-border-2 border-radius-1-r"
        onClick={handleClick}
      >
        Buy
      </button>
    </div>
  );
};

export default Buy;
