pragma solidity ^0.5.4;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract MathGame is ERC20, ERC20Detailed{
    using SafeMath for uint16;

    uint16 totalAddition = 0;
    uint16 correctAddition = 0;
    uint16 totalSubtraction = 0;
    uint16 correctSubtraction = 0;
    uint16 totalMultiplication = 0;
    uint16 CorrectMultiplication = 0;
    uint16 totalDivision = 0;
    uint16 CorrectDivision = 0;

    constructor(string memory name, string memory symbol, uint8 decimals, uint initSupply) ERC20Detailed(name, symbol, decimals) public {
        _mint(address(this), initSupply);
    }

    function giveMath(uint _mathNum) public {
        _transfer(address(this), msg.sender, _mathNum);
    }

    /* function resultStore(uint16 _addQ, uint16 _addC, uint16 _subQ, uint16 _subC,uint16 _mulQ, uint16 _mulC,uint16 _divQ, uint16 _divC) {
        totalAddition = totalAddition.add(_addQ);
        correctAddition = correctAddition.add(_addC);
        totalSubtraction = totalSubtraction.add(_subQ);
        correctSubtraction = correctSubtraction.add(_subC);
        totalMultiplication = totalMultiplication.add(_mulQ);
        CorrectMultiplication = CorrectMultiplication.add(_mulC);
        totalDivision = totalDivision.add(_divQ);
        CorrectDivision = CorrectDivision.add(_divC);
    } */


}
