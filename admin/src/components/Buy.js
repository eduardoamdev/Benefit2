import { useContext, useState, useEffect } from "react";
import { ContractContext } from "../context/contract";
import { parseEther } from "ethers/lib/utils";
import getWallet from "../resources/getWallet";
import { formatEther } from "ethers/lib/utils";

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

  const getPrice = async () => {
    const price = await contract.functions.getPrice();
    const formatedPrice = formatEther(price[0]);
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

  /* const beginSold = async () => {
    await contract.functions.beginSold(parseEther(tokenAmount.amount), {
      from: wallet.account,
      value: parseEther(balance.balance),
      nonce: 0,
    });
  }; */

  const buy = async () => {
    const totalPrice = (tokenAmount.amount * price.price).toString();
    await contract.functions.buy(parseEther(tokenAmount.amount), {
      from: wallet.account,
      value: parseEther(totalPrice),
      gasLimit: 3000000,
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
    getPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex fd-column ai-center padding-t-15">
      <label className="fs-1p6 margin-b-1">Tokens amount:</label>
      <input className="fs-1p6 margin-b-1p5" onChange={handleTokensChange} />
      <button className="fs-1p6 padding-button" onClick={handleClick}>
        Buy
      </button>
    </div>
  );
};

export default Buy;
