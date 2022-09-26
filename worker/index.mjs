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
  const supply = parseFloat(totalSupply) / 1e18;

  const promise = await fetch(`${dotenv.config().parsed.API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: process.env.PASSWORD,
    },
    body: JSON.stringify({
      query: `mutation createSupplyFetch($supply: Float) {
          createSupply(supply: $supply){
            success
            message
          }
        }
        `,
      variables: { supply: parseFloat(supply) },
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
  const price = parseFloat(initialPrice) / 1e18;

  const promise = await fetch(`${dotenv.config().parsed.API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: process.env.PASSWORD,
    },
    body: JSON.stringify({
      query: `mutation createInitialPriceFetch($price: Float) {
          createInitialPrice(price: $price){
            success
            message
          }
        }
        `,
      variables: { price: parseFloat(price) },
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
  const soldTokens = parseFloat(currentSoldTokens) / 1e18;

  const promise = await fetch(`${dotenv.config().parsed.API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: process.env.PASSWORD,
    },
    body: JSON.stringify({
      query: `mutation updateSoldTokensFetch($amount: Float) {
          updateSoldTokens(amount: $amount){
            success
            message
          }
        }
        `,
      variables: { amount: parseFloat(soldTokens) },
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
      `Sold tokens changed has returned the following error: ${response.errors[0].message}`
    );
  }
});

contract.on("ContractBalanceChanged", async (currentContractBalance) => {
  const contractBalance = parseFloat(currentContractBalance) / 1e18;

  const promise = await fetch(`${dotenv.config().parsed.API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: process.env.PASSWORD,
    },
    body: JSON.stringify({
      query: `mutation updateBalanceFetch($balance: Float) {
          updateBalance(balance: $balance){
            success
            message
          }
        }
        `,
      variables: { balance: parseFloat(contractBalance) },
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
