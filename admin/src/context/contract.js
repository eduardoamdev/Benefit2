import React from "react";
import { ethers } from "ethers";
import contractAbi from "../resources/contractAbi.json";

const contractAddress = "0xcfdf344852E8B34aA8DBd6a624124bfEC2d19aF5";

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

const signer = provider.getSigner();

export const contract = new ethers.Contract(
  contractAddress,
  contractAbi,
  signer
);

export const ContractContext = React.createContext();
