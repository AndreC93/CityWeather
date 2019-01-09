import React, { Component } from 'react';
import CityItem from './CityItem.jsx'
import { withRouter } from 'react-router-dom';
import { fetchWeather } from '../util/weather_util.js';
import DashboardItem from './DashboardItem.jsx';

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clouds: 0,
      lon: 0,
      lat: 0,
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

    if(this.props.name === undefined) {
      this.cityName = this.props.history.location.pathname.slice(1);
    } else {
      this.cityName = this.props.name;
    }
  }

  componentDidMount() {
    fetchWeather(this.cityName).then( data => this.handleSuccess(data), errors => errors );
  }
  
  handleSuccess(data) {
    this.setState({
      clouds: data.clouds.all || 0,
      lon: data.coord.lon,
      lat: data.coord.lat,
      temp: data.main.temp,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      rain: data.rain ? data.rain['1h'] : 0,
      country: data.sys.country,
      weatherDesc: data.weather[0].description, 
      weatherMain: data.weather[0].main,
    });
    const attrs = Object.entries(this.state);
    this.props.addWeather(this.props.name, attrs);
  }
  
  render() {
    if(this.state.temp) {
      const attrs = Object.entries(this.state);
      
      if(this.props.dashboard) {
        return <DashboardItem name={this.props.name} attrs={attrs} />;
      } else {
        return <CityItem name={this.props.name} attrs={attrs} />;
      }

    } else {
      return null;
    }
  }
}

export default withRouter(City);