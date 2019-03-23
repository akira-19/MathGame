var MathGame = artifacts.require("MathGame");

contract("MathGameTest", function(accounts){
    it("should mint 10000 math at first", function(){
        return MathGame.new("math", "math", 18, 10000, {from: accounts[0]}).then(function(instance){
            let contractAddress = instance.address;
            return instance.balanceOf(contractAddress)
        }).then((result) => {
            assert.equal(result, 10000, "The contract has 10000 math");
        }).catch(err => {
            console.log(err);
        })
    });

    it("should be able to send math", function(){
        let mathInstance;
        return MathGame.new("math", "math", 18, 10000, {from: accounts[0]}).then(function(instance){
            mathInstance = instance;
            return mathInstance.giveMath(10);
        }).then((result) => {
            return mathInstance.balanceOf(accounts[0]);
        }).then(balance => {
            assert.equal(balance, 10, "The account should have 10 math");
        }).catch(err => {
            console.log(err);
        })
    });

});
