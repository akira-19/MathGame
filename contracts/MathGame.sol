pragma solidity ^0.5.4;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

contract MathGame is ERC20, ERC20Detailed{

    // @devlop: mint tokens to the contract
    constructor(string memory name, string memory symbol, uint8 decimals, uint initSupply) ERC20Detailed(name, symbol, decimals) public {
        _mint(address(this), initSupply);
    }

    // @devlop: give tokens to users from the contract
    function giveMath(uint _mathNum) public {
        _transfer(address(this), msg.sender, _mathNum);
    }



}
