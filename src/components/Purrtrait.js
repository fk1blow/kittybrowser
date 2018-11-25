import React, { Component } from "react";
import PropTypes            from "prop-types";

export default class Purrtrait extends Component {
  render() {
    return (
      <button style={{ background: 'none', border: 'none' }}>
        <img width="300" height="300" src={this.props.image} />
      </button>
    )
  }
}

Purrtrait.propTypes = {
  image: PropTypes.string
}
