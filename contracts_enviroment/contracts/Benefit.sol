//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./ERC20.sol";
import "./Ownable.sol";

contract Benefit is ERC20, Ownable {
    address public contractAddress;

    uint256 public price;

    bool public initialPriceStablished;

    bool public initialMintAvailable;

    uint256 public initialSupport;

    uint256 public support;

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

    function checkValuePriceRelation(uint256 _amount) internal {
        require(
            msg.value == _amount * price,
            "Value does not match with tokens amount cost"
        );
    }

    function div(uint256 _num1, uint256 _num2) internal pure returns (uint256) {
        require(_num2 != 0);
        if (_num1 == 0) {
            return 0;
        } else {
            uint256 result;
            result = _num1 / _num2;
            uint256 divisional;
            divisional = _num1 % _num2;
            require(_num1 == ((result * _num2) + divisional));
            uint256 finalResult = result + (divisional / _num2);
            return finalResult;
        }
    }

    function setInitialPrice(uint256 _initialPrice)
        public
        checkInitialMintAvailable
    {
        price = _initialPrice;
        initialPriceStablished = true;
    }

    function getContractBnfBalance() public view returns (uint256) {
        return balanceOf(contractAddress);
    }

    function getContractEthBalance() public view returns (uint256) {
        return contractAddress.balance;
    }

    function initialMint(uint256 _amount)
        public
        payable
        onlyOwner
        checkInitialMintAvailable
        checkInitialPriceStablished
    {
        checkValuePriceRelation(_amount);
        _mint(contractAddress, _amount);
        initialSupport = contractAddress.balance;
        updateSupport();
        updatePrice();
        initialMintAvailable = false;
    }

    function updateSupport() public {
        if (contractAddress.balance < initialSupport) {
            support = contractAddress.balance;
        } else {
            support = initialSupport;
        }
    }

    function getSupport() public returns (uint256) {
        updateSupport();
        return support;
    }

    function updatePrice() internal {
        price = div(contractAddress.balance, totalSupply());
    }

    function buy(uint256 _amount) public payable {
        require(
            balanceOf(address(this)) >= _amount,
            "There is not enought tokens in stock"
        );
        checkValuePriceRelation(_amount);
        _transfer(contractAddress, msg.sender, _amount);
        updateSupport();
        updatePrice();
    }
}

/* Notes:
    Initial price: 1000000000000000000 weis
    Initial supply 10 BNF
    Initial price 1 ETH (1000000000000000000 weis)
    Initial support 10 ETH
 */
