import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getImgSrc } from '../util/weather-util.js';

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
    const imgSrc = getImgSrc(this.state.weatherMain);

    return(
      <Link className="dashboardItem city"  to={`/${this.props.name}`}>
        <h2>
          <img className="weatherImg" src={imgSrc} />
          {this.props.name}
        </h2>
        {attrs.map((attr, idx) => <p key={idx}>{attr[0]}: {attr[1]}</p>)}
      </Link>);
  }
}