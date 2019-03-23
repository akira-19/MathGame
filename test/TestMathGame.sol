pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MathGame.sol";

contract TestMathGame {
    MathGame mathGame = MathGame(DeployedAddresses.MathGame());
    address contractAddress = address(mathGame);

    function testConstructor() public{
        Assert.equal(mathGame.balanceOf(contractAddress), 10000, "contact should have 10000 math");
    }

    function testTransfer() public{
        mathGame.giveMath(10);
        Assert.equal(mathGame.balanceOf(address(this)), 10, "msg.sender should have 10 math");

    }



}
