// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract BridgeETH is Ownable {
    uint256 public balance;
    address public tokenAddress;

    event Deposit(address indexed depositer, uint256 amount);

    mapping(address => uint256) public pendingBalance;

    constructor(address _tokenAddress) Ownable(msg.sender) {
        tokenAddress = _tokenAddress;
    }

    function deposit(IERC20 _tokenAddress, uint256 _amount) public {
        require(address(_tokenAddress) == tokenAddress);
        require(
            _tokenAddress.allowance(msg.sender, address(this)) >= _amount,
            "Not enough allowance"
        );
        require(
            _tokenAddress.transferFrom(msg.sender, address(this), _amount),
            "Transfer failed"
        );
        emit Deposit(msg.sender, _amount);
    }

    function withdraw(IERC20 _tokenAddress, uint256 _amount) public {
        require(address(_tokenAddress) == tokenAddress);
        require(
            pendingBalance[msg.sender] >= _amount,
            "Not enough balance to withdraw"
        );
        pendingBalance[msg.sender] -= _amount;
        require(_tokenAddress.transfer(msg.sender, _amount), "Transfer failed");
    }

    function burnedOnOtherSide(
        address userAccount,
        uint256 _amount
    ) public onlyOwner {
        pendingBalance[userAccount] += _amount;
    }
}
