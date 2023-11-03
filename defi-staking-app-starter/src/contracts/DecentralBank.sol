// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "DecentralBank";
    address public owner ;
    Tether public tether ;
    RWD public rwd ;
    
    address[] public stakers;

    mapping (address => uint) public stakingBalance;
    mapping (address => bool) public hasStaked;
    mapping (address => bool) public isStaked;


    constructor(RWD _rwd, Tether _tether){
        rwd = _rwd;
        tether = _tether;

    }

    function depositTokens(uint256 _amount)  public {

        require(_amount > 0 , "amount must be greater than 0");

        //transfer tether tokens to this contract address for statking
        tether.transferFrom(msg.sender, address(this), _amount);

        //update the stakingBalance
        stakingBalance[msg.sender] += _amount;
          
        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }

        isStaked[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }
   
}