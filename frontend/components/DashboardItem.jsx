import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class DashboardItem extends Component {
  
  componentDidMount() {
    this.attrs = this.filterAttrs(this.props.attrs);
  }

  filterAttrs(attrs) {
    const attrsToKeep = ['temp', 'tempMax', 'tempMin', 'weatherMain'];
    return attrs.filter( ([attr, val]) => attrsToKeep.includes(attr) );
  }

  render() {
    if(!this.attrs) return null;

    return (
      <div className='dashboardItem' >
        <Link to={`/${this.props.name}`}>
          {this.props.name}
        </Link>
        {this.attrs.map((attr, idx) => <p key={idx} >{attr[0]}: {attr[1]}</p>)}
      </div>
    )
  }
}

