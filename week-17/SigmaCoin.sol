// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract SigmaCoin {
    address public owner;
    uint public totalSupply;
    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint)) public allowances;

    constructor() {
        owner = msg.sender;
    }

    function approve(
        address _spender,
        uint256 _value
    ) public returns (bool success) {
        allowances[msg.sender][_spender] = _value;
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        uint allowance = allowances[_from][msg.sender];
        require(allowance >= _value);

        uint balance = balances[_from];
        require(balance >= _value);

        balances[_from] -= _value;
        balances[_to] += _value;
        allowances[_from][msg.sender] -= _value;
        return true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function mint(uint amount) public onlyOwner {
        balances[owner] += amount;
        totalSupply += amount;
    }

    function mintTo(uint amount, address to) public onlyOwner {
        balances[to] += amount;
        totalSupply += amount;
    }

    function transfer(uint amount, address to) public {
        uint existingBalance = balances[msg.sender];
        require(existingBalance >= amount, "You don't have enough balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function burn(uint amount) public {
        require(
            balances[msg.sender] >= amount,
            "You don't have enough balance"
        );
        balances[msg.sender] -= amount;
        totalSupply -= amount;
    }
}
