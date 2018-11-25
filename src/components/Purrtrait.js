import React, { Component } from "react";
import PropTypes            from "prop-types";
import cx                   from "classnames";

export default class Purrtrait extends Component {
  constructor(props) {
    super(props)

    this.state = {
      eyesColor: 'black'
    }
  }

  componentDidMount() {
    this.refreshKitty()
  }

  componentDidUpdate(prev) {
    if (prev.kittyId != this.props.kittyId) this.refreshKitty()
  }

  refreshKitty() {
    const kittiesApi = 'https://api.cryptokitties.co/kitties'
    fetch(`${kittiesApi}/${this.props.kittyId}`)
      .then(response => response.json())
      .then(kitty => {
        const { enhanced_cattributes } = kitty
        const eyesColor = enhanced_cattributes.find(({ type }) => type === 'coloreyes')

        if (eyesColor && eyesColor.description) {
          this.setState({ eyesColor: eyesColor.description })
        }
      })
  }

  render() {
    const classes = cx(`KittyBanner KittyBanner--bg-${this.state.eyesColor}`, 'purrtrait')
    const image = `https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${this.props.kittyId}.png`

    return (
      <div className={classes}>
        <img width="300" height="300" src={image} />
      </div>
    )
  }
}

Purrtrait.propTypes = {
  kittyId: PropTypes.string
}
