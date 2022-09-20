import dotenv from "dotenv";
import ethers from "ethers";

const contractAbi = [
  "event TotalSupplyStablished(uint256 totalSupply)",
  "event InitialPriceStablished(uint256 initialPrice)",
  "event SoldTokensChanged(uint256 currentSoldTokens)",
  "event ContractBalanceChanged(uint256 currentContractBalance)",
];

const ethersProvider = new ethers.providers.WebSocketProvider(
  dotenv.config().parsed.PROVIDER_URL
);

const contract = new ethers.Contract(
  dotenv.config().parsed.CONTRACT_ADDRESS,
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
