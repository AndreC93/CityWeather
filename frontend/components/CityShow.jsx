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
    this.cityName = '';
    this.interval = null;
  }

  checkName() {
    if (this.props.name === undefined || this.props.name === "undefined" || this.props.history.location.pathname !== '/') {
      return this.formatName(this.props.history.location.pathname.slice(1));
    } else {
      return this.props.name;
    }
  }
  
  formatName(name) {
    return name.split('+').map( word => this.capitalize(word) ).join(' ');
  }

  componentDidMount() {
    this.cityName = this.checkName();
    const oldState = this.props.storedWeather[this.cityName];
    if (oldState) {
      this.setState(oldState);
    } else {
      this.getWeather(this.cityName);
    }

    this.interval = setInterval(() => this.getWeather(this.cityName), 10000);
  }
  
  componentWillUpdate() {
    const addressName = this.props.history.location.pathname;
    if (addressName !== '/' && this.cityName.toLowerCase() !== addressName.slice(1).toLowerCase()) {
      clearInterval(this.interval);
      this.cityName = this.formatName(addressName.slice(1));
      this.getWeather(this.cityName);

      this.interval = setInterval(() => this.getWeather(this.cityName), 10000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getWeather(city) {
    fetchWeather(city)
      .then(data => this.handleSuccess(data))
      .catch(errors => errors);
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

    return (
      <div className='cityShow' >
        <Link to={'/'}>Back to Dashboard</Link>
        <div className='city'>
          <h2>
            <img className='weatherImg' src={imgSrc} />
            {this.capitalize(this.cityName)}
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