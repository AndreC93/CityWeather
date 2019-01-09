import React, { Component } from 'react'

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
        {this.props.name}
        {this.attrs.map((attr, idx) => <p key={idx} >{attr[0]}: {attr[1]}</p>)}
      </div>
    )
  }
}

