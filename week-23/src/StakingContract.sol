// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

contract StakingContract {
    mapping(address => uint256) public balances;
    mapping(address => uint256) public unclaimedRewards;
    mapping(address => uint256) public lastUpdateTime;

    constructor() {}

    function stake() public payable {
        require(msg.value > 0, "Must stake a positive amount");
        balances[msg.sender] += msg.value;
        if (lastUpdateTime[msg.sender] == 0) {
            lastUpdateTime[msg.sender] = block.timestamp;
        } else {
            unclaimedRewards[msg.sender] +=
                (block.timestamp - lastUpdateTime[msg.sender]) *
                balances[msg.sender];
            lastUpdateTime[msg.sender] = block.timestamp;
        }
        balances[msg.sender] += msg.value;
    }

    function unstake(uint _amount) public {
        require(
            _amount <= balances[msg.sender],
            "Insufficient balance to unstake"
        );
        unclaimedRewards[msg.sender] +=
            (block.timestamp - lastUpdateTime[msg.sender]) *
            balances[msg.sender];
        lastUpdateTime[msg.sender] = block.timestamp;

        payable(msg.sender).transfer(_amount);
        balances[msg.sender] -= _amount;
    }

    function getRewards(address _address) public view returns (uint256) {
        uint256 currentReward = unclaimedRewards[_address];
        uint256 updateTime = lastUpdateTime[_address];
        uint256 newReward = (block.timestamp - updateTime) * balances[address];
        return currentReward + newReward;
    }

    function claimRewards() public {
        uint256 currentReward = unclaimedRewards[msg.sender];
        uint256 updateTime = lastUpdateTime[msg.sender];
        uint256 newReward = (block.timestamp - updateTime) * balances[address];

        // transfer currentReward + newReward unclaimedRewards [msg.sender ORCA tokens]

        unclaimedRewards[msg.sender] = 0;
        lastUpdateTime[msg.sender] = block.timestamp;
    }

    function balanceOf(address _address) public view returns (uint256) {
        return balances[_address];
    }
}
