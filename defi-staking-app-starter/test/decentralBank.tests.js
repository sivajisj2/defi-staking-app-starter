
// const Tether = artifacts.require('Tether');
// const RWD = artifacts.require('RWD');
// const DecentralBank = artifacts.require('DecentralBank');

// require('chai')
// .use(require('chai-as-promised'))
// .should()


// contract('DecentralBank',([owner, customer])=>{
//   let tether , reward, decentralBank;
//   function tokens(number){
//     return web3.utils.toWei(number,'ether');
//   }

//   before(async() =>{
//     tether=  await Tether.new();
//     reward = await RWD.new();
//     decentralBank = await DecentralBank.new(reward.address, tether.address);

//     //Transfer all tokens to decentralBank (1 million)
//     await reward.transfer(
//       decentralBank.address, tokens('1000000'))

//     //Transfer 100 mock Tether to investor
//     await tether.transfer(customer, tokens('100'), {from: owner})
//   })

//   //testing Tether
//    describe('Mock Tether Deployment', async()=>{
//        it('matches name successfully',async()=>{
//          const name = await tether.name()
//          assert.equal(name,'Mock Tether Token');
//         })
//    })

//      // testing RWD
//    describe('Reward Token Deployment', async() => { 
//     it('matches name successfully',async()=>{
//       const name = await reward.name()
//       assert.equal(name,'Reward Token');
//      })
// })

//   describe('Decentral Bank Deployment', async() => { 
//     it('matches name successfully',async()=>{
//       const name = await decentralBank.name()
//       assert.equal(name,'DecentralBank');
//     })

//     it('contract has tokens', async () =>{
//       let balance = await reward.balanceOf(decentralBank.address)
//       assert.equal(balance,tokens('1000000'));
//     }) 


//     describe('Yield Farming', async() => {
//       it('rewards tokens for staking', async() => {
//        let result
    
//         // Check investor balance
//          result = (await tether.balanceOf(customer)).toString();
//         assert.equal(result, tokens('100'), 'customer mock tether balance before staking');
    
//         // // Deposit tokens for staking (This should be inside the 'it' block)
        
//         // await tether.approve(decentralBank.address,tokens('100'), {from : customer})
//         //   await decentralBank.depositTokens(tokens('100'), {from: customer});
        
//         //    result = (await tether.balanceOf(customer)).toString();
//         // assert.equal(result, tokens('0'), 'customer mock tether balance before staking');
      


//         //  result = (await tether.balanceOf(decentralBank.address)).toString();
//         // assert.equal(result, tokens('100'), 'customer mock tether balance before staking');
    
//       });

      
//       });
   


 
//     })

// })









/* eslint-disable no-undef */
const RWD = artifacts.require("RWD");
const Tether = artifacts.require("Tether");
const DecentralBank = artifacts.require("DecentralBank");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("DecentralBank", ([owner, customer]) => {
  let tether, rwd, decentralBank;

  function tokens(number) {
    return web3.utils.toWei(number, "ether");
  }

  before(async () => {
    // Load Contracts
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);

    // Transfer all tokens to DecentralBank (1 million)
    await rwd.transfer(decentralBank.address, tokens("1000000"));

    // Transfer 100 mock Tethers to Customer
    await tether.transfer(customer, tokens("100"), { from: owner });
  });

  describe("Mock Tether Token Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await tether.name();
      assert.equal(name, "Mock Tether Token");
    });
  });

  describe("Reward Token Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await rwd.name();
      assert.equal(name, "Reward Token");
    });
  });

  describe("Decentral Bank Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await decentralBank.name();
      assert.equal(name, "Decentral Bank");
    });

    it("contract has tokens", async () => {
      let balance = await rwd.balanceOf(decentralBank.address);
      assert.equal(balance, tokens("1000000"));
    });

    describe("Yield Farming", async () => {
      it("rewards tokens for staking", async () => {
        let result;

        // Check Investor Balance.
        result = await tether.balanceOf(customer);
        assert.equal(
          result.toString(),
          tokens("100"),
          "customer mock wallet balance before staking"
        );

        // Check Staking For Customer of 100 tokens.
        await tether.approve(decentralBank.address, tokens("100"), {
          from: customer,
        });
        await decentralBank.depositTokens(tokens("100"), { from: customer });

        // Check Updated Balance of Customer.
        result = await tether.balanceOf(customer);
        assert.equal(
          result.toString(),
          tokens("0"),
          "customer mock wallet balance after staking 100 tokens"
        );

        // Check Updated Balance of Decentral Bank.
        result = await tether.balanceOf(decentralBank.address);
        assert.equal(
          result.toString(),
          tokens("100"),
          "decentral bank mock wallet balance after staking from customer"
        );

        // Is Staking Update.
        result = await decentralBank.isStaking(customer);
        assert.equal(
          result.toString(),
          "true",
          "customer is staking status after staking"
        );

        // Issue Tokens.
        await decentralBank.issueTokens({ from: owner });

        // // Ensure Only The Owner Can Issue Tokens.
        // await decentralBank.issueTokens({from: customer}).should.be.rejected;

        // Unstake Tokens
        await decentralBank.unstakeTokens({ from: customer });

        // Check Unstaking Balances.

        result = await tether.balanceOf(customer);
        assert.equal(
          result.toString(),
          tokens("100"),
          "customer mock wallet balance after unstaking"
        );

        // Check Updated Balance of Decentral Bank.
        result = await tether.balanceOf(decentralBank.address);
        assert.equal(
          result.toString(),
          tokens("0"),
          "decentral bank mock wallet balance after staking from customer"
        );

        // Is Staking Update.
        result = await decentralBank.isStaking(customer);
        assert.equal(
          result.toString(),
          "false",
          "customer is no longer staking after unstaking"
        );
      });
    });
  });
});
