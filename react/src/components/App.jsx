import React, { Component } from "react";
import "../App.css";
import Navbar from "./Navbar";
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No ethereum browser detected!you can checkout Metamask");
    }
  }

  async loadBlockchainData() {
    const web3 = await window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0]; // Get the first account

    this.setState({ account });

    const netWorkId = Number(await web3.eth.net.getId());
    console.log(netWorkId, "NetworkId");

    const tetherData = Tether.networks[netWorkId];
if (tetherData) {
  // If the Tether contract is deployed on the network
  const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
  this.setState({ tether });

  // Use await to ensure you get the tetherBalance before updating the state
  let tetherBalance = await tether.methods.balanceOf(account).call();
  this.setState({ tetherBalance: tetherBalance.toString() });
  console.log("Tether Balance:", tetherBalance.toString());
} else {
  // Alert the user if the Tether contract is not deployed to the detected network
  window.alert("Error! Tether contract not deployed to the detected network");
}

const rwdData = RWD.networks[netWorkId];
if (rwdData) {
  // If the RWD contract is deployed on the network
  const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
  this.setState({ rwd });

  // Use await to ensure you get the rwdBalance before updating the state
  let rwdBalance = await rwd.methods.balanceOf(account).call();
  this.setState({ rwdBalance: rwdBalance.toString() });
  console.log("RWD Balance:", rwdBalance.toString());
} else {
  // Alert the user if the RWD contract is not deployed to the detected network
  window.alert("Error! RWD contract not deployed to the detected network");
}

const decentralBankData = DecentralBank.networks[netWorkId];
if (decentralBankData) {
  // If the DecentralBank contract is deployed on the network
  const decentralBank = new web3.eth.Contract(
    DecentralBank.abi,
    decentralBankData.address
  );
  this.setState({ decentralBank });

  // Use await to ensure you get the stakingBalance before updating the state
  let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call();
  this.setState({ stakingBalance: stakingBalance.toString() });
  console.log("Staking Balance:", stakingBalance.toString());
} else {
  // Alert the user if the DecentralBank contract is not deployed to the detected network
  window.alert("Error! DecentralBank contract not deployed to the detected network");
}

this.setState({loading: false})
console.log(this.state.loading);

  }

  constructor(props) {
    super(props);
    this.state = {
      account: "0x00",
      tether: {},
      rwd: {},
      decentralBank: {},
      tetherBalance: "5",
      rwdBalance: "0",
      stakingBalance: "0",
      loading: true,
    };
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <h1>{console.log(this.state.loading)}</h1>
      </div>
    );
  }
}
export default App;
