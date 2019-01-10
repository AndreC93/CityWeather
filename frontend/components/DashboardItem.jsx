import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';

export default class DashboardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 0,
      tempMax: 0,
      tempMin: 0,
      weatherMain: '',
    };
  }

  componentDidMount() {
    this.setState(this.filterState(this.props.storedWeather));
  }

  filterState(newState) {
    const attrsToKeep = ['temp', 'tempMax', 'tempMin', 'weatherMain'];
    const filteredState = {};
    attrsToKeep.forEach( attr => filteredState[attr] = newState[attr] );
    return filteredState;
  }

  render() {
    const attrs = Object.entries(this.state);

    return (
      <div className='dashboardItem' >
        <image src=''/>
        <Link to={`/${this.props.name}`}>
          {this.props.name}
        </Link>
        {attrs.map((attr, idx) => <p key={idx} >{attr[0]}: {attr[1]}</p>)}
      </div>
    );
  }
}