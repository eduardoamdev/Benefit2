import dotenv from "dotenv";
import ethers from "ethers";

const contractAbi = [
  "event TotalSupplyStablished(uint256 totalSupply)",
  "event InitialPriceStablished(uint256 initialPrice)",
  "event SoldTokensChanged(uint256 currentSoldTokens)",
  "event ContractBalanceChanged(uint256 currentContractBalance)",
];

/* const ethersProvider = new ethers.providers.WebSocketProvider(
  dotenv.config().parsed.PROVIDER_URL
); */

const ethersProvider = new ethers.providers.WebSocketProvider(
  "http://127.0.0.1:8545"
);

/* const contract = new ethers.Contract(
  dotenv.config().parsed.CONTRACT_ADDRESS,
  contractAbi,
  ethersProvider
); */

const contract = new ethers.Contract(
  "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  contractAbi,
  ethersProvider
);

console.log("Worker listening");

contract.on("TotalSupplyStablished", (totalSupply) => {
  console.log("Total supply event received");
  console.log("Total supply: " + totalSupply);
});

contract.on("InitialPriceStablished", (initialPrice) => {
  console.log("Initial price event received");
  console.log("Initial price: " + initialPrice);
});

contract.on("SoldTokensChanged", (currentSoldTokens) => {
  console.log("Sold tokens event received");
  console.log("Sold tokens: " + currentSoldTokens);
});

contract.on("ContractBalanceChanged", (currentContractBalance) => {
  console.log("Contract balance event received");
  console.log("Contract balance: " + currentContractBalance);
});
