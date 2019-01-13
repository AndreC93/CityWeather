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
      cityName: this.props.name || '',
    };
    this.interval = null,
    this.failed = false;
  }

  checkName() {
    if (!this.props.name || this.props.name === "undefined" || this.props.history.location.pathname !== '/') {
      return this.formatName(this.props.history.location.pathname.slice(1));
    } else {
      return this.props.name;
    }
  }
  
  formatName(name) {
    return name.split('+').map( word => this.capitalize(word) ).join(' ');
  }

  componentDidMount() {
    const cityName = this.checkName();
    const oldState = this.props.storedWeather[cityName];
    if (oldState) {
      oldState.cityName = cityName;
      this.setState(oldState);
    } else {
      this.getWeather(cityName);
    }

    this.interval = setInterval(() => this.getWeather(this.state.cityName), 10000);
  }
  
  componentWillUpdate() {
    const addressName = this.props.history.location.pathname.slice(1);
    const cityName = this.formatName(addressName);
    if (this.props.history.location.pathname !== "/" && this.state.cityName.toLowerCase() !== addressName.toLowerCase() && addressName !== this.failedAddress) {
      clearInterval(this.interval);
      this.getWeather(cityName);
      this.interval = setInterval(() => this.getWeather(cityName), 10000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getWeather(city) {
    return fetchWeather(city)
      .then(data => this.handleSuccess(data))
      .catch(errors => this.handleFailure(city));
  }

  handleSuccess(data) {
    const newState = parseData(data);
    this.setState(newState);
  }

  handleFailure(city) {
    this.setState({ 
      cityName: city,
      weatherDesc: 'Unavailable', 
      weatherMain: '',
      temp: 0, 
      tempMin: 0, 
      tempMax: 0, 
      rain: 0, 
      humidity: 0,
      country: 'N/A',
    });
    clearInterval(this.interval);
    this.interval = null;
    this.failedAddress = city;
  }

  capitalizeAll(str) {
    return str.split(' ').map( word => this.capitalize(word) ).join(' ');
  }

  capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  makeDashButton(cityName, weatherMain) {
    if(cityName === this.failedAddress || !weatherMain) return null;
    if (!this.props.cities.includes(cityName)) {
      return (<div className='dashButton addToDash' onClick={() => this.props.addToDashboard(cityName)} >Add</div>);
    } else {
      return (<div className='dashButton removeFromDash' onClick={() => this.props.removeFromDashboard(cityName)} >Remove</div>);
    }
  }

  render() {
    if(!this.state.country) return null;
    const { cityName, weatherDesc, weatherMain, temp, tempMin, tempMax, rain, humidity } = this.state;
    const imgSrc = getImgSrc(weatherMain);
    const dashButton = this.makeDashButton(cityName, weatherMain);

    return (
      <div className='cityShow' >
        <Link to={'/'}>Back to Dashboard</Link>
        <div className='city'>
          <h2>
            <img className='weatherImg' src={imgSrc} />
            {this.capitalizeAll(cityName)}
          </h2>
          <div className='weatherDesc' >{this.capitalizeAll(weatherDesc)}</div>
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
          {dashButton}
        </div>
      </div>
      );
  }
}

export default withRouter(CityShow);