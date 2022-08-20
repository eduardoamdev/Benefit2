import React from "react";
import { ethers } from "ethers";
import contractAbi from "../resources/contractAbi.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const provider = ethers.getDefaultProvider("http://localhost:8545/");

const signer = new ethers.Wallet(
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  provider
);

export const contract = new ethers.Contract(
  contractAddress,
  contractAbi,
  signer
);

export const ContractContext = React.createContext();
