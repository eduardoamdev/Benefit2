import { useContext, useState } from "react";
import { ContractContext } from "../context/contract";
/* import { ethers } from "ethers"; */
import { formatEther } from "ethers/lib/utils";
import { parseEther } from "ethers/lib/utils";

const SetPrice = () => {
  const contract = useContext(ContractContext);

  let [amount, setAmount] = useState({
    amount: "",
  });

  const getPrice = async () => {
    const price = await contract.functions.getPrice();
    console.log(price[0]);
    const formatedPrice = formatEther(price[0]);
    console.log(formatedPrice);
  };

  const mint = () => {
    contract.functions.setInitialPrice(parseEther(amount.amount));
  };

  const handleClick = (event) => {
    event.preventDefault();
    mint();
  };

  const handleAmountChange = (event) => {
    event.preventDefault();
    setAmount({
      amount: event.target.value,
    });
  };

  return (
    <div>
      <label>Set token price</label>
      <input onChange={handleAmountChange} />
      <button onClick={handleClick}>Submit</button>
      <button onClick={getPrice}>Get price</button>
    </div>
  );
};

export default SetPrice;
