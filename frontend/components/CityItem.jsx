import React, { Component } from 'react'

export default class CityItem extends Component {
  render() {
    return (
      <div className='cityItem' >
        {this.props.name}
        {this.props.attrs.map( (attr, idx) => <p key={idx} >{attr[0]}: {attr[1]}</p>)}
      </div>
    )
  }
}
