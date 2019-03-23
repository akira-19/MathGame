var MathGame = artifacts.require("./MathGame");

module.exports = function(deployer) {
  deployer.deploy(MathGame, "math", "math", 18, 10000);
};
