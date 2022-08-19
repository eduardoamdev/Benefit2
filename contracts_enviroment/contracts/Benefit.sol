//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./ERC20.sol";
import "./Ownable.sol";

contract Benefit is ERC20, Ownable {
    address public contractAddress;
    uint256 public initialPrice;
    bool public initialPriceStablished;
    bool public initialMintAvailable;

    constructor() ERC20("Benefit", "BNF") {
        contractAddress = address(this);
        initialPriceStablished = false;
        initialMintAvailable = true;
    }

    modifier checkInitialPriceStablished() {
        require(
            initialPriceStablished == true,
            "Initial price must be established"
        );
        _;
    }

    modifier checkInitialMintAvailable() {
        require(
            initialMintAvailable == true,
            "Initial mint has already been executed"
        );
        _;
    }

    function setInitialPrice(uint256 _initialPrice) public {
        initialPrice = _initialPrice;
        initialPriceStablished = true;
    }

    function initialMint(uint256 _amount)
        public
        payable
        onlyOwner
        checkInitialMintAvailable
        checkInitialPriceStablished
    {
        require(
            msg.value == _amount * initialPrice,
            "Value does not match with tokens amount cost"
        );
        _mint(contractAddress, _amount);
        initialMintAvailable = false;
    }
}
