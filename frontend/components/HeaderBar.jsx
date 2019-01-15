import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HeaderBar extends Component {
  render() {
    const { address } = this.props;
    return (
      <div>
        {address === '/' ? (<div>City Weather</div>) : (<Link to={"/"}>Back to Dashboard</Link>)}
      </div>
    );
  }
}
