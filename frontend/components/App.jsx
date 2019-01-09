import React, { Component } from 'react'
import City from './City.jsx';

export default class App extends Component {
  constructor() {
    super();
    this.defaultCities =  [
      'New York',
      'Dallas',
      'San Francisco',
      'Oklahoma City',
      'Seattle'
    ];
  }

  render() {
    const cities = this.cities || this.defaultCities;
    return (
      <div className='cities' >
        {cities.map( (city, idx) => <City name={city} key={idx} />)}
      </div>
    )
  }
}
