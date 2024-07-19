const SimpleStorage = artifacts.require("SimpleStorage");

const MetaCoin = artifacts.require("MetaCoin");
module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.link(SimpleStorage, MetaCoin);
  deployer.deploy(MetaCoin);
};