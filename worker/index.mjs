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

contract.on("InitialPriceStablished", async (initialPrice) => {
  const promise = await fetch(`${dotenv.config().parsed.API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation createInitialPriceFetch($price: Float) {
          createInitialPrice(price: $price){
            success
            message
          }
        }
        `,
      variables: { price: parseFloat(initialPrice) },
    }),
  });

  const response = await promise.json();

  if (!response.errors) {
    console.log(
      `Create initial price has been executed correctly with the following response: ${JSON.stringify(
        response.data
      )}`
    );
  } else {
    console.log(
      `Create initial price has returned the following error: ${response.errors[0].message}`
    );
  }
});

contract.on("SoldTokensChanged", async (currentSoldTokens) => {
  const promise = await fetch(`${dotenv.config().parsed.API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation updateSoldTokensFetch($amount: Float) {
          updateSoldTokens(amount: $amount){
            success
            message
          }
        }
        `,
      variables: { amount: parseFloat(currentSoldTokens) },
    }),
  });

  const response = await promise.json();

  if (!response.errors) {
    console.log(
      `Sold tokens changed has been executed correctly with the following response: ${JSON.stringify(
        response.data
      )}`
    );
  } else {
    console.log(
      `Create tokens changed has returned the following error: ${response.errors[0].message}`
    );
  }
});

contract.on("ContractBalanceChanged", async (currentContractBalance) => {
  const promise = await fetch(`${dotenv.config().parsed.API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation updateBalanceFetch($balance: Float) {
          updateBalance(balance: $balance){
            success
            message
          }
        }
        `,
      variables: { balance: parseFloat(currentContractBalance) },
    }),
  });

  const response = await promise.json();

  if (!response.errors) {
    console.log(
      `Contract balance updating has been executed correctly with the following response: ${JSON.stringify(
        response.data
      )}`
    );
  } else {
    console.log(
      `Contract balance updating has returned the following error: ${response.errors[0].message}`
    );
  }
});
