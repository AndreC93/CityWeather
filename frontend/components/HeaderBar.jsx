import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HeaderBar extends Component {
  render() {
    const { address } = this.props;
    let header;
    if (address === '/') {
      header = (<div onClick={() => window.location.reload()}>City Weather</div>);
    } else {
      header = (<Link to={"/"}>Back to Dashboard</Link>);
    }
    return (
      <div id='headerBar' >
        {header}
      </div>
    );
  }
}
