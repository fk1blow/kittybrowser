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
    this.dataKey = contract.methods.totalSupply.cacheCall({ from: props.accounts[0] })
  }

  renderTotalSupply() {
    // const drizzle = this.context.drizzle
    // const contract = drizzle.contracts.CryptoKitties
    // const dataKey = contract.methods.totalSupply.cacheCall({ from: this.props.accounts[0] })
    const dataKey = this.dataKey
    const kitties = this.props.kitties

    // Contract is not yet intialized.
    if(!kitties.initialized) return '';

    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if(!(dataKey in kitties['totalSupply'])) return '';

    return kitties['totalSupply'][dataKey].value;
  }

  render() {
    const { drizzleStatus, accounts, kitties, initialized, web3  } = this.props;
    // console.log(this.context.drizzle.contracts.CryptoKitties.methods.getKitty(1209787))
    // console.log(kitties)
    // console.log(kitties.methods.getKitty.cacheCall(1209787))
    // console.log(this.context.drizzle.contracts['CryptoKitties'].methods.getKitty.cacheCall(1209787).value)

    // console.log(web3)


    if (drizzleStatus.initialized) {
      // console.log(this.renderTotalSupply())

      return (
        <div>
          <Purrtrait image="https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1209751.svg" />
          {/* <span>{xtransactions.txHash.status}</span> */}
          supply???? {this.renderTotalSupply()}

          <section>
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
          </section>
        </div>
      )
    }

    return <div>drizzle not initialized</div>
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
