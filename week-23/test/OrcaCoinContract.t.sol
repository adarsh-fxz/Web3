// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/OrcaCoinContract.sol";

contract TestContract is Test {
    OrcaCoinContract c;

    function setUp() public {
        c = new OrcaCoinContract();
    }
}
