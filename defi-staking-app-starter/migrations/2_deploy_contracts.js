// const Tether = artifacts.require('Tether');
// const RWD = artifacts.require('RWD');
// const DecentralBank = artifacts.require('DecentralBank');


// module.exports = async function (deployer,network, accounts){
//    await deployer.deploy(Tether);
//    const tether = await Tether.deployed();



//    await deployer.deploy(RWD);
//    const rwd = await RWD.deployed()
   
   

//    await deployer.deploy(DecentralBank,rwd.address, tether.address);
//    const decentralBank = await DecentralBank.deployed();

//    //Transfer all RWD tokens to decentralized bank
//    await  rwd.transfer(decentralBank.address,"100000000000000000000000");

//    //Distribute 100 Tether token to the investor
//    await tether.transfer(accounts[1],'100000000000000000000')


// };


/* eslint-disable no-undef */
const RWD = artifacts.require("RWD");
const Tether = artifacts.require("Tether");
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function(deployer) {
  // Deploy Tether Token
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();

  // Deploy RWD Token
  await deployer.deploy(RWD);
  const rwd = await RWD.deployed();

  // Deploy DecentralBank
  await deployer.deploy(DecentralBank, rwd.address, tether.address);
  const decentralBank = await DecentralBank.deployed();

  // Transfer all reward tokens to DecentralBank (1 million)
  await rwd.transfer(decentralBank.address, "1000000000000000000000000");

  // Transfer all Tether tokens to DecentralBank (1 million)
  await tether.transfer(decentralBank.address, "1000000000000000000000000");
};