import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { fetchWeather, parseData, getImgSrc } from '../util/weather-util.js';
import { formatName, capitalizeAll } from '../util/parse-string.js';
import TempContainer from './TempContainer.js';
import WeatherImg from './WeatherImg.jsx';

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
      weatherDesc: 'Pending',
      weatherMain: 'Pending',
      cityName: '',
    };
    this.interval = null,
    this.failed = false;
  }

  componentDidMount() {
    const cityName = formatName(this.props.history.location.pathname);
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
    const addressName = formatName(this.props.history.location.pathname);
    const cityName = formatName(addressName);
    if (this.props.history.location.pathname !== '/' && this.state.cityName !== addressName && addressName !== this.failedAddress) {
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
      weatherMain: 'Unavailable',
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

  makeDashButton(cityName, weatherMain) {
    if(cityName === this.failedAddress || !weatherMain || weatherMain === 'Unavailable' || weatherMain === 'Pending') return null;
    if (!this.props.cities.includes(cityName)) {
      return (<div className='dashButton addToDash' onClick={() => this.props.addToDashboard(cityName)} >Add</div>);
    } else {
      return (<div className='dashButton removeFromDash' onClick={() => this.props.removeFromDashboard(cityName)} >Remove</div>);
    }
  }

  render() {
    const { cityName, weatherDesc, weatherMain, temp, tempMin, tempMax, rain, humidity } = this.state;
    const dashButton = this.makeDashButton(cityName, weatherMain);

    return (
      <div className='cityShow' >
        <div className='city'>
          <WeatherImg weatherMain={weatherMain} cityName={cityName} />
          <div className='weatherDesc' >{weatherDesc ? capitalizeAll(weatherDesc) : ''}</div>
          <TempContainer temps={[temp, tempMin, tempMax]} />
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