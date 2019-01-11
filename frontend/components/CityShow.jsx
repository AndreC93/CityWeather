import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { fetchWeather, parseData, getImgSrc } from '../util/weather-util.js';

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
    if (this.props.name === undefined || this.props.name === 'undefined') {
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

  capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  render() {
    if(!this.state.country) return null;
    const imgSrc = getImgSrc(this.state.weatherMain);
    const { weatherDesc, temp, tempMin, tempMax, rain, humidity } = this.state;
    const attrs = Object.entries(this.state);
    return (
      <div className='cityShow' >
        <Link to={'/'}>Back to Dashboard</Link>
        <div className='city'>
          <h2>
            <img className='weatherImg' src={imgSrc} />
            {this.cityName}
          </h2>
          <div className='weatherDesc' >{this.capitalize(weatherDesc)}</div>
          <div className="tempContainer">
            <div className="temp">{temp}°F</div>
            <div className='lowHigh'>
              {tempMin}°F - {tempMax}°F
          </div>
          </div>
          <div className='additionalDesc'>
            <div>Rain/hr: {rain}mm</div>
            <div>Humidity: {humidity}%</div>
          </div>
        </div>
      </div>
      );
  }
}

export default withRouter(CityShow);