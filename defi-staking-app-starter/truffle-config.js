require('babel-register')
require('babel-polyfill')
const HDWalletProvider = require('@truffle/hdwallet-provider');
// path learn cluster odor excuse among pink birth truly season just inhale
module.exports = {
    networks: {
        development: {
            provider: () => new HDWalletProvider({
                mnemonic:"path learn cluster odor excuse among pink birth truly season just inhale",
                providerOrUrl: 'https://8545-sivajisj2-defistakingap-7nqwmozsg2c.ws-us105.gitpod.io',
              }),
              network_id: '*', // Or specify the network ID you want to connect to
        },
        // Add other networks if necessary
    },
    contracts_directory : './src/contracts/',
    contracts_build_directory : "./src/truffle_abis/",
    compilers : {
        solc :{
            version : '^0.8.6',
            optimizer : {
                enabled : true,
                runs :200
        }
      
        },

    }
};
