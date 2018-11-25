import Web3                                from "web3";
import React, { Component }                from "react";
import { object }                          from "prop-types";
import HelloDrizzle                        from "./HelloDrizzle";
import KittyCoreABI                        from "../contracts/KittyCoreABI.json";
import { CONTRACT_NAME, CONTRACT_ADDRESS } from "../config";

class Browser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showHello: false
    }
  }

  componentDidMount() {
    const provider = window.web3.currentProvider
    const web3 = new Web3(provider);

    provider
      .enable()
      .then(r => {
        const kittyContract = new web3.eth.Contract(
          KittyCoreABI,
          CONTRACT_ADDRESS,
        );

        this.context.drizzle.addContract({
          contractName: CONTRACT_NAME,
          web3Contract: kittyContract,
        });

        this.setState({ showHello: true })
      })
  }


  render() {
    if (!this.state.showHello) {
      return <div>wait for shit to happen</div>;
    }

    return (
      <div className="browser">
        <h1>Kitty Browser</h1>
        <HelloDrizzle />

        {/* Input to type in the kitty ID here */}

        {/* Display Kitty info here */}
      </div>
    );
  }
}

Browser.contextTypes = {
  drizzle: object,
  drizzleStore: object,
};

export default Browser;
