import React, { Component } from 'react';
import { capitalizeAll } from '../util/parse-string.js';
import { getImgSrc } from '../util/weather-util.js';


export default class WeatherImg extends Component {
  
  render() {
    const { weatherMain, cityName } = this.props;
    const imgSrc = getImgSrc(weatherMain);
    
    return (
      <h2>
        <img className='weatherImg' src={imgSrc} />
        {cityName ? capitalizeAll(cityName) : ''}
      </h2>
    );
  }
}
