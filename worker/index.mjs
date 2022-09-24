import dotenv from "dotenv";
import ethers from "ethers";
import fetch from "node-fetch";

const contractAbi = [
  "event TotalSupplyStablished(uint256 totalSupply)",
  "event InitialPriceStablished(uint256 initialPrice)",
  "event SoldTokensChanged(uint256 currentSoldTokens)",
  "event ContractBalanceChanged(uint256 currentContractBalance)",
];

const ethersProvider = new ethers.providers.WebSocketProvider(
  dotenv.config().parsed.NODE_URL
);

const contract = new ethers.Contract(
  dotenv.config().parsed.CONTRACT_ADDRESS,
  contractAbi,
  ethersProvider
);

console.log("Worker listening");

contract.on("TotalSupplyStablished", async (totalSupply) => {
  const promise = await fetch(`${dotenv.config().parsed.API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation createSupplyFetch($supply: Float) {
          createSupply(supply: $supply){
            success
            message
          }
        }
        `,
      variables: { supply: parseFloat(totalSupply) },
    }),
  });

  const response = await promise.json();

  if (!response.errors) {
    console.log(
      `Create supply has been executed correctly with the following response: ${JSON.stringify(
        response.data
      )}`
    );
  } else {
    console.log(
      `Create supply has returned the following error: ${response.errors[0].message}`
    );
  }
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
