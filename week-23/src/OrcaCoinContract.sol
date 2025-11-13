// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OrcaCoinContract is ERC20 {
    address stakingContract;
    address owner;

    constructor(address _stakingContract) ERC20("OrcaCoin", "ORCA") {
        stakingContract = _stakingContract;
        owner = msg.sender;
    }

    function mint(address to, uint256 amount) public {
        require(
            msg.sender == stakingContract,
            "Only staking contract can mint"
        );
        _mint(to, amount);
    }

    function updateStakingContract(address _stakingContract) public {
        require(msg.sender == owner);
        stakingContract = _stakingContract;
    }
}
