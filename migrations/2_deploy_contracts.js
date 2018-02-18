var PublicationFactory = artifacts.require("./PublicationFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(PublicationFactory);
};
