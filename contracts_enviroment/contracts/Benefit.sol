//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./ERC20.sol";

contract Benefit is ERC20 {
    address public owner;
    address public contractAddress;
    uint256 public initialPrice;
    bool public initialPriceStablished;
    bool public initialMintAvailable;

    constructor() ERC20("Benefit", "BNF") {
        owner = msg.sender;
        contractAddress = address(this);
        initialPriceStablished = false;
        initialMintAvailable = true;
    }

    function setInitialPrice(uint256 _initialPrice) public {
        initialPrice = _initialPrice;
        initialPriceStablished = true;
    }

    function initialMint(uint256 _amount) public payable {
        require(
            initialPriceStablished == true,
            "Initial price must be established"
        );
        require(initialMintAvailable == true, "Initial mint must be available");
        require(
            msg.sender == owner,
            "This addres is not allowed to mint BNF tokens"
        );
        require(
            msg.sender.balance >= msg.value,
            "Yo have not enought funds to mint that Tokens"
        );
        require(
            msg.value == _amount * initialPrice,
            "Value does not match with tokens amount cost"
        );
        _mint(contractAddress, _amount);
        initialMintAvailable = false;
    }

    function getContractBalance() public view returns (uint256) {
        return balanceOf(contractAddress);
    }
}
