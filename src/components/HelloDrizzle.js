import React, { Component }           from "react";
import { object }                     from "prop-types";
import { ContractData, ContractForm } from "drizzle-react-components";
import { drizzleConnect }             from "drizzle-react";
import Purrtrait                      from "./Purrtrait";

class HelloDrizzle extends Component {
  constructor(props, context) {
    super(props)

    const drizzle = context.drizzle
    const contract = drizzle.contracts.CryptoKitties

    this.state = {
      dataKey: contract.methods.getKitty.cacheCall(123123),
      kittyId: '123123',
      kittySearch: '1',
      totalSupply: undefined,
    }
  }

  componentDidUpdate() {
    // if (this.props.kitties.initialized && this.state.totalSupply === undefined)
    //   this.refreshTotalSupply()
  }

  refreshTotalSupply() {
    const { accounts } = this.props
    const drizzle = this.context.drizzle
    const contract = drizzle.contracts.CryptoKitties
    const dataKey = contract.methods.totalSupply.cacheCall({ from: accounts[0] })
    const kitties = this.props.kitties

    // Contract is not yet intialized.
    if(!kitties.initialized) return;

    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if(!(dataKey in kitties['totalSupply'])) return;

    this.setState({ totalSupply: kitties['totalSupply'][dataKey].value })
  }

  getKitty() {
    const dataKey = this.state.dataKey
    const kitties = this.props.kitties

    // Contract is not yet intialized.
    if(!kitties.initialized) return undefined;

    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if(!(dataKey in kitties['getKitty'])) return undefined;

    return kitties['getKitty'][dataKey].value;
  }

  handleSearch(evt) {
    const drizzle = this.context.drizzle
    const contract = drizzle.contracts.CryptoKitties
    const query = evt.target.value

    if (query.length) {
      this.setState({
        kittyId: query,
        dataKey: contract.methods.getKitty.cacheCall(query)
      })
    }
  }

  // kittyFound() {
  //   return this.state.kitty != undefined && this.props.drizzleStatus.initialized
  // }

  render() {
    const { kittyId } = this.state
    const kitty = this.getKitty()

    if (!kitty) return <div>kitty not ready</div>;

    return (
      <div>
        <Purrtrait kittyId={kittyId} />

        <input style={{ width: 200 }} type="number" min="1" max={this.state.totalSupply}
          value={kittyId} onChange={this.handleSearch.bind(this)}></input>

        <p>{kitty.genes}</p>
        <p>{kitty.generation}</p>
        <p>{kitty.birthTime}</p>

        {/* {this.state.totalSupply} */}

        {/* <span>{xtransactions.txHash.status}</span> */}

        {/* supply???? {this.renderTotalSupply().genes} */}

        {/* <section>
          <strong>Total Supply</strong>:{" "}

            <ContractData
            contract="CryptoKitties"
            method="totalSupply"
            methodArgs={[{ from: accounts[0] }]}
          />
        </section>

        <section>
          <strong>Kitty Info</strong>:{" 1209787 "}

          <ContractData
            contract="CryptoKitties"
            method="getKitty"
            methodArgs={[ 1209787 ]}
          />
        </section> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    transactions: state.transactions,
    initialized: state.initialized,
    kitties: state.contracts.CryptoKitties,
    web3: state.web3,
  };
};

HelloDrizzle.contextTypes = {
  drizzle: object
}

const HelloDrizzleContainer = drizzleConnect(HelloDrizzle, mapStateToProps);
export default HelloDrizzleContainer;
