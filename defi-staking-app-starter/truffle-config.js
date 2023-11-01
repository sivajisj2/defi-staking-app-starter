require('babel-register')
require('babel-polyfill')

module.exports = {
    networks: {
        development: {
            host: "8545-sivajisj2-web3sj-o0r9ntdq2ha.ws-us105.gitpod.io",
            port: 8545, 
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
