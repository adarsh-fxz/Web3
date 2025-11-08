// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "src/EverestCoin.sol";

contract TestEverestCoin is Test {
    EverestCoin c;

    function setUp() public {
        c = new EverestCoin();
    }

    function testMint() public {
        c.mint(address(this), 100);
        assertEq(c.balanceOf(address(this)), 100, "ok");
        assertEq(
            c.balanceOf(0x755e40da9a23FE489c59628fa110219359951186),
            0,
            "ok"
        );

        c.mint(0x755e40da9a23FE489c59628fa110219359951186, 100);
        assertEq(
            c.balanceOf(0x755e40da9a23FE489c59628fa110219359951186),
            100,
            "ok"
        );
    }

    function testTransfer() public {
        c.mint(address(this), 100);
        c.transfer(0x755e40da9a23FE489c59628fa110219359951186, 50);

        assertEq(c.balanceOf(address(this)), 50);
        assertEq(c.balanceOf(0x755e40da9a23FE489c59628fa110219359951186), 50);

        vm.prank(0x755e40da9a23FE489c59628fa110219359951186);
        c.transfer(address(this), 50);

        assertEq(c.balanceOf(address(this)), 100);
        assertEq(c.balanceOf(0x755e40da9a23FE489c59628fa110219359951186), 0);
    }

    function testApprovals() public {
        c.mint(address(this), 100);

        c.approve(0x755e40da9a23FE489c59628fa110219359951186, 10);

        assertEq(
            c.allowance(
                address(this),
                0x755e40da9a23FE489c59628fa110219359951186
            ),
            10
        );
        assertEq(
            c.allowance(
                0x755e40da9a23FE489c59628fa110219359951186,
                address(this)
            ),
            0
        );

        vm.prank(0x755e40da9a23FE489c59628fa110219359951186);
        c.transferFrom(
            address(this),
            0x755e40da9a23FE489c59628fa110219359951186,
            5
        );

        assertEq(c.balanceOf(address(this)), 95, "ok");
        assertEq(
            c.balanceOf(0x755e40da9a23FE489c59628fa110219359951186),
            5,
            "ok"
        );
        assertEq(
            c.allowance(
                address(this),
                0x755e40da9a23FE489c59628fa110219359951186
            ),
            5
        );
    }
}
