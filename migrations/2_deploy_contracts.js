var MathGame = artifacts.require("./MathGame");

module.exports = function(deployer) {
  deployer.deploy(MathGame, "name", "symbol", 18, 100);
};
