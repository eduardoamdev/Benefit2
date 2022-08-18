//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Benefit {
    address public contractAddress;

    constructor() {
        contractAddress = msg.sender;
    }

    function getContractAddress() public view returns (address) {
        return contractAddress;
    }
}
