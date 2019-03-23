pragma solidity ^0.5.4;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract MathGame is ERC20Mintable, ERC20Detailed{
    using SafeMath for uint256;

    constructor(string memory name, string memory symbol, uint8 decimals, uint initSupply) ERC20Detailed(name, symbol, decimals) public {
        _mint(this, initSupply);
    }

    giveMath(uint _mathNum) public {
        _transfer(this, msg.sender, _mathNum);
    }




}
