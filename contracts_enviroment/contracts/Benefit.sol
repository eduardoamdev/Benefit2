//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./ERC20.sol";
import "./Ownable.sol";

contract Benefit is ERC20, Ownable {
    address public contractAddress;

    uint256 public minimumPrice;

    uint256 public price;

    bool public initialPriceStablished;

    bool public initialMintAvailable;

    uint256 public initialSupport;

    uint256 public support;

    uint256 public soldTokens;

    address[] public wallets;

    constructor() ERC20("Benefit", "BNF") {
        contractAddress = address(this);
        initialPriceStablished = false;
        initialMintAvailable = true;
    }

    function mul(uint256 _num1, uint256 _num2) internal pure returns (uint256) {
        if (_num1 == 0) {
            return 0;
        } else if (_num2 == 0) {
            return 0;
        } else {
            uint256 result;
            result = _num1 * _num2;
            return result;
        }
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

    modifier checkEndingSoldConditions() {
        require(soldTokens == 0, "There are sold tokens yet");
        _;
    }

    function checkValuePriceRelation(uint256 _amount) internal {
        require(
            msg.value == div(_amount * price, 1e18),
            "Value does not match with tokens amount cost"
        );
    }

    function checkAccountBalance(uint256 _amount) public view {
        require(
            balanceOf(msg.sender) >= _amount,
            "You have not that amount of tokens"
        );
    }

    function checkTokenStock(uint256 _amount) public view {
        require(
            balanceOf(contractAddress) >= _amount,
            "There is not enought tokens in stock"
        );
    }

    function checkSupportForExtraction(uint256 _amount) public view {
        require(
            contractAddress.balance - _amount >
                div(mul(soldTokens, minimumPrice), 1e18),
            "You have to leave enought support"
        );
    }

    function checkAmountAddedToContract(uint256 _amount) internal {
        require(_amount == msg.value, "Values are not correct");
    }

    function checkWallet() internal {
        bool isWalletLogged = false;
        for (uint256 i = 0; i < wallets.length; i++) {
            if (msg.sender == wallets[i]) {
                isWalletLogged = true;
            }
        }
        if (isWalletLogged == false) {
            wallets.push(msg.sender);
        }
    }

    function getPrice() public view returns (uint256) {
        return price;
    }

    function getContractBnfBalance() public view returns (uint256) {
        return balanceOf(contractAddress);
    }

    function getContractEthBalance() public view returns (uint256) {
        return contractAddress.balance;
    }

    function getSupport() public returns (uint256) {
        updateSupport();
        return support;
    }

    function getWallets() public view returns (address[] memory) {
        return wallets;
    }

    function updateSupport() public {
        if (contractAddress.balance < initialSupport) {
            support = contractAddress.balance;
        } else {
            support = initialSupport;
        }
    }

    function updatePrice() internal {
        uint256 newPrice = div(
            mul(contractAddress.balance, 1e18),
            totalSupply()
        );
        if (newPrice <= minimumPrice) {
            price = minimumPrice;
        } else {
            price = newPrice;
        }
    }

    function beginSold(uint256 _amount) public payable onlyOwner {
        _mint(contractAddress, _amount);
        initialSupport = contractAddress.balance;
        minimumPrice = div(mul(contractAddress.balance, 1e18), totalSupply());
        updateSupport();
        updatePrice();
    }

    function buy(uint256 _amount) public payable {
        checkTokenStock(_amount);
        checkValuePriceRelation(_amount);
        checkWallet();
        _transfer(contractAddress, msg.sender, _amount);
        soldTokens += _amount;
        updateSupport();
        updatePrice();
    }

    function redeem(uint256 _amount) public {
        checkAccountBalance(_amount);
        _transfer(msg.sender, contractAddress, _amount);
        uint256 amountToTransfer = div(mul(_amount, minimumPrice), 1e18);
        payable(msg.sender).transfer(amountToTransfer);
        updateSupport();
        updatePrice();
        soldTokens -= _amount;
    }

    function addFunds(uint256 _amount) public payable onlyOwner {
        checkAmountAddedToContract(_amount);
        updateSupport();
        updatePrice();
    }

    function extractFunds(uint256 _amount) public onlyOwner {
        checkSupportForExtraction(_amount);
        payable(msg.sender).transfer(_amount);
        updateSupport();
        updatePrice();
    }

    function shareDividends(uint256 _amount) public onlyOwner {
        checkSupportForExtraction(_amount);
        for (uint256 i = 0; i < wallets.length; i++) {
            uint256 amountToShare = mul(
                div(_amount, soldTokens),
                balanceOf(wallets[i])
            );
            payable(wallets[i]).transfer(amountToShare);
        }
        updateSupport();
        updatePrice();
    }

    function endSold() public onlyOwner checkEndingSoldConditions {
        payable(msg.sender).transfer(contractAddress.balance);
        updateSupport();
        updatePrice();
    }
}
