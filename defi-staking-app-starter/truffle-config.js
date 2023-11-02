require('babel-register')
require('babel-polyfill')

// path learn cluster odor excuse among pink birth truly season just inhale
module.exports = {
    networks: {
        development: {
            host: "127.0.0.1", // Updated host URL
            port: 8545, // Default HTTPS port
            network_id: '*', // Or specify the network ID you want to connect to
            gas: 5000000, // Gas limit
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
