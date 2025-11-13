// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "src/StakingContract.sol";

contract TestStakingContract is Test {
    StakingContract c;

    function setUp() public {
        c = new StakingContract();
    }

    function testStake() public {
        uint value = 10 ether;
        c.stake{value: value}(value);

        assert(c.totalStake() == value);
    }

    function test_RevertWhen_Stake() public {
        uint value = 10 ether;
        vm.expectRevert();
        c.stake(value);
    }

    function testUnstake() public {
        uint value = 10 ether;
        vm.startPrank(0x587EFaEe4f308aB2795ca35A27Dff8c1dfAF9e3f);
        vm.deal(0x587EFaEe4f308aB2795ca35A27Dff8c1dfAF9e3f, value);
        c.stake{value: value}(value);
        c.unstake(value);

        assert(c.totalStake() == 0);
    }
}
