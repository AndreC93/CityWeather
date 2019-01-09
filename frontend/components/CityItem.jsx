import React, { Component } from 'react'

export default class CityItem extends Component {
  formatName(name) {
    this.name =  name.split('+').map( word => word[0].toUpperCase() + word.slice(1) ).join(' ');
  }

  componentDidMount() {
    this.formatName(this.props.name);
  }

  render() {
    if(!this.props.name) return null;

    return (
      <div className='cityItem' >
        {this.name}
        {this.props.attrs.map( (attr, idx) => <p key={idx} >{attr[0]}: {attr[1]}</p>)}
      </div>
    )
  }
}
