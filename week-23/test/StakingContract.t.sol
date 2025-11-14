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
        c.stake{value: 200}();
        assert(c.balanceOf(address(this)) == 200);
    }

    function testStakeUser() public {
        vm.startPrank(0x6f840234AC35e375C1fD8B150E742d3731672815);
        vm.deal(0x6f840234AC35e375C1fD8B150E742d3731672815, 10 ether);
        c.stake{value: 1 ether}();
        assert(
            c.balanceOf(0x6f840234AC35e375C1fD8B150E742d3731672815) == 1 ether
        );
        vm.stopPrank();
    }

    function testUnstake() public {
        c.stake{value: 200}();
        c.unstake(100);
        assert(c.balanceOf(address(this)) == 100);
    }

    function test_RevertIf_Unstake() public {
        c.stake{value: 200}();
        vm.expectRevert();
        c.unstake(300);
    }
}
