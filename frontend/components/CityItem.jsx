import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        <Link to={'/'} >Back to Dashboard</Link>
        <h2>
          {this.name}
        </h2>
        {this.props.attrs.map( (attr, idx) => <p key={idx} >{attr[0]}: {attr[1]}</p>)}
      </div>
    )
  }
}
