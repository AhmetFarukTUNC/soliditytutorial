pragma solidity >=0.5.0 <0.6.0;

import "./zomfed.sol";

contract ZombieHelper is ZombieFeeding {

  modifier aboveLevel(uint _level,uint _zombieId) {
    require(zombies[_zombieId].level >= _level);
    _; 
  }

}
