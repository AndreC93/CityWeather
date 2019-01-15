import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getImgSrc } from '../util/weather-util.js';
import TempContainer from './TempContainer.js';
import WeatherImg from './WeatherImg.jsx';

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
    const { temp, tempMax, tempMin, weatherMain } = this.state;
    const imgSrc = getImgSrc(weatherMain);

    return (
      <Link className="dashboardItem city" to={`/${this.props.name}`}>
        <WeatherImg weatherMain={weatherMain} cityName={this.props.name} />
        <TempContainer temps={[temp, tempMin, tempMax]}/>
      </Link>);
  }
}