import React, { Component } from 'react'

export default class City extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
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
  }

  componentDidMount() {
    this.fetchWeather();
  }

  fetchWeather() {
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${this.props.name}&APPID=c0a9b33f3889ab4f0926ba26ed8c9638`,
    }).then( data => this.handleSuccess(data), error => console.log(error) );
  }

  handleSuccess(data) {
    this.setState({
      name: data.name,
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
  }

  render() {
    if(this.state.name) {
      const attrs = Object.entries(this.state).filter( ([k, v]) => k !== 'name' );
      return (
        <div className='city' >
          {this.props.name}
          {attrs.map( attr => <p>{attr[0]}: {attr[1]}</p> )}
        </div>
      );
    } else {
      return null;
    }
  }
}
