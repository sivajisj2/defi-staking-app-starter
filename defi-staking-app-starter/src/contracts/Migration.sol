// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;


contract Migration {
    address public owner ;
    uint public last_completed_migration;

    constructor() {
        owner = msg.sender;
    }

    modifier restricted(){
        if(msg.sender == owner) _;
    }

    function set_completed(uint _completed)public restricted {
        last_completed_migration = _completed;
    }

    function upgrade(address new_addess) public restricted{
        Migration upgraded = Migration(new_addess);
        upgraded.set_completed(last_completed_migration);
    }
}