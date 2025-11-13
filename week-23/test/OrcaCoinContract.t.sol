// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/OrcaCoinContract.sol";

contract TestContract is Test {
    OrcaCoinContract c;

    function setUp() public {
        c = new OrcaCoinContract(address(this));
    }

    function testInitialSupply() public view {
        assert(c.totalSupply() == 0);
    }

    function test_RevertIf_MintFails() public {
        vm.expectRevert("Only staking contract can mint");
        vm.prank(0x90a254BEc9164E08a1990F5B90757DE6b3CF5696);
        c.mint(0x90a254BEc9164E08a1990F5B90757DE6b3CF5696, 1000);
    }

    function testMint() public {
        c.mint(0x90a254BEc9164E08a1990F5B90757DE6b3CF5696, 1000);
        assert(c.balanceOf(0x90a254BEc9164E08a1990F5B90757DE6b3CF5696) == 1000);
    }

    function testChangeStakingContract() public {
        c.updateStakingContract(0x90a254BEc9164E08a1990F5B90757DE6b3CF5696);
        vm.prank(0x90a254BEc9164E08a1990F5B90757DE6b3CF5696);
        c.mint(0x90a254BEc9164E08a1990F5B90757DE6b3CF5696, 1000);
        assert(c.balanceOf(0x90a254BEc9164E08a1990F5B90757DE6b3CF5696) == 1000);
    }
}
