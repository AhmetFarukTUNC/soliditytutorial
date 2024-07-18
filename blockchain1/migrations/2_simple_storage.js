const SimpleStorage = artifacts.require("SimpleStorage");


module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.link(SimpleStorage, MetaCoin);
  deployer.deploy(MetaCoin);
};