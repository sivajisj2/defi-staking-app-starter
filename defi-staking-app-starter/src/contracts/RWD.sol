// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

contract RWD {
    string public name = "Reward Token";
    string public symbol = "RWD";
    uint256 public totalSupply = 1000000000000000000000000; // 1 millions tokens
    uint256 public decimals = 18;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(
        address _to,
        uint256 _value
    ) public returns (bool success) {
        // value must be greater than or equal to the value
        require(balanceOf[msg.sender] >= _value);
        // transfer the amount and substract the balance
        balanceOf[msg.sender] -= _value;
        // add the balancd to receiver
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(
        address _spender,
        uint256 _value
              ) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);

        // add the balancd to receiver
        balanceOf[_to] += _value;

        //transfer the amount and substract the balance
        balanceOf[_from] -= _value;

        allowance[msg.sender][_from] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
