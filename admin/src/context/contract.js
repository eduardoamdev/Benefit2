import React from "react";
import { ethers } from "ethers";
import contractAbi from "../resources/contractAbi.json";

/* const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; */

const contractAddress = "0x2Da909435b2c4a861ee8814AFb4a727e91001b83";

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

const signer = provider.getSigner();

export const contract = new ethers.Contract(
  contractAddress,
  contractAbi,
  signer
);

export const ContractContext = React.createContext();
