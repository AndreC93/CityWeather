import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { fetchWeather, parseData } from "../util/weather-util.js";

class CityShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clouds: 0,
      temp: 0,
      pressure: 0,
      humidity: 0,
      tempMin: 0,
      tempMax: 0,
      rain: 0,
      country: '',
      weatherDesc: '',
      weatherMain: '',
    };
    this.cityName = this.checkName();
  }

  checkName() {
    if (this.props.name === undefined || this.props.name === "undefined") {
      return this.formatName(this.props.history.location.pathname.slice(1));
    } else {
      return this.props.name;
    }
  }
  
  formatName(name) {
    return name.split('+').map( word => word[0].toUpperCase() + word.slice(1) ).join(' ');
  }

  componentDidMount() {
    const oldState = this.props.storedWeather[this.cityName];
    if (oldState) {
      this.setState(oldState);
    } else {
      fetchWeather(this.cityName)
        .then(data => this.handleSuccess(data))
        .catch( errors => errors );
    }

    this.interval = setInterval(() => fetchWeather(this.cityName).then(data => this.handleSuccess(data), errors => errors), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleSuccess(data) {
    const newState = parseData(data);
    this.setState(newState);
  }

  render() {
    if(!this.state.country) return null;

    const attrs = Object.entries(this.state);
    return (
      <div className='cityShow' >
        <Link to={'/'} >Back to Dashboard</Link>
        <h2>
          {this.cityName}
        </h2>
        {attrs.map( (attr, idx) => <p key={idx} >{attr[0]}: {attr[1]}</p>)}
      </div>
    )
  }
}

export default withRouter(CityShow);