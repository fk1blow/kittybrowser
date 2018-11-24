import React, { Component }           from "react";
import { object }                     from "prop-types";
import { ContractData, ContractForm } from "drizzle-react-components";
import { drizzleConnect }             from "drizzle-react";

class HelloDrizzle extends Component {
  render() {
    const { drizzleStatus, accounts } = this.props;

    if (drizzleStatus.initialized) {
      return (
        <div>
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
    CryptoKitties: state.contracts.CryptoKitties
  };
};

HelloDrizzle.contextTypes = {
  drizzle: object
}

const HelloDrizzleContainer = drizzleConnect(HelloDrizzle, mapStateToProps);
export default HelloDrizzleContainer;
