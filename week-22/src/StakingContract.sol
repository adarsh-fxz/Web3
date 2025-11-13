// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

contract StakingContract {
    mapping(address => uint) stakes;
    uint public totalStake;

    constructor() {}

    function stake(uint _amount) public payable {
        require(_amount > 0);
        require(_amount == msg.value, "Sent value must match the stake amount");
        stakes[msg.sender] += _amount;
        totalStake += _amount;
    }

    function unstake(uint _amount) public {
        require(_amount > 0);
        require(stakes[msg.sender] >= _amount);
        payable(msg.sender).transfer(_amount / 2);
        totalStake -= _amount;
        stakes[msg.sender] -= _amount;
    }
}
